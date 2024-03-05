import * as productService from '../service/produto-service'
import { useEffect, useState } from "react";
import ProdutosDTO from "../types/produto";
import { useParams } from "react-router-dom"

export default function useProdutoId() {

    const params = useParams()
    const [produto, setProduto] = useState<ProdutosDTO>()
    const [loading, setLoading] = useState<boolean>(false)
    const [idProduto, setIdProduto] = useState<number>()
    const token = localStorage.getItem("tokenUser")

    useEffect(() => {

        setLoading(true)

        if (token) {
            productService.findById(Number(params.idProduto), token)
                .then((response) => {
                    console.log(response.data)
                    setProduto(response.data)
                    setIdProduto(response.data.id_produto)
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        }
    }, [])

    return {
        produto,
        loading,
        idProduto
    }
}