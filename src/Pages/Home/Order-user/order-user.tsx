// import InforProduct from "../../../components/Infor-product/infor-product";
import { useContext, useEffect, useState } from "react";
import { UserAutenticado } from "../../../context/authContext";
import { DataUser } from "../../../context/dataUser"
import api from "../../../config/config";
import Pedidos from "../../../types/pedidos";
import { CartOrderUser } from "../../../types/cart";
import Moeda from "../../../utils/moeda";

export default function OrderUser() {

    const { token } = useContext(UserAutenticado)
    const user = useContext(DataUser)
    const [orderUser, setOrderUser] = useState<Pedidos[]>([])


    console.log(user)

    useEffect(() => {
        async function getOrderUser() {
            if (token) {
                try {
                    const response = await api.get("/Order/User", {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    setOrderUser(response.data)
                    console.log(response)
                } catch (error) {
                    console.log(error)
                }
            }
        }

        getOrderUser()
    }, [])


    // const { totalProdutos, totalPagar } = calcularTotal(orderUser)

    function calcularTotal(pedidos: Pedidos[]) {
        let totalPagar = 0;
        let totalProdutos = 0;
        pedidos.forEach(pedidos => {

            pedidos.carrinho.carrinho.carrinho.forEach((item: CartOrderUser) => {
                totalPagar += item.amount * item.produtos.preco;
                totalProdutos += item.amount;
            })

        })

        return { totalPagar, totalProdutos }
    }

    const { totalPagar, totalProdutos } = calcularTotal(orderUser)


    return (
        <div>
            <div className="flex flex-col w-full sm:flex sm:flex-row gap-5 justify-between bg-green-300 px-7 py-7">
                <div className="flex flex-col">
                    <span>Quantidade de produtos: {totalProdutos}</span>
                    <span className="font-bold">Total: {Moeda.formatar(totalPagar)}</span>
                </div>
            </div>
            {
                orderUser.map((order: Pedidos) => (
                    order.carrinho.carrinho.carrinho.map((o: CartOrderUser) => (
                        <div className="flex gap-5 border-b border-zinc-500 p-5">
                            <div>
                                <img src={o.produtos.imagem && o.produtos.imagem[0] && o.produtos.imagem[0].url} alt="" className="w-[135px] h-[135px] rounded-[40px]" />
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex items-center">
                                    <div className="flex flex-col items-start w-full">
                                        <span>Produto</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{o.produtos.nome_produto}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex md:flex-row gap-5">
                                    <div className="flex flex-col items-start w-full">
                                        <span>Quantidade</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{o.amount}</span>
                                    </div>
                                    <div className="flex flex-col items-start w-full">
                                        <span>Nº do pedido</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{order.id_order}</span>
                                    </div>
                                    <div className="flex flex-col items-start w-full">
                                        <span>Preço</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{Moeda.formatar(o.produtos.preco)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ))
            }
        </div>
    )
}