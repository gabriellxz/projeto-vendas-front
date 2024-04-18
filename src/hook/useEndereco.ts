import { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from "react"
import Endereco from "../types/endereco"
import api from "../config/config"
import axios from "axios"
import { DataUser } from "../context/dataUser";
import { toast } from "react-toastify";
import usePayment from "./usePayment";
import { UserAutenticado } from "../context/authContext";

interface CEP {
    localidade: string;
    uf: string;
}

export default function useEndereco() {

    // const token = localStorage.getItem("tokenUser")
    const { token } = useContext(UserAutenticado)

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

                setLoading(false)
                // console.log(response.data)
                setEndereco(response.data)
            }
        } catch (err) {
            // console.log(err)
            setLoading(false)
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

            // console.log(response.data)
            setGetCep(response.data)
            preencherCamposCep(response.data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
            // console.log(err)
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
    const [rua, setRua] = useState<string>("")
    const [telefoneContato, setTelefoneContato] = useState<string>("")
    const [ddd, setDdd] = useState<string>("")
    const user = useContext(DataUser)
    const { make } = usePayment()

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

    function handleChangeRua(e: ChangeEvent<HTMLInputElement>) {
        setRua(e.target.value)
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
            Rua: rua,
            telefone_contato: ddd + telefoneContato,
            cidade: cidade,
            estado: estado,
            userId: user?.id
        }

        try {
            if (token) {
                const response = await api.post("/Endereco", data, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                toast.success("Endereço cadastrado com sucesso!", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

                setLoading(false)
                // console.log(response)

                if (response.status === 201) {
                    make()
                }
            }
        } catch (err) {
            // console.log(err)
            setLoading(false)
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
        rua,
        complemento,
        pontoDeReferencia,
        telefoneContato,
        ddd,
        handleChangeNumero,
        handleChangeComplemento,
        handleChangePontoRef,
        handleChangeBairro,
        handleChangeTelefone,
        handleChangeDdd,
        handleChangeRua
    }
}