import { Link } from 'react-router-dom'
import ProdutosDTO from '../../types/produto'
// import imgProduct from '../../assets/produto-1.webp'

interface PropsProduto {
    iProduto: ProdutosDTO;
    reload: () => void;
}

export default function CardProduct(props: PropsProduto) {

    return (
        <Link to={`/home/detalhes-produtos/${props.iProduto.id_produto}`} onClick={props.reload}>
            <div className="sm:max-w-[630px] sm:w-full sm:h-[697px]">
                <div>
                    <img src={props.iProduto.imagem && props.iProduto.imagem[0] && props.iProduto.imagem[0].url} alt="" className='w-[200px] h-[200px] sm:w-[630px] sm:h-[630px]' />
                </div>
                <div>
                    <h2 className="text-xl text-greenEco-300 font-bold text-[15px]">{props.iProduto.nome_produto}</h2>
                    <p className="text-greenEco-200 text-[12px]">
                        {props.iProduto.descricao}
                    </p>
                </div>
            </div>
        </Link>
    )
}