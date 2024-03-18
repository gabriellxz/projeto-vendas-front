import { useEffect, useState } from "react";
import { CartType } from "../../types/cart"
import Moeda from "../../utils/moeda";
import ButtonDark from "../Button-dark/button-dark";

interface PropsSumario {
    iCart: CartType[];
}

export default function SumarioCompras(props: PropsSumario) {

    const [subTotal, setSubTotal] = useState(0)

    useEffect(() => {
        let total = 0

        props.iCart.forEach((item: CartType) => {
            total += item.amount * item.produtos.preco
        })

        setSubTotal(total)
    }, [props.iCart])

    return (
        <>
            <div className="mb-[67px]">
                <span className="uppercase text-xl">sumário de compras</span>
            </div>
            <div className="w-full flex flex-col gap-[25px]">
                <div className="w-full flex justify-between">
                    <span>total</span>
                    <span className="font-bold">{Moeda.formatar(subTotal)}</span>
                </div>
                <div className="bg-zinc-400 p-[0.5px] w-full"></div>
                <div>
                    <ButtonDark text="Prosseguir com a compra"/>
                </div>
            </div>
        </>
    )
}