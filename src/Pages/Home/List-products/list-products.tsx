import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlidesHome from "../../../components/Slides-home/slides-home"
import Catalog from "../../../components/Catalog/catalog"
import { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import whatsappContact from "../../../assets/wtsicon.webp"
import bannerCatalog from "../../../assets/banner_catalog.webp"
import bannerMobile from "../../../assets/banner_mobile.webp"
import { useNavigate } from 'react-router-dom';
import Footer from '../../../components/Footer/footer';


export default function ListProduct() {

    const navigate = useNavigate()
    const [search, setSearch] = useState<string>("")

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
    }

    function redirectProduct() {
        navigate("/detalhes-produtos/6")
    }

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
                    </div>
                </div>
                <div className={`
                    flex flex-col
                `}>
                    <div className="hidden sm:flex w-full h-[45vh] cursor-pointer" onClick={redirectProduct}>
                        <img src={bannerCatalog} alt="" className='w-full'/>
                    </div>
                    <div className="flex sm:hidden w-full h-[45vh] cursor-pointer" onClick={redirectProduct}>
                        <img src={bannerMobile} alt="" className='w-full'/>
                    </div>
                    <div className="flex justify-center flex-col">
                        <div className='w-full text-center mt-[40px]'>
                            <span className='uppercase text-2xl'>nossos produtos</span>
                        </div>
                        <div className="flex justify-center w-full pt-5">
                            <AnimatePresence>
                                <motion.div className="flex justify-center w-full px-5"
                                    initial={{
                                        opacity: 0,
                                        translateX: 50
                                    }}

                                    animate={{
                                        opacity: 1,
                                        translateX: 0
                                    }}

                                    exit={{
                                        opacity: 0,
                                        translateX: 50
                                    }}
                                >
                                    <input type="text" className="border border-black outline-none max-w-[600px] w-full p-1" placeholder="Buscar por..." onChange={handleSearch} />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className='flex justify-center'>
                            <Catalog searchItem={search} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            <button className='w-[60px] h-[60px] fixed bottom-1 right-1'>
                <a href="https://wa.me/5585992537575" target='_blank'>
                    <img src={whatsappContact} />
                </a>
            </button>
        </div>
    )
}