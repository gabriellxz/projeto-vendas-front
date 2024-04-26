import { ChangeEvent, useContext, useState } from "react";
import Input from "../../components/Input/input";
import Loading from "../../components/Loading/loading";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import ButtonDark from "../../components/Button-dark/button-dark";
import api from "../../config/config";
import { UserAutenticado } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

export default function ChangePass() {

    const { token, login } = useContext(UserAutenticado)
    const navigate = useNavigate()
    const [newSenha, setNewSenha] = useState<string>("")
    const [confirmSenha, setConfirmSenha] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [status, setStatus] = useState({
        type: "",
        message: "",
    })
    const [loading, setLoading] = useState<boolean>(false)

    function changeNewSenha(e: ChangeEvent<HTMLInputElement>) {
        setNewSenha(e.target.value)
    }

    function changeConfirmSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmSenha(e.target.value)
    }

    function showPass() {
        setShowPassword(!showPassword)
    }

    async function changePass(e: any) {
        e.preventDefault()

        const tokenPass = token ? JSON.parse(token) : ""

        const data = {
            senha: confirmSenha,
            token: tokenPass
        }

        setLoading(true)

        try {
            if (
                newSenha !== null ||
                confirmSenha !== null
            ) {
                if (token) {
                    await api.put("/UpdatePass", data, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })
                        .then((response: AxiosResponse) => {
                            console.log(response)

                            setStatus({
                                type: "success",
                                message: ""
                            })

                            toast.success("Senha alterada com sucesso.", {
                                position: "bottom-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                            })

                            navigate("/home")
                            login(token)
                            setLoading(false)
                        }).catch((error: AxiosError) => {
                            console.log(error)
                            setLoading(false)

                            if (
                                newSenha === "" ||
                                confirmSenha == ""
                            ) {
                                // alert("Please enter a valid email")
                                setStatus({
                                    type: "error",
                                    message: "Preencha os campos corretamente."
                                })

                                setLoading(false)
                            }

                            if (newSenha !== confirmSenha) {
                                setStatus({
                                    type: "error",
                                    message: "As senhas não correspondem. Certifique-se de que a 'Nova senha' e a 'Confirmar senha' sejam iguais."
                                })

                                setLoading(false)
                            }

                        })
                }


            }
        } catch (err) {
            setStatus({
                type: "error",
                message: "Erro: tente mais tarde."
            })
            setLoading(false)
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <form className="flex flex-col shadow-lg shadow-zinc-700 p-5 max-w-[400px] w-full gap-4 rounded-md m-2" onSubmit={changePass}>
                    <>
                        {/* <label className="text-xl">Nova senha</label>
                        <input type="text" className="border border-1 border-black outline-none p-2" /> */}
                        <Input
                            inputLabel="Nova senha"
                            name="senha"
                            onInputValue={changeNewSenha}
                            styleWidth=""
                            typeInput="text"
                            value={newSenha}
                        />
                        <Input
                            inputLabel="Confirme sua senha"
                            name=""
                            onInputValue={changeConfirmSenha}
                            styleWidth=""
                            typeInput={showPassword ? "text" : "password"}
                            value={confirmSenha}
                        />
                        <div className="flex gap-1">
                            <input type="checkbox" checked={showPassword} onChange={showPass} /> mostrar senha
                        </div>
                        <p>
                            {status.type === "error" ? <p className="text-red-600">{status.message}</p> : <p className="hidden first-letter:text-red-600">{status.message}</p>}
                        </p>
                        {loading ? <Loading /> : <ButtonDark text="Salvar" />}
                    </>

                </form>
            </div>
        </>
    )
}