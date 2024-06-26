import useListProduct from "../../hook/useListProduct";
import ProdutosDTO from "../../types/produto";
import MiniCard from "../Mini-card/mini-card";

export default function SlidesMiniCard() {

    const { product } = useListProduct()

    // const produtosOferta = product.filter((product: ProdutosDTO) => {
    //     product.oferta === true
    // })

    return (
        <>
            {/* TELAS PEQUENAS */}
            <div className={`
                            sm:hidden
                        `}>
                <div className="overflow-x-scroll flex gap-4">
                    {
                        product.slice(0, 2).filter((product: ProdutosDTO) => product.oferta == true).map((product: ProdutosDTO) => (
                            <MiniCard key={product.id_produto} iProduto={product} />
                        ))
                    }
                </div>
            </div>

            {/* TELAS GRANDES */}
            <div className={`
                            hidden gap-5
                            sm:grid sm:grid-cols-2
                            md:grid md:grid-cols-3
                            lg:flex
                        `}>
                {
                    product.filter((product: ProdutosDTO) => product.oferta == true).map((product: ProdutosDTO) => (
                        <MiniCard key={product.id_produto} iProduto={product} />
                    ))
                }
            </div>
        </>
    )
}
