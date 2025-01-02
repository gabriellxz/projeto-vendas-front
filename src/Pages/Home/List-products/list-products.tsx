import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlidesHome from "../../../components/Slides-home/slides-home"
import Catalog from "../../../components/Catalog/catalog"
import { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import whatsappContact from "../../../assets/wtsicon.webp"
import instaICon from "../../../assets/instaIcon.png"
import iconWts from "../../../assets/iconWts.png"
import emailIcon from "../../../assets/emailIcon.png"
import bannerCatalog from "../../../assets/banner_catalog.png"
import bannerMobile from "../../../assets/banner_mobile.png"

export default function ListProduct() {

    const [search, setSearch] = useState<string>("")

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        setSearch(e.target.value)
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
                    <div className="hidden sm:flex w-full h-[45vh]">
                        <img src={bannerCatalog} alt="" className='w-full'/>
                    </div>
                    <div className="flex sm:hidden w-full h-[45vh]">
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
            <footer className='bg-greenEco-300 text-white'>
                <div className='grid grid-cols-2 gap-5 sm:flex sm:flex-row sm:justify-around p-5'>
                    <div className='flex flex-col gap-3'>
                        <p className='uppercase font-bold'>institucional</p>
                        <div>
                            <ul>
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">Sobre nós</a>
                                </li>
                                <li>
                                    <a href="#">Todos os produtos</a>
                                </li>
                                <li>
                                    <a href="#">Contato</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 text-justify'>
                        <p className='uppercase font-bold'>ajuda</p>
                        <div>
                            <a href='#'>Política de privacidade</a>
                        </div>
                        <div>
                            <a href='mailto:yeshuaprofessional9@gmail.com' className='flex gap-4 overflow-hidden' target='_blank'>
                                <img src={emailIcon} className='w-[20px]' alt="" /> yeshuaprofessional9@gmail.com
                            </a>
                            <a href="https://wa.me/5585992537575" className='flex gap-4' target='_blank'>
                                <img src={iconWts} className='w-[20px]' alt="" /> (85) 99253-7575
                            </a>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <p className='uppercase font-bold'>nossas redes sociais</p>
                        <div className='flex justify-center'>
                            <a href="https://www.instagram.com/yeshua_professional/">
                                <img src={instaICon} className='w-[20px]' alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className='bg-greenEco-200'>
                    <p className='text-center'>
                        © Copyright 2024 Yeshuá Professional - Todos os direitos reservados.
                        CPNPJ/54.266.654/0001-90 - Sede: Rua 7, 1213, Passare, Fortaleza CE, 60743-680, Brasil.
                    </p>
                </div>
            </footer>
            <button className='w-[60px] h-[60px] fixed bottom-1 right-1'>
                <a href="https://wa.me/5585992537575" target='_blank'>
                    <img src={whatsappContact} />
                </a>
            </button>
        </div>
    )
}