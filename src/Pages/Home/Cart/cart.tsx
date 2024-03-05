import CardCart from "../../../components/Card-cart/card-cart";

export default function Cart() {
    return (
        <div className="ml-[50px]">
            <div>
                <h1 className="uppercase mt-20 font-bold text-2xl ">carrinho</h1>
            </div>
            <div className="flex w-full">
                <div className="w-full">
                    <CardCart />
                    <CardCart />
                    <CardCart />
                </div>
                <div className="max-w-[257px] w-full mr-[158px] ml-[33px] mt-5">
                    <div className="mb-[67px]">
                        <span className="uppercase text-xl">sumário de compras</span>
                    </div>
                    <div className="w-full flex flex-col gap-[25px]">
                        <div className="w-full flex justify-between">
                            <span>Subtotal</span>
                            <span>$3,200</span>
                        </div>
                        <div className="w-full flex justify-between">
                            <span>Frete</span>
                            <span>$20</span>
                        </div>
                        <div>
                            <span>Calcular Frete</span>
                            <div className="flex gap-[18px] mt-[10px]">
                                <input type="text" className="max-w-[200px] h-[45px] w-full border-solid border border-black"/>
                                <button className="bg-greenEco-200 text-white max-w-[100px] w-full rounded-md">Calcular</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}