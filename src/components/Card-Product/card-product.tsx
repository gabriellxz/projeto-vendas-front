import { Link } from 'react-router-dom'
import ProdutosDTO from '../../types/produto'
import Moeda from '../../utils/moeda';
import useCart from '../../hook/useCart';
import Loading from '../Loading/loading';
// import imgProduct from '../../assets/produto-1.webp'

interface PropsProduto {
    iProduto: ProdutosDTO;
    reload: () => void;
}

export default function CardProduct(props: PropsProduto) {

    const { handleAddCart, loadingCart } = useCart();

    return (
        <div className={`text-center`}>
            <Link to={`/detalhes-produtos/${props.iProduto.id_produto}`}>
                <img src={props.iProduto.imagem && props.iProduto.imagem[0] && props.iProduto.imagem[0].url} alt="" className='py-5 max-w-[300px] h-[300px] w-full' />
            </Link>
            <Link to={`/detalhes-produtos/${props.iProduto.id_produto}`}>{props.iProduto.nome_produto}</Link>
            <p className={`font-bold ${props.iProduto.oferta ? "text-green-600" : ""}`}>{Moeda.formatar(props.iProduto.preco)}</p>
            <div className='flex justify-center'>
                {
                    loadingCart ? <Loading /> : <button className="p-2 border border-1 border-black w-full" onClick={() => handleAddCart(props.iProduto.id_produto)}>Adicionar ao carrinho</button>
                }
            </div>
        </div>
    )
}