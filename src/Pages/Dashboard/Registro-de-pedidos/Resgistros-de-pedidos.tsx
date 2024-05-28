import { Link } from "react-router-dom";
import CardDashboard from "../../../components/Cards-dashboard/cards-dashboard";
import LayoutPedidos from "../../../components/Layout-pedidos/layout-pedidos";
import TopDashboard from "../../../components/Top-dashboard/top-dashboard";
import usePedidos from "../../../hook/usePedidos";
import Pedidos from "../../../types/pedidos";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"
import useGetUsers from "../../../hook/useGetUsers";
import CloseNavBar from "../../../svg/closeNavbar";

export default function RegistroDePedidos() {

    const { orderUser } = usePedidos()
    const [openModalFilter, setOpenModalFilter] = useState<boolean>(false)
    const { users } = useGetUsers()
    const [filteredOrder, setFilteredOrder] = useState<Pedidos[]>(orderUser)

    function handleOpenModalFilter() {
        setOpenModalFilter(!openModalFilter)
    }

    useEffect(() => {
        setFilteredOrder(orderUser)
    }, [orderUser])


    function filterPendentes() {
        setFilteredOrder(orderUser.filter((p: Pedidos) => p.Delivered !== true))
        setOpenModalFilter(!openModalFilter)
    }

    function filterEntregues() {
        setFilteredOrder(orderUser.filter((p: Pedidos) => p.Delivered === true))
        setOpenModalFilter(!openModalFilter)
    }

    function filterTodos() {
        setFilteredOrder(orderUser)
        setOpenModalFilter(!openModalFilter)
    }

    function TableOrder() {
        return (
            filteredOrder.map((order: Pedidos) => {
                const data = new Date(order.createdAt)

                const dia = String(data.getDate()).padStart(2, "0")
                const mes = String(data.getMonth() + 1).padStart(2, "0")
                const ano = data.getFullYear()

                return (
                    <Link to={`/dashboard/detalhes-de-pedidos/${order.userId}`}>
                        <tr className="w-full flex justify-between items-center mt-5" key={order.id}>
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


    return (
        <>
            <div>
                <TopDashboard title={"Registro de pedidos"} titleRoute={"Registro de pedidos"} />
                <motion.div className="sm:flex gap-[28px] select-none"
                    initial={{
                        opacity: 0,
                        translateX: 160
                    }}
                    animate={{
                        opacity: 1,
                        translateX: 0
                    }}
                >
                    <LayoutPedidos
                        titleLayout="Pedidos"
                        th1={"Cliente"}
                        th2={"Data"}
                        th3={"Status"}
                        styleTable={""}
                        component={<TableOrder />}
                        buttonModalFilter={handleOpenModalFilter}
                    // modalFilterState={openModalFilter}
                    />
                    {openModalFilter &&
                        <>
                            <div className="bg-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[604px] w-full p-4 rounded-[16px] shadow-md mx-auto">
                                <div className="mb-[26px] flex items-center justify-between" onClick={() => setOpenModalFilter(!openModalFilter)}>
                                    <span className="text-xl">Selecione o status</span>
                                    <span >
                                        <CloseNavBar />
                                    </span>
                                </div>
                                <div className="w-full flex gap-[16px] mb-[59px]">
                                    <button onClick={filterPendentes} className="border border-orange-500 w-full p-2 text-center rounded-[8px] font-semibold bg-white">
                                        Envio pendente
                                    </button>
                                    <button onClick={filterEntregues} className="border border-green-600 w-full p-2 text-center rounded-[8px] font-semibold bg-white">
                                        Entregue
                                    </button>
                                    <button onClick={filterTodos} className="border border-red-600 w-full p-2 text-center rounded-[8px] font-semibold bg-white">
                                        Todos
                                    </button>
                                </div>
                                <div>
                                    <div className="mb-[26px]">
                                        <span className="text-xl">Ordem</span>
                                    </div>
                                    <div>
                                        <select name="" id="" className="w-full font-bold px-3 py-2 rounded-[8px] border border-zinc-500">
                                            <option value="">Ordem de A-Z</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    <div className="flex flex-col gap-[20px] mt-[30px] sm:max-w-[380px] w-full">
                        <CardDashboard
                            titleCard1={"Pedidos"}
                            titleCard2={"Clientes"}
                            titleCard3={"Histórico de pedidos"}
                            orderUserLength={orderUser.length}
                            countUsers={users.length}
                            styleCard={"font-bold flex flex-col justify-center gap-2"}
                        />
                    </div>
                </motion.div>
            </div>
        </>
    )
}