import produto1 from '../../assets/produto-1.webp'
import ProdutosDTO from '../../types/produto'

interface Props {
    iProduto: ProdutosDTO
}

export default function MiniCard(props:Props) {
    return(
        <>
            <div className='max-w-[224px] w-full bg-white flex flex-col justify-center items-center p-3'>
                <div>
                    <img src={produto1} alt="" />
                </div>
                <div className='text-xl text-center flex justify-center items-center'>
                    <h1 className='text-ellipsis'>{props.iProduto.nome_produto}</h1>
                </div>
            </div>
        </>
    )
}