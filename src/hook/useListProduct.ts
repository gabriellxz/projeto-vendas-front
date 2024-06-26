import { useContext, useEffect, useState } from "react"
import ProdutosDTO from "../types/produto"
import api from "../config/config"
import { UserAutenticado } from "../context/authContext"

export default function useListProduct() {

    // const token = localStorage.getItem("tokenUser")
    const { token } = useContext(UserAutenticado)
    const [product, setProduct] = useState<ProdutosDTO[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        async function getProducts() {
            if (token) {
                const response = await api.get("/Product", {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(token)}`
                    }
                })
                try {
                    setProduct(response.data.Produtos)
                    setLoading(false)
                } catch (error) {
                    // console.log(error)
                    setLoading(false)
                }
            }
        }

        getProducts()
    }, [])

    return {
        product,
        loading
    }
}