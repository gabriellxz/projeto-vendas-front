import { jwtDecode } from "jwt-decode"
import { useContext, useState } from "react"
import api from "../config/config";
import Cart from "../types/cart";
import { useParams } from "react-router-dom";
import { DataUser } from "../context/dataUser";

interface UserDecoded {
    id: number;
}

export default function useCart() {

    const token = localStorage.getItem("tokenUser")
    // const [user, setUser] = useState<UserDecoded>()
    const { idProduto } = useParams()

    // if (token) {
    //     const decoded = jwtDecode(token) as UserDecoded
    //     setUser(decoded)
    //     console.log(user?.id)
    // }
    const user = useContext(DataUser)

    const data: Cart = {
        produtoId: Number(idProduto),
        amount: 1,
        usuarioId: user?.id
    }

    async function handleCart() {
        try {
            if (token) {
                const response = await api.post("/cart/insert", data, {
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {

    }
}