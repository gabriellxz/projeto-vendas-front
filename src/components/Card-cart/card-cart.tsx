// import imgproduto from '../../assets/produto.webp'
import TrashIcon from '../../svg/trash-icon'
import { CartOrderUser } from '../../types/cart'
import Moeda from '../../utils/moeda'
import useCart from '../../hook/useCart'
import { useContext, useState } from 'react'
import api from '../../config/config'
import { UserAutenticado } from '../../context/authContext'

interface PropsCart {
    iCart: CartOrderUser
}

export default function CardCart(props: PropsCart) {

    const { token } = useContext(UserAutenticado);
    const [amount, setAmount] = useState<number>(props.iCart.amount);
    const { deleteCartProduct } = useCart();

    async function incrementCart(produtoId: number) {
        const updatedAmount = amount + 1; // Use o valor atualizado diretamente

        // setAmount(amount + 1)

        const cartUpdate = {
            amount: updatedAmount,
            produtoId: produtoId
        };

        try {
            if (token) {
                const response = await api.patch("/cart/update", cartUpdate, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                });
                setAmount(updatedAmount);
                console.log("amount: " + updatedAmount);
                console.log(response.data)

            }
        } catch (err) {
            console.log(err);
        }
    }

    async function decreaseCart(produtoId: number) {
        const updatedAmount = amount - 1;

        // setAmount(amount - 1)

        if (updatedAmount < 1) {
            deleteCartProduct(produtoId)
        }

        const cartUpdate = {
            amount: updatedAmount,
            produtoId: produtoId
        };

        try {
            if (token) {
                const response = await api.patch("/cart/update", cartUpdate, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                });
                setAmount(updatedAmount);
                console.log("amount: " + updatedAmount);
                console.log(response.data)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className='flex mt-[40px] pt-[20px] border-solid border-t-2 border-black'>
                <div>
                    <img src={props.iCart.produtos.imagem && props.iCart.produtos.imagem[0] && props.iCart.produtos.imagem[0].url} alt="img" className='max-w-[175px] h-[215px] w-full' />
                </div>
                <div className='ml-[58px] w-full'>
                    <div className='flex flex-col'>
                        <span className='text-xl uppercase flex items-center justify-between'>
                            {props.iCart.produtos.nome_produto}
                            <span onClick={() => deleteCartProduct(props.iCart.produtoId)}>
                                <TrashIcon />
                            </span>
                        </span>
                        <span className='text-zinc-400'>{props.iCart.produtos.descricao}</span>
                    </div>
                    <div className='flex flex-col mt-[27px]'>
                        <div className='flex gap-3'>
                            <span className='cursor-pointer select-none' onClick={() => decreaseCart(props.iCart.produtoId)}>-</span>
                            <span className='select-none'>{amount}</span>
                            <span className='cursor-pointer select-none' onClick={() => incrementCart(props.iCart.produtoId)}>+</span>
                    </div>
                    {/* <span className='text-zinc-400'>300ml</span> */}
                    <span className='font-bold select-none'>{Moeda.formatar(props.iCart.produtos.preco)}</span>
                </div>
            </div>
        </div >
        </>
    )
}