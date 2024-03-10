import { useEffect, useState } from "react"
import api from "../config/config"
import { AxiosResponse } from "axios"
import { CartType } from "../types/cart"

export default function useGetCart() {

    const token = localStorage.getItem("tokenUser")
    const [cart, setCart] = useState<CartType[]>([])
    const [cartData, setCartData] = useState<CartType>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        async function getCart() {

            setLoading(true)

            try {
                if (token) {
                    const response: AxiosResponse = await api.get("/cart/find", {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    setCart(response.data.carrinho)
                    setCartData(response.data.carrinho)
                    console.log(response.data.carrinho)
                    setLoading(false)
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        getCart()
    }, [])

    return {
        cart,
        cartData,
        loading
    }
}