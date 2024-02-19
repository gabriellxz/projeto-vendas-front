import ProdutosDTO from "../../types/produto"
import CardProduct from "../Card-Product/card-product"
import MiniCard from "../Mini-card/mini-card"
import Loading from "../Loading/loading"
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextArrow from "../NextArrow/next-arrow"
import PrevArrow from "../PrevArrow/prev-arrow"
import useListProduct from "../../hook/useListProduct"
import SlidesHome from "../Slides-home/slides-home"


export default function ListProduct() {

    const { product, loading } = useListProduct()

    const settings2 = {
        className: "center",
        centerMode: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
        ]
    }

    return (
        <div>
            <SlidesHome />
            <div>
                <div className="m-10">
                    <div className="text-center text-greenEco-200">
                        <h1 className="uppercase font-kaisei text-5xl">elevando sua rotina de cuidados diários</h1>
                        <p className="font-inter text-xl">
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
                        {/* TELAS PEQUENAS */}
                        <div className={`
                            grid grid-cols-1 gap-5
                            sm:hidden
                        `}>
                            <Slider {...settings2}>
                                {
                                    product.map((product: ProdutosDTO) => (
                                        <MiniCard key={product.id_produto} iProduto={product} />
                                    ))
                                }
                            </Slider>
                        </div>

                        {/* TELAS GRANDES */}
                        <div className={`
                            hidden gap-5
                            sm:grid sm:grid-cols-2
                            md:grid md:grid-cols-3
                            lg:flex
                        `}>
                            {
                                product.map((product: ProdutosDTO) => (
                                    <MiniCard key={product.id_produto} iProduto={product} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="sm:grid sm:grid-cols-2 sm:gap-7 grid grid-cols-1 gap-5 mt-10 pt-10 p-10">
                            {
                                loading ? <Loading /> : product.map((product: ProdutosDTO) => (
                                    <CardProduct key={product.id_produto} iProduto={product} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}