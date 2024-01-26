import { Link, useNavigate } from "react-router-dom";
import ButtonDark from "../Button-dark/button-dark";
import ButtonLight from "../Button-light/button-light";
import Input from "../Input/input";
import TitleForm from "../Title-form/title-form";
import api from "../../config/config";
import useInputChange from "../../hook/useInputChange";
import useValidation from "../../hook/useValidation";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from "../Loading/loading";
import { useContext } from "react";
import { UserAutenticado } from "../../context/authContext";

export default function FormLogin() {

    const navigate = useNavigate()
    const { email, senha, handleEmailValue, handleSenhaValue } = useInputChange()
    const { validation, setValidation } = useValidation()

    const {signIn} = useContext(UserAutenticado)


    async function handleSubmit(e: any) {
        e.preventDefault()

        setValidation({ ...validation, loading: true })

        const data = {
            email,
            senha
        }

        await api.post("/login", data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            console.log(response)

            if (response.status === 201) {
                setValidation({
                    type: "success",
                    message: "sucess",
                    loading: false
                })
                navigate("/home")
                localStorage.setItem("tokenUser", JSON.stringify(response.data.accessToken))

                signIn(true)
            }
        }).catch((error) => {
            console.log(error)
            if (error.response.status === 400) {

                setValidation({ ...validation, loading: false })

                toast.error(error.response.data.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

                if (senha.length < 6) {
                    console.log(error.response.data.message[0])
                    setValidation({
                        type: "senha-length",
                        message: "A senha deve conter no mínimo 6 caracteres.",
                        loading: false
                    })

                    toast.error("A senha deve conter no mínimo 6 caracteres.", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                }
            } else if (error.response.status === 401) {
                toast.error("Email ou senha incorretos.", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

                setValidation({ ...validation, loading: false })
            } else {
                setValidation({
                    type: "error",
                    message: "Erro: tente mais tarde.",
                    loading: false
                })
            }
        })
    }

    return (
        <>
            <form className="max-w-[600px] w-full m-5" onSubmit={handleSubmit}>
                <div className="mb-10">
                    <TitleForm text={"entrar"} />
                </div>
                <div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"email"} inputLabel={"Email"} styleWidth={"w-full"} name="email" value={email} onInputValue={handleEmailValue} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"password"} inputLabel={"Senha"} styleWidth={"w-full"} name="senha" value={senha} onInputValue={handleSenhaValue} />
                            {senha.length < 6 ? <span className="text-red-600">{validation.message}</span> : ""}
                            <div>
                                <span>Esqueceu sua senha?</span>
                            </div>
                        </div>
                        <div className="text-center">
                            {
                                validation.loading ? <Loading />
                                    :
                                    <ButtonDark text={"sign in"} />
                            }
                            <div className="bg-zinc-400 p-[0.4px] w-full"></div>
                        </div>
                        <div>
                            <div className="flex justify-center mb-3">
                                <span>Não possui uma conta?</span>
                            </div>
                            <Link to={"/cadastro"}>
                                <ButtonLight text={"Criar uma conta"} />
                            </Link>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </form>
        </>
    )
}