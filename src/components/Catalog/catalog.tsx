import { useNavigate, useParams } from "react-router-dom";
import useListProduct from "../../hook/useListProduct"
import CardProduct from "../Card-Product/card-product"
import Loading from "../Loading/loading"
import ProdutosDTO from "../../types/produto";
import { Carousel } from "primereact/carousel";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Catalog() {

    const navigate = useNavigate()
    const params = useParams()
    const { product, loading } = useListProduct()

    function moreProducts() {
        navigate("produto")
    }

    const filteredProduct = params.idProduto ?
        product.filter(p => p.id_produto !== parseInt(params.idProduto ? params.idProduto : "0"))
        :
        product

    const templateProduct = (p: ProdutosDTO) => (
        <div className="p-2 flex justify-center">
            <div className="max-w-xs w-full">
                <CardProduct
                    iProduto={p}
                    key={p.id_produto}
                />
            </div>
        </div>
    )

    const responsiveOptions = [
        { breakpoint: "1200px", numVisible: 3, numScroll: 1 },
        { breakpoint: "835px", numVisible: 2, numScroll: 1 },
        { breakpoint: "575px", numVisible: 1, numScroll: 1 },
    ];

    return (
        <div className="mt-5 w-full overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full">
                <div className="mb-5 flex justify-between w-full items-center p-5">
                    <span className="text-3xl uppercase font-extrabold text-zinc-800 italic tracking-tight">
                        Destaques
                    </span>
                    <button onClick={moreProducts} className="hidden font-jura border border-1 border-zinc-800 max-w-[200px] w-full uppercase text-xl md:flex  justify-around items-center">
                        Veja mais
                        <ArrowRightIcon className="w-[30px] text-zinc-500" />
                    </button>
                </div>

                {loading ? (
                    <Loading />
                ) : filteredProduct.length > 0 ? (
                    <div className="w-full flex justify-center overflow-hidden">
                        <Carousel
                            value={filteredProduct}
                            itemTemplate={templateProduct}
                            numVisible={4}
                            numScroll={1}
                            responsiveOptions={responsiveOptions}
                            circular={true}
                            className="w-full"
                            contentClassName="w-full"
                        />
                    </div>
                ) : (
                    <p>Não existem produtos...</p>
                )}

                <div className="flex justify-center p-5 md:hidden">
                    <button onClick={moreProducts} className="font-jura border border-1 border-zinc-800 max-w-[200px] w-full uppercase text-xl flex  justify-around items-center">
                        Veja mais
                        <ArrowRightIcon className="w-[30px] text-zinc-500" />
                    </button>
                </div>
            </div>
        </div>
    );
}