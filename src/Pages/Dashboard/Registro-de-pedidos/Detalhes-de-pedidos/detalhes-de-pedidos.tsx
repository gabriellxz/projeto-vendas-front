import TopDashboard from "../../../../components/Top-dashboard/top-dashboard"
import InforClient from "../../../../components/Infor-client/infor-client"
import { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserAutenticado } from "../../../../context/authContext"
import api from "../../../../config/config"
import Pedidos from "../../../../types/pedidos"
import InforProduct from "../../../../components/Infor-product/infor-product"
import { motion } from "framer-motion"

export default function DetalhesDePedidos() {

    const params = useParams()
    const { token } = useContext(UserAutenticado)
    const [openClient, setOpenClient] = useState<boolean>(false)
    const [openProduct, setOpenProduct] = useState<boolean>(false)
    const [detailsUser, setDetailsUser] = useState<Pedidos>()

    useEffect(() => {
        async function getDetails() {
            if (token) {
                try {
                    const response = await api.get(`/Order/User/${Number(params.userId)}`, {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    console.log(response)
                    setDetailsUser(response.data)
                } catch (err) {
                    console.log(err)
                }
            }
        }

        getDetails()
    }, [])

    return (
        <div className="select-none">
            <TopDashboard title="Detalhes de pedidos" titleRoute="Detalhes do pedido" />
            <motion.div className="flex flex-col gap-[36px] mt-[30px]"
                initial={{
                    opacity: 0,
                    translateX: 160
                }}
                animate={{
                    opacity: 1,
                    translateX: 0
                }}
            >
                <div className="bg-white w-full px-8 py-2 rounded-[8px] shadow-md shadow-zinc-600">
                    <div className="flex justify-between items-center">
                        <span className="text-xl">Informações do cliente</span>
                        <span className="border-l border-zinc-400 pl-5" onClick={() => setOpenClient(!openClient)}>
                            {
                                openClient !== false ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[40px] h-[40px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>

                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[40px] h-[40px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                            }
                        </span>
                    </div>
                    {
                        openClient &&
                        <div>
                            <InforClient details={detailsUser} />
                        </div>
                    }
                </div>
                <div className="bg-white w-full py-2 rounded-[8px] shadow-md shadow-zinc-600">
                    <div className="flex justify-between items-center px-8">
                        <span className="text-xl">Informações do pedido</span>
                        <span className="border-l border-zinc-400 pl-5" onClick={() => setOpenProduct(!openProduct)}>
                            {
                                openProduct !== false ?
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[40px] h-[40px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>

                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[40px] h-[40px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                            }
                        </span>
                    </div>
                    {
                        openProduct &&
                        <div>
                            <InforProduct details={detailsUser} />
                        </div>
                    }
                </div>
            </motion.div>
        </div>
    )
}