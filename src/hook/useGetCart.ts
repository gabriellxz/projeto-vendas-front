import { useEffect, useState } from "react"
import api from "../config/config"
import { AxiosResponse } from "axios"
import { CartType } from "../types/cart"

export default function useGetCart() {

    const token = localStorage.getItem("tokenUser")
    const [cart, setCart] = useState<CartType[]>([])

    useEffect(() => {
        async function getCart() {
            try {
                if (token) {
                    const response: AxiosResponse = await api.get("/cart/find", {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    setCart(response.data.carrinho)
                }
            } catch (error) {
                console.log(error)
            }
        }

        getCart()
    }, [])

    return {
        cart
    }
}