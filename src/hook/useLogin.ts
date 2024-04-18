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

        await api.post("/login", data, {
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${(token)}`
            }
        }).then((response) => {
            // console.log(response)

            if (response.status === 201) {
                setValidation({
                    type: "success",
                    message: "sucess",
                    loading: false
                })

                const token = response.data.accessToken
                login(token)

                navigate("/home")

            }
        }).catch((error) => {
            // console.log(error)
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
                    // console.log(error.response.data.message[0])
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

    return {
        handleSubmit,
        validation,
        handleEmailValue,
        handleSenhaValue,
        senha,
        email
    }
}