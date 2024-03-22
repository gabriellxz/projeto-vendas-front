import CardCart from "../../../components/Card-cart/card-cart";
import Loading from "../../../components/Loading/loading";
import SumarioCompras from "../../../components/Sumario-compras/sumario-compras";
import useCart from "../../../hook/useCart";
import TrashIcon from "../../../svg/trash-icon";
import { CartType } from "../../../types/cart";

export default function Cart() {

    const { loadingCart, cart, clearCart } = useCart()

    return (
        <>
            {
                loadingCart ? <Loading styleLoading="absolute top-[50%] left-[50%] bottom-[50%] right-[50%]" /> : (
                    cart.length > 0 ? (
                        <div className="mb-5">
                            <div>
                                <h1 className="uppercase p-[10px] mt-20 font-bold text-2xl flex items-center gap-2">
                                    carrinho
                                    <span className="cursor-pointer" onClick={clearCart}>{loadingCart ? <Loading /> : <TrashIcon />}</span>
                                </h1>
                            </div>
                            <div className="flex flex-col md:flex md:flex-row w-full">
                                <div className="w-full p-[10px]">
                                    {
                                        cart.map((cartItem: CartType) => (
                                            <CardCart key={cartItem.id} iCart={cartItem} />
                                        ))
                                    }
                                </div>
                                <div className="p-5 md:max-w-[257px] lg:mr-[100px] w-full mt-5">
                                    <SumarioCompras iCart={cart}/>
                                </div>
                            </div>
                        </div>
                    ) : (<h1 className="text-4xl p-[10px] sm:ml-[50px] font-bold text-zinc-500 mt-10">Seu carrinho está vazio...</h1>)
                )
            }
        </>

    )
}