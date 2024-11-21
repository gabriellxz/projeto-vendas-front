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
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface PropsSumario {
    iCart: CartOrderUser[];
}

export default function SumarioCompras(props: PropsSumario) {

    const navigate = useNavigate()
    const { calculateDelivered, LoadingFrete, setCep, frete } = useCalculateDelivered();
    const { endereco, getLoadingEnd } = useEndereco()
    const { make, loading } = usePayment()
    const [subTotal, setSubTotal] = useState(0)

    const dispatch = useDispatch()
    const enderecoState = useSelector((state: TypeReducer) => state.endereco.adressId)
    const cepState = useSelector((state:TypeReducer) => state.endereco.cepDestino)

    function changeEndereco(e: SelectChangeEvent<string>) {
        const adressId = e.target.value
        console.log(adressId)
        dispatch(changeValue({field: "adressId", value: adressId}))
    }

    function changeCep(e: ChangeEvent<HTMLInputElement>) {
        const valueCep = e.target.value
        setCep(valueCep)
        dispatch(changeValue({field: "cepDestino", value: valueCep}))
    }

    useEffect(() => {
        let total = 0

        props.iCart.forEach((item: CartOrderUser) => {
            total += item.amount * item.produtos.preco
        })

        if (frete) {
            total += parseFloat(frete)
        }

        setSubTotal(total)
    }, [props.iCart, frete])


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
                        onInputValue={changeCep}
                        styleWidth="w-full mb-3"
                        typeInput="text"
                        value={cepState}
                        placeholder="CEP"
                    />
                    {LoadingFrete ? <Loading /> : <ButtonDark text="Calcular frete" propsBtn={calculateDelivered} />}
                    {/* <span>{frete}</span> */}
                </div>
                <div className={`
                    border border-1 border-black outline-none p-2 w-[100%]
                `}>
                    <div>{frete ? <span>R${frete}</span> : <span>R$0,00</span>}</div>
                </div>
                <div className="bg-zinc-400 p-[0.5px] w-full"></div>
                <form>
                    <div className="mb-1">
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
                                            <FormControl fullWidth>
                                                <InputLabel id="id-endereço">Endereço</InputLabel>
                                                <Select
                                                    name="endereco"
                                                    label="Endereço"
                                                    labelId="id-endereço"
                                                    value={enderecoState}
                                                    onChange={changeEndereco}
                                                    required
                                                >
                                                    <MenuItem disabled selected value="">Selecione um endereço</MenuItem>
                                                    {
                                                        endereco.map((item: Endereco, index: number) => (
                                                            <MenuItem value={item.id} key={index}>{`${item.bairro}, ${item.cidade}, ${item.estado}`}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        )
                                    }
                                    <ButtonDark text="Novo endereço" propsBtn={() => { navigate("/home/criar-endereço") }} />
                                </div>
                        }
                    </div>
                    {frete && <div className={`${endereco.length < 1 ? "hidden" : "block"}`}>
                        {
                            loading ? <Loading /> : <ButtonDark text="Prosseguir com a compra" propsBtn={make} />
                        }
                    </div>}
                </form>
            </div>
        </>
    )
}