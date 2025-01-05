import ProdutosDTO from "../../types/produto"
// import imgProduct from '../../assets/produto.webp'
import Moeda from "../../utils/moeda"
import ButtonDark from "../Button-dark/button-dark"
import useCart from "../../hook/useCart"
import Catalog from "../Catalog/catalog"
import Loading from "../Loading/loading"
import { useParams } from "react-router-dom"


interface Props {
    iProdutoDetails: ProdutosDTO
}

export default function DetailsProductPage(props: Props) {

    const { handleAddCart, loadingCart } = useCart();
    const params = useParams();

    return (
        <div className={`
            m-[30px]
            sm:mt-20 sm:m-10
        `}>
            <p>{props.iProdutoDetails.nome_produto}</p>
            <div className={`
                w-full flex flex-col mt-[30px] p-2 mb-[100px]
                lg:flex lg:flex-row
            `}>
                <div className={`
                    flex flex-col-reverse gap-5 w-full
                    md:flex md:flex-row md:w-full md:mr-20
                `}>
                    {/* <div className={`
                        flex justify-center overflow-x-scroll gap-3
                        md:flex md:flex-col md:overflow-hidden md:justify-normal
                    `}>
                        <img src={imgProduct} alt="" className="max-w-[100px] h-[137px] w-full mb-3" />
                        <img src={imgProduct} alt="" className="max-w-[100px] h-[137px] w-full mb-3" />
                        <img src={imgProduct} alt="" className="max-w-[100px] h-[137px] w-full mb-3" />
                        <img src={imgProduct} alt="" className="max-w-[100px] h-[137px] w-full mb-3" />
                    </div> */}
                    <div>
                        <img src={props.iProdutoDetails.imagem && props.iProdutoDetails.imagem[0] && props.iProdutoDetails.imagem[0].url} alt="" className={`
                            w-full h-[870px]
                            md:w-full
                        `} />
                    </div>
                </div>
                <div className="w-full">
                    <div className="mb-5">
                        <h1 className="text-4xl mb-3">{props.iProdutoDetails.nome_produto}</h1>
                        <p>{props.iProdutoDetails.descricao}</p>
                    </div>
                    <div className="mb-5">
                        <p className="font-bold">{Moeda.formatar(props.iProdutoDetails.preco)}</p>
                    </div>
                    <div className="mb-10">
                        <p>Estoque: {props.iProdutoDetails.estoque}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {loadingCart ? <Loading /> : <ButtonDark text="Adicionar ao carrinho" propsBtn={() => handleAddCart(Number(params.idProduto))} />}
                    </div>
                </div>
            </div>
            <div className="mt-[200px]">
                <div className="pl-10">
                    <span className="uppercase text-2xl">Recomendado para você</span>
                </div>
                <div className="flex justify-center">
                    <Catalog />
                </div>
            </div>
        </div>
    )
}