import { Link } from "react-router-dom";
import CardDashboard from "../../../components/Cards-dashboard/cards-dashboard";
import LayoutPedidos from "../../../components/Layout-pedidos/layout-pedidos";
import TopDashboard from "../../../components/Top-dashboard/top-dashboard";
import usePedidos from "../../../hook/usePedidos";
import Pedidos from "../../../types/pedidos";
import useListProduct from "../../../hook/useListProduct";
import ProdutosDTO from "../../../types/produto";
import { motion } from "framer-motion"
import useGetUsers from "../../../hook/useGetUsers";

export default function PainelAdministrativo() {

    const { orderUser } = usePedidos()
    const { product } = useListProduct()
    const { users } = useGetUsers()

    function TableOrder() {
        return (
            orderUser.map((order: Pedidos) => {
                const data = new Date(order.createdAt)

                const dia = String(data.getDate()).padStart(2, "0")
                const mes = String(data.getMonth() + 1).padStart(2, "0")
                const ano = data.getFullYear()

                return (
                    <Link to={`/dashboard/detalhes-de-pedidos/${order.userId}`}>
                        <tr className="w-full flex justify-between items-center mt-5 hover:bg-zinc-100 p-1 rounded-md" key={order.id}>
                            <td className="w-full text-left">{order.users.nome}</td>
                            <td className="w-full text-center">{`${dia}-${mes}-${ano}`}</td>
                            {
                                order.Delivered !== false ? <td className="w-full text-center bg-green-600 text-white rounded-2xl py-2">Entregue</td> : <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                            }
                        </tr>
                    </Link>
                )
            })
        )
    }

    function TableEstoque() {
        return (
            <div>
                {
                    product.map((p: ProdutosDTO) => (
                        <div className="flex justify-between bg-zinc-200 mx-1 my-3 rounded-lg py-5 px-3 text-xl">
                            <span>{p.nome_produto}</span>
                            <span>{p.estoque}</span>
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <div>
            <TopDashboard title={"Painel administrativo"} titleRoute={"Painel administrativo"} />
            <motion.div
                initial={{
                    opacity: 0,
                    translateX: 160
                }}
                animate={{
                    opacity: 1,
                    translateX: 0
                }}
            >
                <div className="flex flex-col sm:flex sm:flex-row gap-[20px] justify-between mt-[30px] w-full">
                    <CardDashboard
                        titleCard1={"Novos pedidos"}
                        titleCard2={"Clientes"}
                        titleCard3={"Lucro total"}
                        styleCard={"font-bold flex flex-col justify-center gap-2 w-full"}
                        orderUserLength={orderUser.length}
                        countUsers={users.length}
                    />
                </div>
                <div className="flex flex-col md:flex md:flex-row gap-[28px] select-none">
                    <LayoutPedidos
                        titleLayout="Pedidos"
                        th1={"Cliente"}
                        th2={"Data"}
                        th3={"Status"}
                        styleTable={""}
                        component={<TableOrder />}
                    />
                    <LayoutPedidos
                        titleLayout="Estoque"
                        styleTable={""}
                        component={<TableEstoque />}
                    />
                </div>
            </motion.div>
        </div>
    )
}