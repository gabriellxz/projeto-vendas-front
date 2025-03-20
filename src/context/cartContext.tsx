import { createContext, useContext, useEffect, useState } from "react";
import { CartOrderUser } from "../types/cart";
import api from "../config/config";
import { UserAutenticado } from "./authContext";

interface ContextTypeCart {
    cart: CartOrderUser[];
    addToCart: (productId: number, amount: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    updateQuantity: (productId: number, amount: number) => void;
    handleIncrement: (produtoId: number, amount: number) => void;
    handleDecrease: (produtoId: number, amount: number) => void;
    setBagIsOpen: React.Dispatch<React.SetStateAction<boolean | undefined>>
    bagIsOpen: boolean | undefined
}

const CartContext = createContext<ContextTypeCart | undefined>(undefined)

export function CartProvider({ children }: any) {

    const { token } = useContext(UserAutenticado)
    const [cart, setCart] = useState<CartOrderUser[]>([])
    const [bagIsOpen, setBagIsOpen] = useState<boolean | undefined>(false)

    async function loadCart() {
        try {
            if (token) {
                const response = await api.get("/cart/find", {
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

    async function addToCart(produtoId: number, amount: number) {
        try {
            if (token) {
                const response = await api.post("/cart/insert", { amount, produtoId }, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })
                setBagIsOpen(true)
                setCart(response.data.carrinho)
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function removeFromCart(productId: number) {
        try {
            if (token) {
                await api.delete(`/cart/${productId}`, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
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
                        "Authorization": "Bearer " + JSON.parse(token)
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
                        "Authorization": "Bearer " + JSON.parse(token)
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
        loadCart()
        // console.log("carrinho foi chamado")
    }, [cart])

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
                setBagIsOpen
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