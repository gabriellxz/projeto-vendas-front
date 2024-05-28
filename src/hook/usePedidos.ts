import api from "../config/config";
import { UserAutenticado } from "../context/authContext";
import { useContext, useEffect, useState } from "react";
import Pedidos from "../types/pedidos";

export default function usePedidos() {

    const { token } = useContext(UserAutenticado)
    const [orderUser, setOrderUser] = useState<Pedidos[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    // const [delivered, setDelivered] = useState<boolean>()

    async function getOrderUser() {
        setLoading(true)

        if (token) {
            try {
                const response = await api.get("/Order", {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                setLoading(false)
                setOrderUser(response.data)
                console.log(response)
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        }
    }

    useEffect(() => {
        getOrderUser()
    }, [])



    return {
        orderUser,
        loading,
        setOrderUser
    }
}