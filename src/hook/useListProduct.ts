import { useEffect, useState } from "react"
import ProdutosDTO from "../types/produto"
import api from "../config/config"

export default function useListProduct() {

    // const token = localStorage.getItem("tokenUser")
    const [product, setProduct] = useState<ProdutosDTO[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        async function getProducts() {
            const response = await api.get("/Product")
            try {
                setProduct(response.data.Produtos)
                setLoading(false)
            } catch (error) {
                // console.log(error)
                setLoading(false)
            }
        }

        getProducts()
    }, [])

    return {
        product,
        loading,
        setProduct
    }
}