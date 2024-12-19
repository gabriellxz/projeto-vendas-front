import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlidesHome from "../../../components/Slides-home/slides-home"
import Catalog from "../../../components/Catalog/catalog"
// import SlidesMiniCard from '../../../components/Slides-mini-card/slides-mini-card';
import { useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from "framer-motion"
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
                    <div className={`
                        flex flex-col items-center justify-center
                        lg:flex lg:flex-row
                        w-full bg-[#fae0a7] p-10 gap-[100px] mt-7
                    `}>
                        <div className="flex justify-center items-center flex-col max-w-[260px] gap-7">
                            <div className="flex justify-center flex-col gap-2">
                                <h1 className="text-5xl">Oferta!</h1>
                                <p className="text-black text-[20px] text-justify">
                                    Confira nosso incriveis kits para cabelos - a combinação perfeita de cuidados para realçar sua beleza.
                                </p>
                            </div>
                            <div className="flex justify-start w-full">
                                <button className="bg-greenEco-100 text-white max-w-[185px] w-full p-3">Ver mais</button>
                            </div>
                        </div>
                        {/* <SlidesMiniCard /> */}
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
                            <Catalog searchItem={search}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}