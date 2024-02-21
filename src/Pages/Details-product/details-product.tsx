import { useParams } from "react-router-dom";
import * as productService from '../../service/produto-service'
import { useEffect, useState } from "react";
import ProdutosDTO from "../../types/produto";
import CardDetails from "../../components/Card-details/card-details";

export default function DetailsProduct() {

    const params = useParams()
    const [produto, setProduto] = useState<ProdutosDTO>()
    const token = localStorage.getItem("tokenUser")

    useEffect(() => {
        if (token) {
            productService.findById(Number(params.idProduto), token)
                .then((response) => {
                    console.log(response.data)
                    setProduto(response.data)
                }).catch((err) => {
                    console.log(err)
                })
        }
    }, [])


    return (
        <>
            {produto &&
                <CardDetails iProdutoDetails={produto} />
            }
        </>
    )
}