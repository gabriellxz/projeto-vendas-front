import { useEffect, useState } from "react";
import { CartType } from "../../types/cart"
import Moeda from "../../utils/moeda";
import ButtonDark from "../Button-dark/button-dark";
import useEndereco from "../../hook/useEndereco";
import Endereco from "../../types/endereco";
import { useNavigate } from "react-router-dom";
import usePayment from "../../hook/usePayment";
import Loading from "../Loading/loading";

interface PropsSumario {
    iCart: CartType[];
}

export default function SumarioCompras(props: PropsSumario) {

    const navigate = useNavigate()
    const { endereco } = useEndereco()
    const { make, loading } = usePayment()
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
            <div className="md:mb-[67px]">
                <span className="uppercase text-xl">sumário de compras</span>
            </div>
            <div className="w-full flex flex-col gap-[25px]">
                <div className="w-full flex justify-between">
                    <span>total</span>
                    <span className="font-bold">{Moeda.formatar(subTotal)}</span>
                </div>
                <div className="bg-zinc-400 p-[0.5px] w-full"></div>
                <form>
                    <div className="text-center mb-1">
                        {
                            endereco.length < 1 ? (
                                <>
                                    <span className="text-red-600">Você não tem endereço</span>
                                    <ButtonDark text="Novo endereço" propsBtn={() => { navigate("/home/criar-endereço") }} />
                                </>
                            )
                                :
                                <div>
                                    <select className="border border-1 border-black outline-none p-2 w-full mb-5" required>
                                        {
                                            endereco.map((item: Endereco, index: number) => (
                                                <option key={index}>{`${item.bairro}, ${item.cidade}, ${item.estado}`}</option>
                                            ))
                                        }
                                    </select>
                                    <ButtonDark text="Novo endereço" propsBtn={() => { navigate("/home/criar-endereço") }} />
                                </div>
                        }
                    </div>
                    <div className={`${endereco.length < 1 ? "hidden" : "block"}`}>
                        {
                            loading ? <Loading /> : <ButtonDark text="Prosseguir com a compra" propsBtn={make} />
                        }
                    </div>
                </form>
            </div>
        </>
    )
}