import { useParams } from "react-router-dom";
import useListProduct from "../../hook/useListProduct"
import ProdutosDTO from "../../types/produto"
import CardProduct from "../Card-Product/card-product"
import Loading from "../Loading/loading"

interface Props {
    searchItem?: string;
}

export default function Catalog(props: Props) {

    const params = useParams()
    const { product, loading } = useListProduct()

    const filterProduct = product.filter((product: ProdutosDTO) =>
        product.nome_produto.toLocaleLowerCase().includes(props.searchItem ? props.searchItem.toLowerCase() : "")
    )

    const filterForRecomended = params.idProduto ?
        product.filter(p => p.id_produto !== parseInt(params.idProduto ? params.idProduto : "0"))
        :
        filterProduct

    return (
        <div className="sm:grid sm:grid-cols-2 sm:gap-7 lg:grid-cols-4 grid grid-cols-2 gap-5 mt-5 pt-10 p-10 card-item">

            {loading ? (
                <Loading />
            ) : (
                product.length > 0 ? (
                    (params.idProduto ? filterForRecomended : filterProduct).map(product => (
                        <CardProduct key={product.id_produto} iProduto={product} />
                    ))
                ) : (
                    <p>Não existem produtos...</p>
                )
            )}


        </div>
    )
}