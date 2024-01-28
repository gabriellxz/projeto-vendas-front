import { useNavigate } from "react-router-dom"
import useValidation from "./useValidation"
import { useContext } from "react"
import { UserAutenticado } from "../context/authContext"
import useInputChange from "./useInputChange"
import api from "../config/config"
import { toast } from "react-toastify"

export default function useLogin() {

    const navigate = useNavigate()
    const { validation, setValidation } = useValidation()
    const {email, senha} = useInputChange()

    const { signIn } = useContext(UserAutenticado)


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

    return {
        handleSubmit,
        validation
    }
}