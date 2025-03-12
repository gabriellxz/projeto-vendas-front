import { useParams } from "react-router-dom"
import useListProduct from "../../../hook/useListProduct"
import CardProduct from "../../../components/Card-Product/card-product"
import Footer from "../../../components/Footer/footer"
import { useSearch } from "../../../context/searchContext"

export default function CategoriesId() {

    const params = useParams()
    const { product } = useListProduct()
    const { searchTerm } = useSearch()

    const filteredProducts = product.filter(p => p.categoryId == Number(params.categoriaId))

    const filterCondition = searchTerm ? product : filteredProducts
    const filteredSearchProduct = filterCondition.filter(p =>
        p.nome_produto.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div>
            <div className="flex justify-center">
                <div className="bg-whiteEco-100 p-5 max-w-[1300px] w-full">
                    <span className="text-2xl font-bold uppercase">
                        <span>{searchTerm ? searchTerm : params.categoria}</span>
                    </span>
                </div>
            </div>
            <div className="flex justify-center sm:h-screen">
                <div>
                    {
                        filteredSearchProduct.length < 1 ? (
                            <div className="h-screen flex items-center">
                                <span className="text-2xl text-center">Não existem produtos nesta categoria</span>
                            </div>
                        ) : (
                            <div className="sm:grid sm:grid-cols-3 lg:grid-cols-3 grid grid-cols-1 my-5 card-item gap-1">
                                {filteredSearchProduct.map(product => (
                                    <CardProduct iProduto={product} key={product.id_produto} />
                                ))}
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}