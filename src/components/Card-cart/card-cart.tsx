import imgproduto from '../../assets/produto.webp'
import TrashIcon from '../../svg/trash-icon'
import { CartType } from '../../types/cart'
import Moeda from '../../utils/moeda'

interface PropsCart {
    iCart:CartType
}

export default function CardCart(props:PropsCart) {
    return (
        <>
            <div className='flex mt-[40px] pt-[20px] border-solid border-t-2 border-black mr-[33px]'>
                <div>
                    <img src={imgproduto} alt="img" className='max-w-[175px] h-[215px] w-full' />
                </div>
                <div className='ml-[58px] w-full'>
                    <div className='flex flex-col'>
                        <span className='text-xl uppercase flex items-center justify-between'>
                            {props.iCart.produtos.nome_produto} <TrashIcon />
                        </span>
                        <span className='text-zinc-400'>{props.iCart.produtos.descricao}</span>
                    </div>
                    <div className='flex flex-col mt-[27px]'>
                        {/* <span className='text-zinc-400'>300ml</span> */}
                        <span className='font-bold'>{Moeda.formatar(props.iCart.produtos.preco)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}