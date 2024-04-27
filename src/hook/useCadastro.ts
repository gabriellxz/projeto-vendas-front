import { toast } from "react-toastify"
import api from "../config/config"
import useValidation from "./useValidation"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function useCadastro() {

    const navigate = useNavigate()
    const { validation, setValidation } = useValidation()

    const [nome, setNome] = useState('')
    const [telefoneData, setTelefoneData] = useState({
        ddd: "",
        Telefone: ""
    })
    const [genero, setGenero] = useState({
        masculino: "",
        feminino: "",
        outro: ""
    })
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [CPF, setCpf] = useState('')


    function handleEmailValue(e: any) {
        setEmail(e.target.value)
    }

    function handleSenhaValue(e: any) {
        setSenha(e.target.value)
    }

    function handleTelefoneValue(e: any) {
        setTelefoneData({ ...telefoneData, [e.target.name]: e.target.value })
    }

    function handleNomeInput(e: any) {
        setNome(e.target.value)
    }

    function handleGeneroValue(e: any) {
        setGenero(e.target.value)
    }

    function handleCpfValue(e: any) {
        setCpf(e.target.value)
    }

    async function handleSubmit(e: any) {

        setValidation({ ...validation, loading: true })

        e.preventDefault()
        const Telefone = telefoneData.ddd + telefoneData.Telefone

        // console.log(email)
        // console.log(senha)
        // console.log(Telefone)
        // console.log(nome)
        // console.log(genero)


        const data = {
            email,
            senha,
            nome,
            Telefone,
            genero,
            CPF
        }

       try {
            if(
                email!== null ||
                senha!== null ||
                nome!== null ||
                telefoneData!== null ||
                genero!== null ||
                CPF!== null
            ) {
                await api.post("/registrar", data, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then((response) => {
                    console.log(response)
        
                        navigate("/")
        
                        toast.success("Usuário cadastrado com sucesso!", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
        
                        setValidation({
                            type: "sucess",
                            message: "Usuário cadastrado com sucesso!",
                            loading: false
                        })
        
                        // localStorage.setItem("tokenUser", JSON.stringify(response.data.accessToken))
                }).catch((error) => {
                    console.log(error)

                    setValidation({
                        type: "error",
                        message: "error",
                        loading: false
                    })

                    if(
                        email == "" ||
                        senha == "" ||
                        nome == "" ||
                        telefoneData.Telefone == "" ||
                        telefoneData.ddd == "" ||
                        genero == null ||
                        CPF == ""
                    ) {
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

                    if(senha.length < 6) {
                        setValidation({
                            type: "error",
                            message: "error",
                            loading: false
                        })

                        toast.error("Senha deve conter no mínimo 6 caracteres.", {
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

                    if(CPF.length !== 11) {
                        setValidation({
                            type: "error-cpf",
                            message: "Digite o número do CPF sem caracteres especiais e com exatamente 11 dígitos.",
                            loading: false
                        })

                        toast.error("CPF inválido.", {
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

                    if(Telefone.length !== 11) {
                        setValidation({
                            type: "error-telefone",
                            message: "error",
                            loading: false
                        })

                        toast.error(`Telefone inválido.`, {
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

                    if(error.response.status === 404) {
                        setValidation({
                            type: "error-user-existing",
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
            }
       } catch (error) {
            console.log(error)
            setValidation({
                type: "error",
                message: "error",
                loading: false
            })
       }
    }

    return {
        handleSubmit,
        validation,
        senha,
        email,
        telefoneData,
        genero,
        nome,
        CPF,
        handleEmailValue,
        handleGeneroValue,
        handleNomeInput,
        handleSenhaValue,
        handleTelefoneValue,
        handleCpfValue
    }
}