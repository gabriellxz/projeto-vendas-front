import Pedidos from "../../types/pedidos"

interface PropsProduct {
    details?: Pedidos;
}

export default function InforProduct(props:PropsProduct) {
    return (
        <>
            <div className="mt-8 flex flex-col gap-7 py-5">
                <div className="flex w-full gap-8">
                    <div className="flex items-center gap-5 w-full">
                        <span className="font-semibold">Produto</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.carrinho.produtos.nome_produto}</span>
                    </div>
                    <div className="flex items-center gap-5 w-full">
                        <span className="font-semibold max-w-[80px] w-full">Nº pedido</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.id}</span>
                    </div>
                </div>
                <div className="flex w-full gap-8">
                    <div className="flex items-center gap-5 w-full">
                        <span className="font-semibold">Quantidade</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.carrinho.amount}</span>
                    </div>
                    <div className="flex items-center gap-5 w-full">
                        <span className="font-semibold">Preço</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.carrinho.produtos.preco}</span>
                    </div>
                </div>
                <div className="flex w-full gap-8">
                    <div className="flex items-center gap-5 w-full">
                        <span className="font-semibold max-w-[150px] w-full">Nº de rastreamento</span>
                        <input type="text" className="border border-zinc-500 rounded-md w-full p-2"/>
                        <button className="bg-greenEco-100 px-6 py-1 font-semibold text-white rounded-md">Enviar</button>
                    </div>
                </div>
            </div>
        </>
    )
}