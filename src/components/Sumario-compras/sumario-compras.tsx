import { ChangeEvent, useEffect, useState } from "react";
import { CartOrderUser } from "../../types/cart"
import Moeda from "../../utils/moeda";
import ButtonDark from "../Button-dark/button-dark";
import useEndereco from "../../hook/useEndereco";
import Endereco from "../../types/endereco";
import { useNavigate } from "react-router-dom";
import usePayment from "../../hook/usePayment";
import Loading from "../Loading/loading";
import { useDispatch, useSelector } from "react-redux";
import { changeValue } from "../../features/enderecoSlice";
import { TypeReducer } from "../../features/store";
import Input from "../Input/input";
import useCalculateDelivered from "../../hook/useCalculateDelivered";

interface PropsSumario {
    iCart: CartOrderUser[];
}

export default function SumarioCompras(props: PropsSumario) {

    const navigate = useNavigate()
    const { calculateDelivered, LoadingFrete, setCep, cep } = useCalculateDelivered();
    const { endereco, getLoadingEnd } = useEndereco()
    const { make, loading } = usePayment()
    const [subTotal, setSubTotal] = useState(0)

    const dispatch = useDispatch()
    const enderecoState = useSelector((state: TypeReducer) => state.endereco.adressId)

    function changeEndereco(e: ChangeEvent<HTMLSelectElement>) {
        const adressId = e.target.value
        console.log(adressId)
        dispatch(changeValue(adressId))
    }

    useEffect(() => {
        let total = 0

        props.iCart.forEach((item: CartOrderUser) => {
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
                <div>
                    <Input
                        inputLabel="Calcular frete"
                        name="cep"
                        onInputValue={(e: ChangeEvent<HTMLInputElement>) => setCep(e.target.value)}
                        styleWidth="w-full mb-3"
                        typeInput="text"
                        value={cep}
                        placeholder="CEP"
                    />
                    {LoadingFrete ? <Loading /> : <ButtonDark text="Calcular frete" propsBtn={calculateDelivered} />}
                    {/* <span>{frete}</span> */}
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
                                    {
                                        getLoadingEnd ? <Loading /> : (
                                            <select value={enderecoState} onChange={changeEndereco} className="border border-1 border-black outline-none p-2 w-full mb-5" required>
                                                <option>Selecione um endereço</option>
                                                {
                                                    endereco.map((item: Endereco, index: number) => (
                                                        <option value={item.id} key={index}>{`${item.bairro}, ${item.cidade}, ${item.estado}`}</option>
                                                    ))
                                                }
                                            </select>
                                        )
                                    }
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