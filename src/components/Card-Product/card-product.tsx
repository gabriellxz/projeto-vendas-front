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
        <div className={`border border-1 border-zinc-500 font-jura overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300`}>
            <div className='relative pb-[100%] border-b border-1 border-zinc-500'>
                <img
                    src={
                        props.iProduto &&
                        props.iProduto.imagem &&
                        props.iProduto.imagem[0] &&
                        props.iProduto.imagem[0].url
                    }
                    alt={props.iProduto.nome_produto}
                    className='absolute top-0 left-0 w-full h-full object-cover'
                />
            </div>

            <div className='p-3'>
                <p className='text-center font-bold text-sm md:text-xl lg:text-xl'>
                    {props.iProduto.nome_produto}
                </p>

                <div className='p-3 text-xl md:text-2xl lg:text-3xl font-bold'>
                    {Moeda.formatar(props.iProduto.preco)}
                </div>
            </div>

            <div className='flex w-full'>
                <Link
                    to={`/detalhes-produtos/${props.iProduto.id_produto}`}
                    className='bg-zinc-800 w-full p-2 md:p-3 text-white text-base md:text-lg lg:text-xl text-center button hover:bg-zinc-700 transition-colors duration-300'
                >
                    <button>Ver produto</button>
                </Link>

                {loadingCart ? (
                    <button className='bg-zinc-400 w-[30%] p-2 md:p-3 text-white text-base md:text-lg lg:text-xl flex justify-center items-center'>
                        <ShoppingBagIcon className='w-5 h-5' />
                    </button>
                ) : (
                    <button
                        className='bg-blue-500 w-[30%] p-2 md:p-3 text-white text-base md:text-lg lg:text-xl flex justify-center items-center hover:bg-blue-600 transition-colors duration-300'
                        onClick={() => addToCart(props.iProduto.id_produto, 1)}
                    >
                        <ShoppingBagIcon className='w-5 h-5' />
                    </button>
                )}
            </div>
        </div>
    );
}