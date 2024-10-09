import { ToastContainer } from "react-toastify";
import CardCart from "../../../components/Card-cart/card-cart";
import Catalog from "../../../components/Catalog/catalog";
import Loading from "../../../components/Loading/loading";
import SumarioCompras from "../../../components/Sumario-compras/sumario-compras";
import useCart from "../../../hook/useCart";
import TrashIcon from "../../../svg/trash-icon";
import { CartOrderUser } from "../../../types/cart";
import { motion } from "framer-motion"

export default function Cart() {

    const { cart, loadingCart, clearCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {
                cart.length > 0 ? (
                    loadingCart ? <Loading styleLoading="absolute top-[50%] left-[50%] bottom-[50%] right-[50%]" /> : (
                        <>
                            <div className="mb-5">
                                <div>
                                    <h1 className="uppercase p-[10px] mt-20 font-bold text-2xl flex items-center gap-2">
                                        carrinho
                                        <span className="cursor-pointer" onClick={clearCart}><TrashIcon /></span>
                                    </h1>
                                </div>
                                <div className="flex flex-col md:flex md:flex-row w-full">
                                    <div className="w-full p-[10px]">
                                        {
                                            cart.map((cartItem: CartOrderUser) => (
                                                <CardCart key={cartItem.id} iCart={cartItem} />
                                            ))
                                        }
                                    </div>
                                    <div className="p-5 md:max-w-[257px] lg:mr-[100px] w-full mt-5">
                                        <SumarioCompras iCart={cart} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-[200px]">
                                <div className="pl-10">
                                    <span className="uppercase text-2xl">Recomendado para você</span>
                                </div>
                                <div className="flex justify-center">
                                    <Catalog />
                                </div>
                            </div>
                        </>
                    )
                ) : (
                    <span className="p-[50px] text-2xl font-bold text-zinc-600">Seu carrinho está vazio.</span>
                )
            }
            <ToastContainer/>
        </motion.div>

    )
}