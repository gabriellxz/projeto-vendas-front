import SlidesHome from "../../../components/Slides-home/slides-home"
import Catalog from "../../../components/Catalog/catalog"
import whatsappContact from "../../../assets/wtsicon.webp"
import bannerCatalog from "../../../assets/banner_catalog.webp"
import bannerMobile from "../../../assets/banner_mobile.webp"
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer/footer';
import { ChangeEvent } from "react"
import { Box, Divider, Drawer } from "@mui/material"
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useCart } from "../../../context/cartContext"
import { CartOrderUser } from "../../../types/cart"
import CardCart from "../../../components/Card-cart/card-cart"
import "./style.css"
import useEndereco from "../../../hook/useEndereco"
import { useDispatch, useSelector } from "react-redux"
import { changeValue } from "../../../features/enderecoSlice"
import { TypeReducer } from "../../../features/store"
import useCalculateDelivered from "../../../hook/useCalculateDelivered"
import Loading from "../../../components/Loading/loading"
import usePayment from "../../../hook/usePayment"
import Moeda from "../../../utils/moeda"

export default function ListProduct() {

    const { make, loading } = usePayment()
    const { cart, clearCart, setBagIsOpen, bagIsOpen } = useCart()
    const { endereco } = useEndereco()
    const { calculateDelivered, LoadingFrete, setCep, frete } = useCalculateDelivered();
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const enderecoState = useSelector((state: TypeReducer) => state.endereco.adressId)
    const cepState = useSelector((state: TypeReducer) => state.endereco.cepDestino)

    function changeEndereco(e: any) {
        const adressId = e.target.value
        // console.log(adressId)
        dispatch(changeValue({ field: "adressId", value: adressId }))
    }

    function changeCep(e: ChangeEvent<HTMLInputElement>) {
        const valueCep = e.target.value
        setCep(valueCep)
        dispatch(changeValue({ field: "cepDestino", value: valueCep }))
    }

    // console.log(cart)

    function redirectProduct() {
        navigate("/detalhes-produtos/6")
    }

    function calSubtTotal() {
        return cart.reduce((total, item) =>  {
            return total + (item.produtos.preco * item.amount)
        }, 0)
    }

    const DrawerListCart = (
        <Box
            sx={{
                width: 400,
            }}
        >
            <div className="px-5 py-8 flex justify-between items-center">
                <div className="flex items-center gap-5">
                    <span className="font-bold text-3xl">Carrinho</span>
                    <TrashIcon className="w-5" onClick={clearCart} />
                </div>
                <XMarkIcon className="w-8 text-zinc-500 cursor-pointer" onClick={() => setBagIsOpen(!bagIsOpen)} />
            </div>
            <Divider className="bg-zinc-700" />
            {
                cart.length < 1 ? (
                    <p className="text-2xl font-bold text-center m-5">Sua sacola está vazia =/</p>
                ) : (
                    <>
                        <div className="flex flex-col items-start text-center my-5 px-5 gap-4 overflow-y-scroll h-[550px]">
                            {
                                cart.map((c: CartOrderUser) => (
                                    <div className="w-full" >
                                        <CardCart iCart={c} key={c.id} />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="p-5">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    placeholder="Calcule o frete"
                                    className="outline-none border border-1 border-zinc-300 p-1"
                                    name="cep"
                                    onChange={changeCep}
                                    value={cepState}
                                />
                                {LoadingFrete ? <Loading /> : <button className="bg-greenEco-200 p-1 text-white uppercase font-jura" onClick={calculateDelivered}>Calcular</button>}
                            </div>
                            <div className="font-bold text-zinc-500 font-jura text-[14px]">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>{Moeda.formatar(calSubtTotal())}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Frete</p>
                                    <p>{frete ? <span>R${frete}</span> : <span>R$0,00</span>}</p>
                                </div>
                            </div>
                            <div className="w-full mt-3">
                                {
                                    endereco.length < 1 ? (
                                        <button onClick={() => navigate("/criar-endereço")} className="bg-greenEco-200 p-1 text-white uppercase font-jura w-full">Adicionar endereço</button>
                                    ) : (
                                        <div className="flex flex-col w-full">
                                            <select
                                                name="endereco"
                                                value={enderecoState}
                                                onChange={changeEndereco}
                                                required
                                                className="outline-none border border-1 border-zinc-300 p-1"
                                            >
                                                <option value="" disabled selected>Selecione um endereço</option>
                                                {
                                                    endereco.map(e => (
                                                        <option value={e.id} key={e.id}>{e.bairro}, {e.cidade}, {e.estado}</option>
                                                    ))
                                                }
                                            </select>
                                            <button onClick={() => navigate("/criar-endereço")} className="bg-greenEco-200 p-1 text-white uppercase font-jura w-full">Novo endereço</button>
                                        </div>
                                    )
                                }
                            </div>
                            {frete && enderecoState && <div className={`${endereco.length < 1 ? "hidden" : "block"} mt-2`}>
                                {
                                    loading ? <Loading /> : <button onClick={make} className="bg-greenEco-200 p-1 text-white uppercase font-jura w-full">Prosseguir com a compra</button>
                                }
                            </div>}
                        </div>
                    </>
                )
            }
        </Box>
    )

    return (
        <div>
            <SlidesHome />
            <div>
                <div className="mt-[56px] sm:m-10 box-text-title">
                    <div className="text-center text-greenEco-200">
                        <p className="uppercase font-kaisei text-[13px] sm:text-5xl" id="text-1">elevando sua rotina de cuidados diários</p>
                        <p className="font-inter text-[12px] sm:text-xl" id="text-2">
                            Descubra o Segredo para uma Beleza Autentica
                        </p>
                        <button onClick={() => setBagIsOpen(!bagIsOpen)}>abrir carrinho</button>
                    </div>
                </div>
                <div className={`
                    flex flex-col
                `}>
                    <div className="hidden sm:flex w-full h-[45vh] cursor-pointer" onClick={redirectProduct}>
                        <img src={bannerCatalog} alt="" className='w-full' />
                    </div>
                    <div className="flex sm:hidden w-full h-[45vh] cursor-pointer" onClick={redirectProduct}>
                        <img src={bannerMobile} alt="" className='w-full' />
                    </div>
                    <div className="flex justify-center flex-col">
                        <div className='flex justify-center'>
                            <Catalog />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <button className='w-[60px] h-[60px] fixed bottom-1 right-1'>
                <a href="https://wa.me/5585992537575" target='_blank'>
                    <img src={whatsappContact} />
                </a>
            </button>
            <Drawer
                anchor="right"
                open={bagIsOpen}
                onClose={() => setBagIsOpen(!bagIsOpen)}
            >
                {DrawerListCart}
            </Drawer>
        </div>
    )
}