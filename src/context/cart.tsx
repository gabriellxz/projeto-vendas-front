import { createContext, useContext, useState } from "react";
import Cart from "../types/cart";
import * as productService from '../service/produto-service'
import { DataUser } from "./dataUser";
import { AxiosResponse } from "axios";
import { ErrorResponse } from "react-router-dom";
import { ProdutoContext } from "./produtoContext";
import useProdutoId from "../hook/useProdutoId";
import api from "../config/config";

interface ContextCart {
    cart: Cart | undefined;
    handleCart: () => void;
}

const CartContext = createContext<ContextCart>({} as ContextCart)

function CartProvider({ children }: any) {

    const token = localStorage.getItem("tokenUser")
    const produtoId = useContext(ProdutoContext)
    const { produto } = useProdutoId()
    const user = useContext(DataUser)
    const [cart, setCart] = useState<Cart>()


    async function handleCart() {

        const data: Cart = {
            amount: 1,
            produtoId: produto?.id_produto,
            usuarioId: user?.id
        }

        console.log(cart)

        try {
            if (token) {
                const response: AxiosResponse = await api.post("/cart/insert", data, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                setCart(response.data)
                console.log(response.data)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <CartContext.Provider value={{ cart, handleCart }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }