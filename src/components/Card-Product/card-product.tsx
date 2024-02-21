import { Link } from 'react-router-dom'
import produtoImg from '../../assets/produto.webp'
import ProdutosDTO from '../../types/produto'

interface PropsProduto {
    iProduto: ProdutosDTO
}

export default function CardProduct(props: PropsProduto) {
    return (
        <Link to={`/home/detalhes-produtos/${props.iProduto.id_produto}`}>
            <div className="max-w-[630px] sm:w-full sm:h-[697px]">
                <div>
                    <img src={produtoImg} alt="" />
                </div>
                <div>
                    <h2 className="text-xl text-greenEco-300 font-bold">{props.iProduto.nome_produto}</h2>
                    <p className="text-greenEco-200">
                        {props.iProduto.descricao}
                    </p>
                </div>
            </div>
        </Link>
    )
}