import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlidesHome from "../../../components/Slides-home/slides-home"
import Catalog from "../../../components/Catalog/catalog"
import SlidesMiniCard from '../../../components/Slides-mini-card/slides-mini-card';
// import SlidesMiniCard from "../../../components/Slides-mini-card/slides-mini-card"; 
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLayoutEffect, useRef } from 'react';

export default function ListProduct() {

    const el: any = useRef()
    const tl: any = useRef()

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                tl.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".box-text-title",
                        scrub: true,
                        end: "bottom 800px",
                        start: "top 100px"
                    }
                })
                    .fromTo("#text-1", {
                        opacity: 0,
                        y: 160
                    }, {
                        opacity: 1,
                        y: 0
                    })
                    .fromTo("#text-2", {
                        opacity: 0,
                        y: 160
                    }, {
                        opacity: 1,
                        y: 0
                    })
            });

            mm.add("(max-width: 767px)", () => {
                tl.current = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".box-text-title",
                        scrub: true,
                        // markers: true,
                        end: "bottom 100px",
                        start: "top 90px"
                    }
                })
                    .fromTo("#text-1", {
                        opacity: 0,
                        y: 100
                    }, {
                        opacity: 1,
                        y: 0
                    })
                    .fromTo("#text-2", {
                        opacity: 0,
                        y: 100
                    }, {
                        opacity: 1,
                        y: 0
                    })
            });

            return () => {
                mm.revert();
            };
        }, el)

        return () => {
            gsap.killTweensOf(".box-text-title")
        }

    }, [])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            gsap.to(".slides", {
                x: 0,
                scrollTrigger: {
                    scrub: true,
                }
            })
        });

        mm.add("(max-width: 767px)", () => {
            gsap.to(".slides", {
                x: 0,
                scrollTrigger: {
                    scrub: true,
                    end: "bottom 2000px",
                }
            })
        });

        return () => {
            mm.revert();
            gsap.killTweensOf(".slides")
        }

    }, [])

    return (
        <div>
            <SlidesHome />
            <div>
                <div className="mt-[56px] sm:m-10 box-text-title">
                    <div className="text-center text-greenEco-200" ref={el}>
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
                        w-full bg-whiteEco-200 p-10 gap-[100px] mt-7
                        translate-x-[-100%]
                        slides
                    `}>
                        <div className="flex justify-center items-center flex-col max-w-[260px] gap-7">
                            <div className="flex justify-center flex-col gap-2">
                                <h1 className="text-5xl">Oferta!</h1>
                                <p className="text-gray-400 text-justify">
                                    Confira nosso incriveis kits para cabelos - a combinação perfeita de cuidados para realçar sua beleza.
                                </p>
                            </div>
                            <div className="flex justify-start w-full">
                                <button className="bg-greenEco-100 text-white max-w-[185px] w-full p-3">Ver mais</button>
                            </div>
                        </div>
                        <SlidesMiniCard />
                    </div>
                    <div className="flex justify-center flex-col">
                        <div className='w-full text-center mt-[40px]'>
                            <span className='uppercase text-2xl'>nossos produtos</span>
                        </div>
                        <div className='flex justify-center'>
                            <Catalog reload={() => { }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}