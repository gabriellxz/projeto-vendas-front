import { useParams } from "react-router-dom";
import useListProduct from "../../hook/useListProduct"
import CardProduct from "../Card-Product/card-product"
import Loading from "../Loading/loading"
import { Divider } from "@mui/material";

export default function Catalog() {

    const params = useParams()
    const { product, loading } = useListProduct()

    const filteredProduct = params.idProduto ?
        product.filter(p => p.id_produto !== parseInt(params.idProduto ? params.idProduto : "0"))
        :
        product

    return (
        <div className="mt-5">
            <div className="mb-5">
                <span className="text-3xl uppercase font-extrabold text-zinc-700 italic tracking-tight">Nossos produtos</span>
                <Divider />
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-7 lg:grid-cols-4 grid grid-cols-1 gap-5 card-item">

                {loading ? (
                    <Loading />
                ) : (
                    filteredProduct.length > 0 ? (
                        filteredProduct.map(p => (
                            <CardProduct iProduto={p} key={p.id_produto} />
                        ))
                    ) : (
                        <p>Não existem produtos...</p>
                    )
                )
                }
            </div>
        </div>
    )
}