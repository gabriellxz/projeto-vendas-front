import { useContext, useEffect, useState } from "react";
import FilterIcon from "../../svg/filter-icon";
import api from "../../config/config";
import { UserAutenticado } from "../../context/authContext";
import Pedidos from "../../types/pedidos";

export default function LayoutPedidos() {

    const { token } = useContext(UserAutenticado)
    const [orderUser, setOrderUser] = useState<Pedidos[]>([])

    async function getOrderUser() {
        if (token) {
            try {
                const response = await api.get("/Order", {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                setOrderUser(response.data)
                console.log(response)
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        getOrderUser()
    }, [])

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
                                    orderUser.map((order: Pedidos) => (
                                        <tr className="w-full flex justify-between items-center mt-5">
                                            <td className="w-full text-left">{order.users.nome}</td>
                                            <td className="w-full text-center">{order.updatedAt}</td>
                                            <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                        </tr>
                                    ))
                                }
                                {/* <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr>
                                <tr className="w-full flex justify-between items-center mt-5">
                                    <td className="w-full text-left">Nome sobrenome</td>
                                    <td className="w-full text-center">30-04-2024</td>
                                    <td className="w-full text-center bg-orange-400 text-white rounded-2xl py-2">Envio pendente</td>
                                </tr> */}
                            </div>
                        </tbody>
                    </table>
                </div>
            </div >
        </>
    )
}