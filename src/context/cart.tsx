import { createContext, useContext, useState } from "react";
import Cart from "../types/cart";
import api from "../config/config";
import { DataUser } from "./dataUser";
import useProdutoId from "../hook/useProdutoId";

interface ContextCart {
    cart: Cart | undefined;
    addCart: () => void;
}

const CartContext = createContext<ContextCart>({} as ContextCart)

function CartProvider({ children }: any) {
    const token = localStorage.getItem("tokenUser")
    const user = useContext(DataUser)
    const [cart, setCart] = useState<Cart>()
    const { idProduto } = useProdutoId()
    
    const dataCart: Cart = {
        amount: 1,
        produtoId: idProduto,
        usuarioId: user?.id
    }

    async function addCart() {

        console.log(idProduto)

        try {
            if (token) {
                const response = await api.post("/cart/insert", dataCart, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })
                
                console.log(response.data)
                setCart(response.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <CartContext.Provider value={{ cart, addCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }