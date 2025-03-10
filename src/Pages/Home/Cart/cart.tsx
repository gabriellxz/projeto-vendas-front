import CardCart from "../../../components/Card-cart/card-cart";
import Catalog from "../../../components/Catalog/catalog";
import Loading from "../../../components/Loading/loading";
import SumarioCompras from "../../../components/Sumario-compras/sumario-compras";
import useCart from "../../../hook/useCart";
import TrashIcon from "../../../svg/trash-icon";
import { CartOrderUser } from "../../../types/cart";
import { motion } from "framer-motion"
import Footer from "../../../components/Footer/footer";

export default function Cart() {

    const { cart, loadingCart, clearCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-screen"
        >
            {loadingCart ? (
                <Loading styleLoading="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
            ) : cart.length > 0 ? (
                <>
                    <div className="mb-5">
                        <div>
                            <h1 className="uppercase p-[10px] mt-20 font-bold text-2xl flex items-center gap-2">
                                carrinho
                                <span className="cursor-pointer" onClick={clearCart}>
                                    <TrashIcon />
                                </span>
                            </h1>
                        </div>
                        <div className="flex flex-col md:flex md:flex-row w-full">
                            <div className="w-full p-[10px]">
                                {cart.map((cartItem: CartOrderUser) => (
                                    <CardCart key={cartItem.id} iCart={cartItem} />
                                ))}
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
            ) : (
                <div className="h-full flex justify-center items-center">
                    <span className="p-[50px] text-3xl font-bold text-zinc-600 flex items-center gap-4">
                        seu carrinho está vazio
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[30px] h-[30px]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </span>
                </div>
            )}
            <Footer/>
        </motion.div>

    )
}