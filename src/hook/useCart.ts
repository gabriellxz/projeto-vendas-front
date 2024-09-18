import { useContext, useEffect, useState } from "react"
import { CartOrderUser } from "../types/cart"
import api from "../config/config"
import { AxiosResponse } from "axios"
// import useProdutoId from "./useProdutoId"
import { useNavigate } from "react-router-dom"
import { UserAutenticado } from "../context/authContext"
export default function useCart() {

    const navigate = useNavigate();
    const { token } = useContext(UserAutenticado);
    // const { produto } = useProdutoId();
    const [cart, setCart] = useState<CartOrderUser[]>([]);
    const [produtoId, setProdutoId] = useState<number>();
    const [loadingCart, setLoadingCart] = useState<boolean>(false);
    // const params = useParams();

    async function handleAddCart(idProduto: number) {

        setLoadingCart(true);

        const data = {
            amount: 1,
            produtoId: Number(idProduto)
        }

        try {
            if (token) {
                await api.post("/cart/insert", data, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                navigate("/home/carrinho")
                setLoadingCart(false);
            }
        } catch (error) {
            console.log(error);
            setLoadingCart(false);
        }
    }

    useEffect(() => {

        // setLoadingCart(true);

        async function getCart() {
            try {
                if (token) {
                    const response: AxiosResponse = await api.get("/cart/find", {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    setCart(response.data.carrinho);
                    // console.log(response.data.carrinho);
                    // setLoadingCart(false);

                    if (response.data.carrinho.length > 0) {
                        setProdutoId(response.data.carrinho[0].produtoId);
                    }
                }
            } catch (error) {
                console.log(error);
                // setLoadingCart(false);
            } finally {
                setLoadingCart(false);
            }
        }

        getCart();
    }, [cart])

    async function deleteCartProduct(id: number) {

        setLoadingCart(true);

        try {
            if (token) {
                await api.delete(`/cart/${id}`, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                setCart(cart.filter((c: CartOrderUser) => c.id !== produtoId));
                setLoadingCart(false);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            setLoadingCart(false);
        }
    }

    async function clearCart() {
        try {
            if(token) {
                await api.delete("/cart/clear", {headers: {
                    "Authorization": "Bearer " + JSON.parse(token)
                }})

                window.location.reload();
            }
        } catch(error) {
            console.log(error);
        }
    }

    return {
        handleAddCart,
        cart,
        deleteCartProduct,
        loadingCart,
        clearCart,
        produtoId
    }
}