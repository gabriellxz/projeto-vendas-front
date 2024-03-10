import { useContext, useState } from "react"
import { Cart } from "../types/cart"
import api from "../config/config"
import useProdutoId from "./useProdutoId"
import { DataUser } from "../context/dataUser"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

export default function useCart() {

    const navigate = useNavigate()
    const [cart, setCart] = useState<Cart>()
    const [loadingCart, setLoadingCart] = useState<boolean>(false)
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

        setLoadingCart(true)
        try {
            if (token) {
                const response: AxiosResponse = await api.post("/cart/insert", dataCart, {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(token)}`
                    }
                })

                setCart(response.data)
                console.log(response.data)
                setLoadingCart(false)
                navigate("/home/carrinho")
            }
        } catch (error) {
            console.log(error)
            setLoadingCart(false)
        }

    }

    async function clearCart() {

        setLoadingCart(true)
        
        try {
            if(token) {
                const response:AxiosResponse = await api.delete("/cart/clear", {headers: {
                    "Authorization": "Bearer " + JSON.parse(token)
                }})
                
                setCart(response.data)
                setLoadingCart(false)
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
            setLoadingCart(false)
        }
    }

    return {
        addCart,
        cart,
        loadingCart,
        clearCart
    }
}