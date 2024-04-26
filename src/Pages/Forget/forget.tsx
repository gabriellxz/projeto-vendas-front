import { ChangeEvent, useContext, useState } from "react";
import ButtonDark from "../../components/Button-dark/button-dark";
import Input from "../../components/Input/input";
import api from "../../config/config";
import { AxiosError, AxiosResponse } from "axios";
import Loading from "../../components/Loading/loading";
import { ToastContainer, toast } from "react-toastify";
import { UserAutenticado } from "../../context/authContext";

export default function Forget() {

    const [email, setEmail] = useState<string>("")
    const [status, setStatus] = useState({
        type: "",
        message: "",
    })
    const [loading, setLoading] = useState<boolean>(false)
    const {login} = useContext(UserAutenticado)

    function changeEmail(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    async function forget(e: any) {
        e.preventDefault()

        const data = {
            email: email
        }

        setLoading(true)

        try {
            if (email !== null) {
                await api.post("/forget", data, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then((response: AxiosResponse) => {
                        console.log(response)

                        setStatus({
                            type: "success",
                            message: ""
                        })

                        toast.success("Verifique sua caixa de entrada.", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })

                        const token = response.data.acess.token
                        login(token)

                        setLoading(false)
                    }).catch((error: AxiosError) => {
                        console.log(error)

                        if (email == "") {
                            // alert("Please enter a valid email")
                            setStatus({
                                type: "error",
                                message: "Insira seu e-email."
                            })

                            setLoading(false)
                        }

                        if (error.response?.status === 401) {
                            setStatus({
                                type: "error",
                                message: "E-mail inválido."
                            })

                            setLoading(false)
                        }
                    })


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
                <form className="flex flex-col shadow-lg shadow-zinc-700 p-5 max-w-[400px] w-full gap-4 rounded-md m-2" onSubmit={forget}>
                    {
                        status.type === "success" ? <p>E-mail enviado!</p> : (
                            <>
                                <Input
                                    inputLabel="Confirme seu e-mail"
                                    name="email"
                                    onInputValue={changeEmail}
                                    styleWidth=""
                                    typeInput="text"
                                    value={email}
                                />
                                <p>
                                    {status.type === "error" ? <p className="text-red-600">{status.message}</p> : <p className="hidden first-letter:text-red-600">{status.message}</p>}
                                </p>
                                {loading ? <Loading /> : <ButtonDark text="Enviar"/>}
                                <p className="text-red-600">
                                    É importante que o e-mail seja válido e existente.
                                </p>
                            </>
                        )
                    }

                </form>
            </div>
            <ToastContainer />
        </>
    )
}