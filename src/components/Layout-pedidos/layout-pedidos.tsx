import FilterIcon from "../../svg/filter-icon";
import Pedidos from "../../types/pedidos";
import Loading from "../Loading/loading";
import usePedidos from "../../hook/usePedidos"
import { useState } from "react"
import { Link } from "react-router-dom";

export default function LayoutPedidos() {

    const { loading, orderUser } = usePedidos()
    const [openModal, setOpenModal] = useState<boolean>(false)

    return (
        <>
            <div className="max-w-[840px] w-full bg-white mt-[30px] px-4 pt-5 py-3 rounded-[20px] h-[460px]">
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-lg">Pedidos</span>
                    </div>
                    <div onClick={() => setOpenModal(!openModal)}>
                        <FilterIcon />
                    </div>
                </div>
                <div className="mt-6 relative w-full">
                    {
                        openModal &&
                        <div className="bg-gray-100 absolute max-w-[604px] w-full p-4 rounded-[16px] shadow-md mx-auto">
                            <div className="mb-[26px]">
                                <span className="text-xl">Selecione o status</span>
                            </div>
                            <div className="w-full flex gap-[16px] mb-[59px]">
                                <span className="border border-orange-500 w-full p-2 text-center rounded-[8px] font-semibold bg-white">
                                    Envio pendente
                                </span>
                                <span className="border border-green-600 w-full p-2 text-center rounded-[8px] font-semibold bg-white">
                                    Entregue
                                </span>
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
                    }
                    <table className="w-full">
                        <thead className="w-full border-b border-gray-500">
                            <tr className="w-full flex justify-between pb-3">
                                <th className="w-full text-left">Cliente</th>
                                <th className="w-full text-center">Data</th>
                                <th className="w-full text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="w-full font-bold">
                            <div className="overflow-y-scroll h-[300px]">
                                {
                                    loading ? <Loading /> :
                                        orderUser.map((order: Pedidos) => {
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
                                }
                            </div>
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}