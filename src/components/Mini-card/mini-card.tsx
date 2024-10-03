// import produto1 from '../../assets/produto-1.webp'
import { Link } from 'react-router-dom'
import ProdutosDTO from '../../types/produto'

interface Props {
    iProduto: ProdutosDTO
}

export default function MiniCard(props: Props) {
    return (
        <>
            <Link to={`/home/detalhes-produtos/${props.iProduto.id_produto}`}>
                <div className='max-w-[200px] w-full bg-white flex flex-col justify-center items-center p-3'>
                    <div>
                        <img src={props.iProduto.imagem && props.iProduto.imagem[0] && props.iProduto.imagem[0].url} alt="" className='w-[200px] h-[200px]' />
                    </div>
                    <div className='text-xl text-center flex justify-center items-center'>
                        <h1 className='whitespace-nowrap overflow-hidden text-ellipsis'
                            style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >{props.iProduto.nome_produto}</h1>
                    </div>
                </div>
            </Link>
        </>
    )
}