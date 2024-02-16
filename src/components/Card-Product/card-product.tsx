import produtoImg from '../../assets/produto.webp'

export default function CardProduct() {
    return (
        <div className="max-w-[630px] sm:w-full sm:h-[697px]">
            <div>
                <img src={produtoImg} alt="" />
            </div>
            <div>
                <h2 className="text-xl text-greenEco-300 font-bold">Produto 1</h2>
                <p className="text-greenEco-200">
                    descrição do produto
                </p>
            </div>
        </div>
    )
}