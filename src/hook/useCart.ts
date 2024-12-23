import { useContext, useEffect, useState } from "react"
import { CartOrderUser } from "../types/cart"
import api from "../config/config"
import { AxiosResponse } from "axios"
// import useProdutoId from "./useProdutoId"
import { useNavigate } from "react-router-dom"
import { UserAutenticado } from "../context/authContext"
import { toast } from "react-toastify"
export default function useCart() {

    const navigate = useNavigate();
    const { token } = useContext(UserAutenticado);
    // const { produto } = useProdutoId();
    const [cart, setCart] = useState<CartOrderUser[]>([]);
    const [produtoId, setProdutoId] = useState<number>();
    const [loadingCart, setLoadingCart] = useState<boolean>(false);
    const [loadingAddCart, setLoadingAddCart] = useState<boolean>(false)
    // const params = useParams();

    async function handleAddCart(idProduto: number) {

        setLoadingAddCart(true);

        const data = {
            amount: 1,
            produtoId: Number(idProduto)
        }

        try {
            if (token) {
                const response = await api.post("/cart/insert", data, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                console.log(response)
                navigate("/carrinho")
                setLoadingAddCart(false);
            } else {
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
            setLoadingAddCart(false);
        }
    }

    useEffect(() => {

        setLoadingCart(true);

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
    }, [token])

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
                toast.success("Produto adicionado ao carrinho!", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            }
        } catch (error) {
            console.log(error);
            setLoadingCart(false);

            toast.error("Não foi possível remover este produto do carrinho.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    }

    async function clearCart() {
        try {
            if (token) {
                await api.delete("/cart/clear", {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                setCart([])
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        handleAddCart,
        cart,
        deleteCartProduct,
        loadingCart,
        clearCart,
        produtoId,
        loadingAddCart
    }
}