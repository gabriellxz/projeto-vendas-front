import { useState } from "react"

export default function useInputChange() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
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

    return {
        email,
        senha,
        nome,
        telefoneData,
        genero,
        handleEmailValue,
        handleSenhaValue,
        handleTelefoneValue,
        handleNomeInput,
        handleGeneroValue,
    }
}