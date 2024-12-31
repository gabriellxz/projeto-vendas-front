import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlidesHome from "../../../components/Slides-home/slides-home"
import Catalog from "../../../components/Catalog/catalog"
// import SlidesMiniCard from '../../../components/Slides-mini-card/slides-mini-card';
import { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import "./style.css"
// import InstaIcon from '../../../svg/insta-icon';
// import WhatsIcon from '../../../svg/whats-icon';
// import GmailIcon from '../../../svg/gmail-icon';
// import SlidesMiniCard from "../../../components/Slides-mini-card/slides-mini-card"; 

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
                    <div className="banner_catalog w-full bg-cover bg-no-repeat h-[45vh]"></div>
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
            <footer className='flex justify-center bg-greenEco-300 text-white p-5'>
                <div>
                    <div className='flex gap-3 mb-4'>
                        {/* <a href="https://www.instagram.com/yeshua_professional/" target='_blank'>
                            <InstaIcon />
                        </a>
                        <a href="https://wa.me/5585992537575" target='_blank'>
                            <WhatsIcon />
                        </a>
                        <a href="mailto:mailto:yeshuaprofessional9@gmail.com" target='_blank'>
                            <GmailIcon />
                        </a> */}
                    </div>
                    <p className='text-justify'>
                        © Copyright 2024 Yeshuá Professional - Todos os direitos reservados.
                        CPNPJ/000000000000 - Sede: Rua 7, 1213, Passare, Fortaleza CE, 60743-680, Brasil.
                    </p>
                </div>
            </footer>
        </div>
    )
}