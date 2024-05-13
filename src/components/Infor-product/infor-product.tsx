import api from "../../config/config"
import { CartOrderUser } from "../../types/cart"
import Pedidos from "../../types/pedidos"
import Moeda from "../../utils/moeda"
import { useState, ChangeEvent, SyntheticEvent, useContext } from "react"
import { UserAutenticado } from "../../context/authContext"
import { AxiosResponse, AxiosError } from "axios"
import { toast, ToastContainer } from "react-toastify"
import Loading from "../Loading/loading"


interface PropsProduct {
    details?: Pedidos
}


export default function InforProduct(props: PropsProduct) {

    const items = props.details?.carrinho.carrinho.carrinho

    const totalAmount = items?.reduce((total, item) => total + item.amount, 0)
    const precoTotal = items?.reduce((total, item) => total + (item.amount * item.produtos.preco), 0)

    const [codeTracking, setCodeTracking] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [openEditCode, setOpenEditCode] = useState<boolean>(false)
    const { token } = useContext(UserAutenticado)

    function onChangeCode(e: ChangeEvent<HTMLInputElement>) {
        setCodeTracking(e.target.value)
    }

    async function putCode(e: SyntheticEvent) {
        e.preventDefault()

        setLoading(true)

        const data = {
            trackingCode: codeTracking
        }

        if (codeTracking !== "") {
            if (token) {
                try {
                    await api.put(`/Order/send-code/${props.details?.userId}`, data, {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    }).then((response: AxiosResponse) => {
                        console.log(response)

                        setLoading(false)
                        location.reload()

                        toast.success("Código de rastreio enviado com sucesso!", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                    }).catch((error: AxiosError) => {
                        console.log(error)

                        setLoading(false)

                        toast.error("Não foi possivel enviar o código", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                    })

                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            }
        } else {
            setLoading(false)
            toast.error("Preecha o campo!", {
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

    return (
        <>
            <div className="flex justify-between bg-green-300 px-7 py-7">
                <div className="flex flex-col">
                    <span>Quantidade de produtos: {totalAmount}</span>
                    <span className="font-bold">Total: {Moeda.formatar(precoTotal ? precoTotal : 0)}</span>
                </div>
                <div>
                    <span className="flex gap-4 items-center">
                        Nº de rastreamento:
                        {
                            props.details?.trackingCode !== null ? <span>{props.details?.trackingCode}</span> :
                                (
                                    loading ? <Loading /> :
                                        <>
                                            <input type="text" className="outline-none p-1" onChange={onChangeCode} />
                                            <button className="font-semibold text-white bg-greenEco-100 px-3 py-1 rounded-md" onClick={putCode}>Enviar</button>
                                        </>
                                )
                        }
                        {
                            openEditCode && 
                            <div className="flex gap-4">
                                <input type="text" className="outline-none p-1" onChange={onChangeCode} />
                                <button className="font-semibold text-white bg-greenEco-100 px-3 py-1 rounded-md" onClick={putCode}>Enviar</button>
                            </div>
                        }
                        <button className="font-semibold text-white bg-greenEco-100 px-3 py-1 rounded-md" onClick={() => setOpenEditCode(!openEditCode)}>{openEditCode ? "Fechar" : "Editar"}</button>
                    </span>
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-[70px] py-5 p-8">
                {
                    props.details?.carrinho.carrinho.carrinho.map((p: CartOrderUser) => (
                        <div className="flex gap-5">
                            <div>
                                <img src={p.produtos.imagem && p.produtos.imagem[0] && p.produtos.imagem[0].url} alt="" className="w-[135px] h-[135px] rounded-[40px]" />
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex items-center">
                                    <div className="flex flex-col items-start w-full">
                                        <span>Produto</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{p.produtos.nome_produto}</span>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex flex-col items-start w-full">
                                        <span>Quantidade</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{p.amount}</span>
                                    </div>
                                    <div className="flex flex-col items-start w-full">
                                        <span>Nº do pedido</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.id_order}</span>
                                    </div>
                                    <div className="flex flex-col items-start w-full">
                                        <span>Preço</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{Moeda.formatar(p.produtos.preco)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <ToastContainer />
        </>
    )
}