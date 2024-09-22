import { useContext, useEffect, useState } from "react";
import ProdutosDTO from "../types/produto";
import { useParams } from "react-router-dom"
import { AxiosResponse } from 'axios';
import api from '../config/config';
import { UserAutenticado } from "../context/authContext";

export default function useProdutoId() {

    const params = useParams()
    const [produto, setProduto] = useState<ProdutosDTO>()
    const [loading, setLoading] = useState<boolean>(false)
    // const token = localStorage.getItem("tokenUser")
    const { token } = useContext(UserAutenticado)

    useEffect(() => {
        async function produtoById() {

            setLoading(true)

            try {
                if (token) {
                    const response: AxiosResponse = await api.get(`/Product/${Number(params.idProduto)}`, {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    setLoading(false)
                    // console.log(response.data)
                    setProduto(response.data)
                    // console.log("id do produto: "+ response.data.id_produto)
                }
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
