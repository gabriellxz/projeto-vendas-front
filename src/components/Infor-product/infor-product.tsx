import { CartOrderUser } from "../../types/cart"
import Pedidos from "../../types/pedidos"
import Moeda from "../../utils/moeda"


interface PropsProduct {
    details?: Pedidos
}


export default function InforProduct(props: PropsProduct) {

    const items = props.details?.carrinho.carrinho.carrinho

    const totalAmount = items?.reduce((total, item) => total + item.amount, 0)
    const precoTotal = items?.reduce((total, item) => total + (item.amount * item.produtos.preco), 0)

    return (
        <>
            <div className="flex justify-between bg-green-300 px-7 py-7">
                <div className="flex flex-col">
                    <span>Quantidade de produtos: {totalAmount}</span>
                    <span className="font-bold">Total: {Moeda.formatar(precoTotal ? precoTotal : 0)}</span>
                </div>
                <div>
                    <span className="flex gap-4 items-center">
                        Nº de rastreamento:
                        <input type="text" className="outline-none p-1" />
                        <button className="font-semibold text-white bg-greenEco-100 px-3 py-1 rounded-md">Enviar</button>
                    </span>
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-[70px] py-5 p-8">
                {
                    props.details?.carrinho.carrinho.carrinho.map((p: CartOrderUser) => (
                        <div className="flex gap-5">
                            <div>
                                <img src={p.produtos.imagem && p.produtos.imagem[0] && p.produtos.imagem[0].url} alt="" className="w-[135px] h-[135px] rounded-[40px]" />
                            </div>
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex items-center">
                                    <div className="flex flex-col items-start w-full">
                                        <span>Produto</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{p.produtos.nome_produto}</span>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="flex flex-col items-start w-full">
                                        <span>Quantidade</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{p.amount}</span>
                                    </div>
                                    <div className="flex flex-col items-start w-full">
                                        <span>Nº do pedido</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.id_order}</span>
                                    </div>
                                    <div className="flex flex-col items-start w-full">
                                        <span>Preço</span>
                                        <span className="border border-zinc-500 rounded-md w-full p-2">{Moeda.formatar(p.produtos.preco)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}