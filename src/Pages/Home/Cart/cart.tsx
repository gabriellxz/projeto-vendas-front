import CardCart from "../../../components/Card-cart/card-cart";
import SumarioCompras from "../../../components/Sumario-compras/sumario-compras";
import useGetCart from "../../../hook/useGetCart";
import { CartType } from "../../../types/cart";

export default function Cart() {

    const { cart } = useGetCart()

    return (
        <div className="ml-[50px]">
            <div>
                <h1 className="uppercase mt-20 font-bold text-2xl ">carrinho</h1>
            </div>
            <div className="flex flex-col lg:flex lg:flex-row w-full">
                <div className="w-full">
                    {
                        cart.map((cartItem: CartType) => (
                            <CardCart iCart={cartItem} />
                        ))
                    }
                </div>
                <div className="max-w-[257px] lg:mr-[100px] w-full mt-5">
                    <SumarioCompras />
                </div>
            </div>
        </div>
    )
}