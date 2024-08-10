import { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from "react"
import Endereco from "../types/endereco"
import api from "../config/config"
import axios, { AxiosError, AxiosResponse } from "axios"
import { toast } from "react-toastify";
// import usePayment from "./usePayment";
import { UserAutenticado } from "../context/authContext";
import { useNavigate } from "react-router-dom";

interface CEP {
    localidade: string;
    uf: string;
}

interface EnderecoData {
    CEP: string;
    numero: string;
    complemento: string;
    ponto_de_referencia: string;
    bairro: string;
    Rua: string;
    telefone_contato: string;
    cidade: string;
    estado: string;
    userId: number | undefined;
}

export default function useEndereco() {

    const navigate = useNavigate()

    // const token = localStorage.getItem("tokenUser")
    const { token, user } = useContext(UserAutenticado)

    //FUNÇÃO PARA LISTAR ENDEREÇOS DO USUÁRIO
    const [endereco, setEndereco] = useState<Endereco[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [getLoadingEnd, setLoadingEnd] = useState<boolean>(true)

    async function getEnderecos() {
        setLoadingEnd(true)

        try {
            if (token) {
                const response = await api.get("/Endereco", {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                setLoadingEnd(false)
                // console.log(response.data)
                setEndereco(response.data)
            }
        } catch (err) {
            // console.log(err)
            setLoadingEnd(false)
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
    const [numero, setNumero] = useState<string>("")
    const [complemento, setComplemento] = useState<string>("")
    const [pontoDeReferencia, setPontoDeReferencia] = useState<string>("")
    const [bairro, setBairro] = useState<string>("")
    const [rua, setRua] = useState<string>("")
    const [telefoneContato, setTelefoneContato] = useState<string>("")
    const [ddd, setDdd] = useState<string>("")
    // const { make } = usePayment()

    function handleChangeNumero(e: ChangeEvent<HTMLInputElement>) {
        setNumero(e.target.value)
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

        const data:EnderecoData = {
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

        if (
            cep !== "" &&
            numero !== undefined &&
            complemento !== "" &&
            pontoDeReferencia !== "" &&
            bairro !== "" &&
            rua !== "" &&
            ddd !== "" &&
            telefoneContato !== "" &&
            ddd !== "" &&
            estado !== "" &&
            cidade !== ""
        ) {
            try {
                if (token) {
                    await api.post("/Endereco", data, {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    }).then((response: AxiosResponse) => {
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
                        console.log(response)

                        if (response.status === 201) {
                            navigate("/home/carrinho")
                        }
                    }).catch((error: AxiosError) => {
                        setLoading(false)
                        console.log(error)
                        if (data.telefone_contato.length != 11) {
                            setLoading(false)

                            toast.error("Telefone inválido.", {
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
            } catch (err) {
                // console.log(err)
                setLoading(false)

                toast.error("Ocorreu um erro ao cadastrar o endereço. Por favor, tente novamente.", {
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
        handleChangeRua,
        getLoadingEnd
    }
}