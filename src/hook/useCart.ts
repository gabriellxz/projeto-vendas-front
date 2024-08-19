import { useContext, useEffect, useState } from "react"
import { Cart, CartOrderUser } from "../types/cart"
import api from "../config/config"
import { AxiosResponse } from "axios"
import useProdutoId from "./useProdutoId"
import { useNavigate } from "react-router-dom"
import { UserAutenticado } from "../context/authContext"

export default function useCart() {

    // const token = localStorage.getItem("tokenUser")
    const { token } = useContext(UserAutenticado)
    const navigate = useNavigate()
    const [cart, setCart] = useState<CartOrderUser[]>([])
    const [loadingCart, setLoadingCart] = useState<boolean>(false)
    const [produtoId, setProdutoId] = useState<number>()
    const { produto } = useProdutoId()

    async function addCart() {
        setLoadingCart(true)

        const produtoAdd: Cart = {
            amount: 1,
            produtoId: produto?.id_produto
        }

        try {
            if (token) {
                const response: AxiosResponse = await api.post("/cart/insert", produtoAdd, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                console.log(response)
                setLoadingCart(false)
                navigate("/home/carrinho")
            }
        } catch (error) {
            console.log(error)
            setLoadingCart(false)
        }
    }

    async function getCart() {
        // setLoadingCart(true)

        try {
            if (token) {
                const response: AxiosResponse = await api.get("/cart/find", {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                // setLoadingCart(false)
                setCart(response.data.carrinho)
                console.log(response.data)

                if (response.data.carrinho.length > 0) {
                    setProdutoId(response.data.carrinho[0].produtoId);
                    // console.log(produtoId)
                }
            }
        } catch (err) {
            // setLoadingCart(false)
            console.log(err)
        }

    }

    async function deleteProdutoId(produtoId: number) {
        setLoadingCart(true)

        try {
            if (token) {
                await api.delete(`/cart/${produtoId}`, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                // console.log(response)
                setCart(cart.filter((c: CartOrderUser) => c.produtoId !== produtoId))
                setLoadingCart(false)
            }
        } catch (err) {
            console.log(err)
            setLoadingCart(false)
        }
    }

    async function clearCart() {
        setLoadingCart(true)

        try {
            if (token) {
                const response = await api.delete("/cart/clear", {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                setCart(response.data)
                setLoadingCart(false)
            }
        } catch (err) {
            console.log(err)
            setLoadingCart(false)
        }
    }

    useEffect(() => {
        getCart()
    }, [])

    return {
        cart,
        loadingCart,
        addCart,
        deleteProdutoId,
        clearCart,
        produtoId
    }
}