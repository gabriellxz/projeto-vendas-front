import { useEffect, useState } from "react";
import { CartType } from "../../types/cart"
import Moeda from "../../utils/moeda";
import ButtonDark from "../Button-dark/button-dark";
import useEndereco from "../../hook/useEndereco";
import Endereco from "../../types/endereco";
import { useNavigate } from "react-router-dom";

interface PropsSumario {
    iCart: CartType[];
}

export default function SumarioCompras(props: PropsSumario) {

    const navigate = useNavigate()
    const { endereco } = useEndereco()
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
                <form>
                    {
                        endereco.length < 1 ? <span className="text-red-600">Você não tem endereço.</span>
                            :
                            <select className="border border-1 border-black outline-none p-2 w-full mb-5" required>
                                {
                                    endereco.map((item: Endereco) => (
                                        <option key={item.endereco_id}>{`${item.bairro}, ${item.cidade}, ${item.estado}`}</option>
                                    ))
                                }
                            </select>
                    }
                    {
                        endereco.length < 1 ? <ButtonDark text="Adicionar endereço" propsBtn={() => {navigate("/home/criar-endereço")}}/> : <ButtonDark text="Prosseguir com a compra"/>
                    }
                </form>
            </div>
        </>
    )
}