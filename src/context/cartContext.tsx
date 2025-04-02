import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartOrderUser } from "../types/cart";
import api from "../config/config";
import { UserAutenticado } from "./authContext";
import { parseToken } from "../utils/parseToken";
import { useNavigate } from "react-router-dom";

interface ContextTypeCart {
    cart: CartOrderUser[];
    addToCart: (productId: number, amount: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    updateQuantity: (productId: number, amount: number) => void;
    handleIncrement: (produtoId: number, amount: number) => void;
    handleDecrease: (produtoId: number, amount: number) => void;
    setBagIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    bagIsOpen: boolean | undefined;
    loadingCart: boolean | undefined;
    produtoId: number | undefined;
}

const CartContext = createContext<ContextTypeCart | undefined>(undefined)

export function CartProvider({ children }: any) {

    const { token } = useContext(UserAutenticado)
    const parsedToken = parseToken(token)

    const navigate = useNavigate()
    const [cart, setCart] = useState<CartOrderUser[]>([])
    const [bagIsOpen, setBagIsOpen] = useState<boolean | undefined>(false)
    const [loadingCart, setLoadingCart] = useState<boolean | undefined>(undefined)
    const [produtoId, setProdutoId] = useState<number | undefined>(undefined)


    const loadCart = useCallback(async () => {
        try {
            if (token) {
                const response = await api.get("/cart/find", {
                    headers: {
                        "Authorization": `Bearer ${parsedToken}`
                    }
                })
                setCart(response.data.carrinho)

                if (response.data.carrinho.length > 0) {
                    setProdutoId(response.data.carrinho[0].produtoId);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, [parsedToken])

    async function addToCart(produtoId: number, amount: number) {
        setLoadingCart(true)

        try {
            if (token) {
                const response = await api.post("/cart/insert", { amount, produtoId }, {
                    headers: {
                        "Authorization": `Bearer ${parsedToken}`
                    }
                })

                setLoadingCart(false)
                setBagIsOpen(true)
                setCart(response.data.carrinho)
                console.log(response.data)
            } else {
                navigate("/login")
            }
        } catch (error) {
            setLoadingCart(false)
            console.log(error)
        }
    }

    async function removeFromCart(productId: number) {
        try {
            if (token) {
                await api.delete(`/cart/${productId}`, {
                    headers: {
                        "Authorization": `Bearer ${parsedToken}`
                    }
                })
                setCart(cart.filter(c => c.produtoId !== productId))
            }
        } catch (error) {

        }
    }

    async function clearCart() {
        try {
            if (token) {
                await api.delete("/cart/clear", {
                    headers: {
                        "Authorization": `Bearer ${parsedToken}`
                    }
                })
                setCart([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function updateQuantity(produtoId: number, amount: number) {
        try {
            if (token) {
                const response = await api.patch("/cart/update", { produtoId, amount }, {
                    headers: {
                        "Authorization": `Bearer ${parsedToken}`
                    }
                })
                // console.log(response.data.carrinho[produtoId])
                setCart(response.data.carrinho)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleIncrement(produtoId: number, amount: number) {
        const newAmount = amount + 1
        await updateQuantity(produtoId, newAmount)
    }

    async function handleDecrease(produtoId: number, amount: number) {
        const newAmount = amount - 1
        await updateQuantity(produtoId, newAmount)

        if (newAmount < 1) {
            removeFromCart(produtoId)
        }
    }

    useEffect(() => {
        if(token) {
            loadCart()
        } else {
            setCart([])
        }
        // console.log("carrinho foi chamado")
    }, [parsedToken])

    return (
        <CartContext.Provider
            value={{
                addToCart,
                clearCart,
                removeFromCart,
                updateQuantity,
                handleDecrease,
                handleIncrement,
                cart,
                bagIsOpen,
                setBagIsOpen,
                loadingCart,
                produtoId
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("erro no context do carrinho")
    }

    return context
}