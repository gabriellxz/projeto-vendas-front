import { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from "react"
import Endereco from "../types/endereco"
import api from "../config/config"
import axios from "axios"
import { DataUser } from "../context/dataUser";

interface CEP {
    localidade: string;
    uf: string;
}

export default function useEndereco() {

    const token = localStorage.getItem("tokenUser")

    //FUNÇÃO PARA LISTAR ENDEREÇOS DO USUÁRIO
    const [endereco, setEndereco] = useState<Endereco[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    async function getEnderecos() {
        setLoading(true)

        try {
            if (token) {
                const response = await api.get("/Endereco", {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                console.log(response.data)
                setEndereco(response.data)
            }
        } catch (err) {
            console.log(err)
        }
    }


    //FUNÇÃO QUE BUSCA CEP DO USUÁRIO
    const [cep, setCep] = useState<string>("")
    const [estado, setEstado] = useState<string>("")
    const [cidade, setCidade] = useState<string>("")
    const [getCepState, setGetCep] = useState<CEP>()

    function handleChangeCep(event: ChangeEvent<HTMLInputElement>): void {
        setCep(event.target.value)
    }

    async function getCep(e: SyntheticEvent) {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

            console.log(response.data)
            setGetCep(response.data)
            preencherCamposCep(response.data)
        } catch (err) {
            console.log(err)
        }

    }

    function preencherCamposCep(endereco: CEP) {
        setCidade(endereco.localidade || "")
        setEstado(endereco.uf || "")
    }

    //ENVIAR ENDEREÇO
    const [numero, setNumero] = useState<number | null>()
    const [complemento, setComplemento] = useState<string>("")
    const [pontoDeReferencia, setPontoDeReferencia] = useState<string>("")
    const [bairro, setBairro] = useState<string>("")
    const [telefoneContato, setTelefoneContato] = useState<string>("")
    const [ddd, setDdd] = useState<string>("")
    const user = useContext(DataUser)

    function handleChangeNumero(e: ChangeEvent<HTMLInputElement>) {
        const numero: number = parseInt(e.target.value)
        setNumero(numero)
    }

    function handleChangeComplemento(e: ChangeEvent<HTMLInputElement>) {
        setComplemento(e.target.value)
    }

    function handleChangePontoRef(e: ChangeEvent<HTMLInputElement>) {
        setPontoDeReferencia(e.target.value)
    }

    function handleChangeBairro(e: ChangeEvent<HTMLInputElement>) {
        setBairro(e.target.value)
    }

    function handleChangeTelefone(e: ChangeEvent<HTMLInputElement>) {
        setTelefoneContato(e.target.value)
    }

    function handleChangeDdd(e: ChangeEvent<HTMLSelectElement>) {
        setDdd(e.target.value)
    }

    async function handlePostEndereco(e: SyntheticEvent) {
        e.preventDefault()
        setLoading(true)

        const data = {
            CEP: cep,
            numero: numero,
            complemento: complemento,
            ponto_de_referencia: pontoDeReferencia,
            bairro: bairro,
            telefone_contato: ddd + telefoneContato,
            cidade: cidade,
            estado: estado,
            endereco_id: user?.id
        }

        try {
            if (token) {
                const response = await api.post("/Endereco", data, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                console.log(response.data)

            }
        } catch (err) {
            console.log(err)
        }
    }

    //RENDERIZAR ENDEREÇOS APENAS QUANDO O COMPONENTE FOR MONTADO
    useEffect(() => {
        getEnderecos()
    }, [])


    return {
        endereco,
        loading,
        getCep,
        cep,
        handleChangeCep,
        estado,
        cidade,
        getCepState,
        handlePostEndereco,
        numero,
        bairro,
        complemento,
        pontoDeReferencia,
        telefoneContato,
        ddd,
        handleChangeNumero,
        handleChangeComplemento,
        handleChangePontoRef,
        handleChangeBairro,
        handleChangeTelefone,
        handleChangeDdd
    }
}