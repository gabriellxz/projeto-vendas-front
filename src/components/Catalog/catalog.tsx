import useListProduct from "../../hook/useListProduct"
import ProdutosDTO from "../../types/produto"
import CardProduct from "../Card-Product/card-product"
import Loading from "../Loading/loading"

interface Props {
    reload: () => void;
}

export default function Catalog(props:Props) {

    const { product, loading } = useListProduct()

    return (
        <div className="sm:grid sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 grid grid-cols-2 gap-5 mt-5 pt-10 p-10">

            {loading ? (
                <Loading />
            ) : (
                product.length > 0 ? (
                    product.map((product: ProdutosDTO) => (
                        <CardProduct key={product.id_produto} iProduto={product} reload={props.reload}/>
                    ))
                ) : (
                    <p>Não existem produtos...</p>
                )
            )}
        </div>
    )
}