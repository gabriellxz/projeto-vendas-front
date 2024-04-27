import { useNavigate } from "react-router-dom"
import useValidation from "./useValidation"
import { useContext, useState } from "react"
// import useInputChange from "./useInputChange"
import api from "../config/config"
import { toast } from "react-toastify"
import { UserAutenticado } from "../context/authContext"

export default function useLogin() {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const { login } = useContext(UserAutenticado)


    function handleEmailValue(e: any) {
        setEmail(e.target.value)
    }

    function handleSenhaValue(e: any) {
        setSenha(e.target.value)
    }

    const { validation, setValidation } = useValidation()
    // const {email, senha} = useInputChange()



    async function handleSubmit(e: any) {
        e.preventDefault()

        setValidation({ ...validation, loading: true })

        const data = {
            email,
            senha
        }
        if (
            email !== "" &&
            senha !== ""
        ) {
            try {
                await api.post("/login", data, {
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": `Bearer ${(token)}`
                    }
                }).then((response) => {
                    // console.log(response)

                    setValidation({
                        type: "success",
                        message: "sucess",
                        loading: false
                    })

                    const token = response.data.accessToken
                    login(token)

                    navigate("/home")
                }).catch((error) => {
                    //console.log(error)

                    setValidation({
                        type: "error",
                        message: "error",
                        loading: false
                    })


                    if (senha.length < 6) {
                        setValidation({
                            type: "error",
                            message: "error",
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

                    if (error.response.status === 401) {
                        setValidation({
                            type: "error",
                            message: "error",
                            loading: false
                        })

                        toast.error(`${error.response.data.message}.`, {
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

                })
            } catch (err) {
                console.log(err)
                setValidation({
                    type: "error",
                    message: "error",
                    loading: false
                })

                toast.error(`Ocorreu um erro ao entrar. Por favor, tente novamente.`, {
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
        } else {
            setValidation({
                type: "error",
                message: "error",
                loading: false
            })

            toast.error("Preencha os campos corretamente.", {
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

    }

    return {
        handleSubmit,
        validation,
        handleEmailValue,
        handleSenhaValue,
        senha,
        email
    }
}