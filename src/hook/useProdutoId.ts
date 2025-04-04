import { useEffect, useState } from "react";
import ProdutosDTO from "../types/produto";
import { useParams } from "react-router-dom"
import { AxiosResponse } from 'axios';
import api from '../config/config';

export default function useProdutoId() {

    const params = useParams()
    const [produto, setProduto] = useState<ProdutosDTO>()
    const [loading, setLoading] = useState<boolean>(false)
    // const token = localStorage.getItem("tokenUser")

    useEffect(() => {
        async function produtoById() {

            setLoading(true)

            try {
                const response: AxiosResponse = await api.get(`/Product/${Number(params.idProduto)}`)

                setLoading(false)
                // console.log(response.data)
                setProduto(response.data)
                // console.log("id do produto: "+ response.data.id_produto)
            } catch (error) {
                setLoading(false)
                // console.log(error)
            }
        }

        produtoById()
    }, [params.idProduto])

    return {
        produto,
        loading,
    }
}
