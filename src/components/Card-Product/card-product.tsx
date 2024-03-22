import { Link } from 'react-router-dom'
import ProdutosDTO from '../../types/produto'
import imgProduct from '../../assets/produto-1.webp'

interface PropsProduto {
    iProduto: ProdutosDTO
}

export default function CardProduct(props: PropsProduto) {

    return (
        <Link to={`/home/detalhes-produtos/${props.iProduto.id_produto}`}>
            <div className=" sm:max-w-[630px] sm:w-full sm:h-[697px]">
                <div>
                    <img src={imgProduct} alt="" />
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