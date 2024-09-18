import { Link } from 'react-router-dom'
import ProdutosDTO from '../../types/produto'
import Moeda from '../../utils/moeda';
import { ShoppingCartIcon } from '@heroicons/react/16/solid';
import useCart from '../../hook/useCart';
import { CartOrderUser } from '../../types/cart';
import { CartIcon } from '../../svg/cart-icon';
import Loading from '../Loading/loading';
// import imgProduct from '../../assets/produto-1.webp'

interface PropsProduto {
    iProduto: ProdutosDTO;
    reload: () => void;
}

export default function CardProduct(props: PropsProduto) {

    const { handleAddCart, cart, loadingCart } = useCart();

    const isCart = cart.some((c: CartOrderUser) => c.produtoId === props.iProduto.id_produto);

    return (
        <div className='bg-zinc-100 p-2'>
            <Link to={`/home/detalhes-produtos/${props.iProduto.id_produto}`} onClick={props.reload}>
                <div className="sm:max-w-[630px] sm:w-full sm:h-[697px]">
                    <div>
                        <img src={props.iProduto.imagem && props.iProduto.imagem[0] && props.iProduto.imagem[0].url} alt="" className='w-[200px] h-[200px] sm:w-[630px] sm:h-[630px]' />
                    </div>
                    <div>
                        <div className='flex justify-between py-1'>
                            <h2 className="text-xl text-greenEco-300 font-bold text-[15px]"
                                style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            >{props.iProduto.nome_produto}</h2>
                            <div className='flex gap-5'>
                                <span className='font-bold text-2xl text-green-700'>{Moeda.formatar(props.iProduto.preco)}</span>
                            </div>
                        </div>
                        <p className="text-greenEco-200 text-[12px]"
                            style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                            {props.iProduto.descricao}
                        </p>
                    </div>
                </div>
            </Link>
            <span className='flex justify-end cursor-pointer'>
                {isCart ? (
                    <>
                        {loadingCart ? <Loading /> : <ShoppingCartIcon className='w-[30px]' onClick={() => handleAddCart(props.iProduto.id_produto)} />}
                    </>
                ) : (
                    <>
                        {loadingCart ? <Loading /> : <span onClick={() => handleAddCart(props.iProduto.id_produto)}>
                            <CartIcon />
                        </span>}
                    </>
                )}
            </span>
        </div>
    )
}