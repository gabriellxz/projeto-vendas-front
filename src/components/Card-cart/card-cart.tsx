// import imgproduto from '../../assets/produto.webp'
import { useCart } from '../../context/cartContext'
import { CartOrderUser } from '../../types/cart'
import Moeda from '../../utils/moeda'

interface PropsCart {
    iCart: CartOrderUser
}

export default function CardCart(props: PropsCart) {

    const { handleDecrease, handleIncrement } = useCart()

    return (
        <div className='flex justify-between'>
            <div className='flex gap-4'>
                <img
                    src={props.iCart && props.iCart.produtos && props.iCart.produtos.imagem && props.iCart.produtos.imagem[0] && props.iCart.produtos.imagem[0].url}
                    alt=""
                    className='w-[50px]'
                />
                <div className='flex flex-col items-start'>
                    <p className='font-extrabold'>{props.iCart.produtos.nome_produto}</p>
                    <div className="flex items-center bg-white rounded-lg shadow-md p-1 max-w-[130px] w-full">
                        <button onClick={() => handleDecrease(props.iCart.produtoId, props.iCart.amount)} id="decrementar" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                            -
                        </button>

                        <span id="contador" className="mx-4 text-xl font-semibold">
                            {props.iCart.amount}
                        </span>

                        <button onClick={() => handleIncrement(props.iCart.produtoId, props.iCart.amount)} id="incrementar" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className='font-bold'>
                <p>{Moeda.formatar(props.iCart.produtos.preco * props.iCart.amount)}</p>
            </div>
        </div>
    )
}