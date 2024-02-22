import { useParams } from "react-router-dom";
import * as productService from '../../service/produto-service'
import { useEffect, useState } from "react";
import ProdutosDTO from "../../types/produto";
import CardDetails from "../../components/Details-product-page/details-product-page";
import Loading from "../../components/Loading/loading";

export default function DetailsProduct() {

    const params = useParams()
    const [produto, setProduto] = useState<ProdutosDTO>()
    const token = localStorage.getItem("tokenUser")
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {

        setLoading(true)

        if (token) {
            productService.findById(Number(params.idProduto), token)
                .then((response) => {
                    console.log(response.data)
                    setProduto(response.data)
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        }
    }, [])


    return (
        <>
            {
                loading ? <Loading styleLoading="absolute top-[50%] left-[50%] bottom-[50%] right-[50%]"/> : produto && <CardDetails iProdutoDetails={produto} />
            }
        </>
    )
}