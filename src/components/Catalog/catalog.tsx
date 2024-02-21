import useListProduct from "../../hook/useListProduct"
import ProdutosDTO from "../../types/produto"
import CardProduct from "../Card-Product/card-product"
import Loading from "../Loading/loading"

export default function Catalog() {

    const { product, loading } = useListProduct()

    return (
        <div className="sm:grid sm:grid-cols-2 sm:gap-7 grid grid-cols-1 gap-5 mt-10 pt-10 p-10">
            {loading ? (
                <Loading />
            ) : (
                product.length > 0 ? (
                    product.map((product: ProdutosDTO) => (
                        <CardProduct key={product.id_produto} iProduto={product} />
                    ))
                ) : (
                    <p>Não existem produtos...</p>
                )
            )}
        </div>
    )
}