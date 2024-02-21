import ProdutosDTO from "../../types/produto"
import imgProduct from '../../assets/produto.webp'
import Moeda from "../../utils/moeda"
import ButtonDark from "../Button-dark/button-dark"
import ButtonLight from "../Button-light/button-light"

interface Props {
    iProdutoDetails: ProdutosDTO
}

export default function CardDetails(props: Props) {
    return (
        <div className={`
            mt-5
            sm:mt-20 sm:m-10
        `}>
            <p>{props.iProdutoDetails.nome_produto}</p>
            <div className={`
                w-full flex flex-col mt-2 p-2
                lg:flex lg:flex-row
            `}>
                <div className={`
                    flex flex-col-reverse gap-5 w-full
                    md:flex md:flex-row md:w-full mr-20
                `}>
                    <div className={`
                        flex justify-center overflow-scroll gap-3
                        md:flex md:flex-col md:overflow-hidden md:justify-normal
                    `}>
                        <img src={imgProduct} alt="" className="max-w-[100px] h-[137px] w-full mb-3" />
                        <img src={imgProduct} alt="" className="max-w-[100px] h-[137px] w-full mb-3" />
                        <img src={imgProduct} alt="" className="max-w-[100px] h-[137px] w-full mb-3" />
                        <img src={imgProduct} alt="" className="max-w-[100px] h-[137px] w-full mb-3" />
                    </div>
                    <div>
                        <img src={imgProduct} alt="" className={`
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
                        <ButtonDark text="Adicionar ao carrinho" />
                        <ButtonLight text="Favoritar" />
                    </div>
                </div>
            </div>
        </div>
    )
}