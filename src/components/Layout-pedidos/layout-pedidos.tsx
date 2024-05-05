import FilterIcon from "../../svg/filter-icon";
import Pedidos from "../../types/pedidos";
import Loading from "../Loading/loading";
import usePedidos from "../../hook/usePedidos"

export default function LayoutPedidos() {

    const { loading, orderUser } = usePedidos()

    orderUser.filter((order: Pedidos) => {
        const data = new Date(order.createdAt)

        const dia = String(data.getDate()).padStart(2, "0")
        const mes = String(data.getMonth() + 1).padStart(2, "0")
        const ano = data.getFullYear()
    })

    return (
        <>
            <div className="max-w-[840px] w-full bg-white mt-[30px] px-4 pt-5 py-3 rounded-[20px] h-[650px]">
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold text-lg">Pedidos</span>
                    </div>
                    <div>
                        <FilterIcon />
                    </div>
                </div>
                <div className="mt-6">
                    <table className="w-full">
                        <thead className="w-full border-b border-gray-500">
                            <tr className="w-full flex justify-between pb-3">
                                <th className="w-full text-left">Cliente</th>
                                <th className="w-full text-center">Data</th>
                                <th className="w-full text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="w-full font-bold">
                            <div className="overflow-y-scroll h-[500px]">
                                {
                                    loading ? <Loading /> :
                                        orderUser.map((order: Pedidos) => {
                                            const data = new Date(order.createdAt)

                                            const dia = String(data.getDate()).padStart(2, "0")
                                            const mes = String(data.getMonth() + 1).padStart(2, "0")
                                            const ano = data.getFullYear()

                                            return (
                                                <tr className="w-full flex justify-between items-center mt-5">
                                                    <td className="w-full text-left">{order.users.nome}</td>
                                                    <td className="w-full text-center">{`${dia}-${mes}-${ano}`}</td>
                                                    {
                                                        order.Delivered !== false ? <td className="w-full text-center bg-green-600 text-white rounded-2xl py-2">Entregue</td> : <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                                    }
                                                </tr>
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