import { useContext, useState } from "react"
import Cart from "../types/cart"
import api from "../config/config"
import useProdutoId from "./useProdutoId"
import { DataUser } from "../context/dataUser"
import { AxiosResponse } from "axios"

export default function useCart() {

    const [cart, setCart] = useState<Cart>()
    const [loading, setLoading] = useState<boolean>(false)
    const token = localStorage.getItem("tokenUser")
    const { produto } = useProdutoId()
    const user = useContext(DataUser)

    async function addCart() {

        const dataCart: Cart = {
            amount: 1,
            produtoId: produto?.id_produto,
            usuarioId: user?.id
        }

        console.log(dataCart);

        setLoading(true)
        try {
            if (token) {
                const response: AxiosResponse = await api.post("/cart/insert", dataCart, {headers: {
                    "Authorization": `Bearer ${JSON.parse(token)}`
                }})

                setCart(response.data)
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }

    }

    return {
        addCart,
        cart,
        loading
    }
}