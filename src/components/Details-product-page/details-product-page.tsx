import ProdutosDTO from "../../types/produto"
// import imgProduct from '../../assets/produto.webp'
import Moeda from "../../utils/moeda"
import useCart from "../../hook/useCart"
import Catalog from "../Catalog/catalog"
import { useParams } from "react-router-dom"
import { Button, Divider } from "@mui/material"
import Footer from "../Footer/footer"


interface Props {
    iProdutoDetails: ProdutosDTO
}

export default function DetailsProductPage(props: Props) {

    const { handleAddCart, loadingAddCart } = useCart();
    const params = useParams();

    return (
        <div>
            <div className="sm:flex sm:justify-center sm:items-center sm:mt-[100px] sm:px-5">
                <div className="sm:flex">
                    <div className="mb-5 sm:w-[50%]">
                        <div className="relative">
                            <div className="bg-black absolute w-full h-full opacity-50 rounded-b-[30px]"></div>
                            <img
                                className="rounded-b-[30px] h-[600px] w-full sm:rounded-none"
                                src={props.iProdutoDetails.imagem && props.iProdutoDetails.imagem[0] && props.iProdutoDetails.imagem[0].url}
                            />
                            <span className="absolute bottom-5 px-4 text-2xl text-white sm:hidden">
                                {props.iProdutoDetails.nome_produto}
                            </span>
                        </div>
                    </div>
                    <div className="sm:w-[50%]">
                        <div className="mx-5 sm:hidden">
                            <Divider />
                        </div>
                        <div className="mx-5 mt-5 pb-5">
                            <div className="flex flex-col gap-2">
                                <span className="text-4xl hidden sm:flex">{props.iProdutoDetails.nome_produto}</span>
                                <span className="text-2xl text-greenEco-100">{Moeda.formatar(props.iProdutoDetails.preco)}</span>
                            </div>
                            <div className="mt-7 bg-zinc-100 w-full py-7 px-3 rounded-lg">
                                <span className="font-bold text-xl">{props.iProdutoDetails.nome_produto}</span>
                                <p className="mt-5 font-light">
                                    {props.iProdutoDetails.descricao}
                                </p>
                            </div>
                            <div className="mt-5 flex gap-2">
                                {
                                    loadingAddCart ? (
                                        <Button
                                            variant="contained"
                                            onClick={() => handleAddCart(Number(params.idProduto))}
                                            sx={{ width: "100%" }}
                                            disabled
                                        >
                                            Adicionar ao carrinho
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={() => handleAddCart(Number(params.idProduto))}
                                            sx={{ width: "100%" }}
                                        >
                                            Adicionar ao carrinho
                                        </Button>
                                    )
                                }
                                <Button variant="outlined" sx={{ width: "100%" }}>Comprar</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Catalog />
            </div>
            <Footer/>
        </div>
    )
}