import Slider from "react-slick";
import NextArrow from "../NextArrow/next-arrow";
import PrevArrow from "../PrevArrow/prev-arrow";
import useListProduct from "../../hook/useListProduct";
import ProdutosDTO from "../../types/produto";
import MiniCard from "../Mini-card/mini-card";

export default function SlidesMiniCard() {

    const { product } = useListProduct()

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
        <>
            {/* TELAS PEQUENAS */}
            <div className={`
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
        </>
    )
}