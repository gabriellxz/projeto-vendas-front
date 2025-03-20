import { Link } from 'react-router-dom'
import ProdutosDTO from '../../types/produto'
import Moeda from '../../utils/moeda';
import { useCart } from '../../context/cartContext';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
// import imgProduct from '../../assets/produto-1.webp'

interface PropsProduto {
    iProduto: ProdutosDTO;
}

export default function CardProduct(props: PropsProduto) {

    const { addToCart, loadingCart } = useCart();

    return (
        <div className='w-full border border-1 border-zinc-500 mb-5'>
            <img src={
                props.iProduto &&
                props.iProduto.imagem &&
                props.iProduto.imagem[0] &&
                props.iProduto.imagem[0].url
            }
                className='w-full h-[300px]'
                alt={props.iProduto.nome_produto}
            />
            <div className='px-3 py-5'>
                <div>
                    <span className='font-bold font-jura text-xl'>{props.iProduto.nome_produto}</span>
                </div>
                <div>
                    {
                        props.iProduto.oferta ? <span className='text-2xl font-bold text-green-500'>{Moeda.formatar(props.iProduto.preco)}</span> :
                            <span className='text-2xl font-bold'>{Moeda.formatar(props.iProduto.preco)}</span>
                    }
                </div>
            </div>
            <div className='flex'>
                <Link to={`/detalhes-produtos/${props.iProduto.id_produto}`} className='w-full'>
                    <button className='text-[20px] bg-greenEco-200 w-full text-white p-1 font-jura'>Ver produto</button>
                </Link>

                {loadingCart ? (
                    <button disabled onClick={() => addToCart(props.iProduto.id_produto, 1)} className='text-[20px] bg-zinc-500 w-[50%] flex justify-center items-center'>
                        <ShoppingBagIcon className='w-[30px] text-white' />
                    </button>
                ) : (
                    <button onClick={() => addToCart(props.iProduto.id_produto, 1)} className='text-[20px] bg-zinc-800 w-[50%] flex justify-center items-center'>
                        <ShoppingBagIcon className='w-[30px] text-white' />
                    </button>
                )}

            </div>
        </div>
    )
}