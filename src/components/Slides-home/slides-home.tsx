import Slider from 'react-slick';
import imageHome1 from '../../../public/imagem-home-1.jpeg'
import imageHome2 from '../../../public/imagem-home-2.jpeg'
import imageHome3 from '../../../public/imagem-home-3.jpeg'
import NextArrow from '../NextArrow/next-arrow';

export default function SlidesHome() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <div className={`
                hidden mt-7
                lg:flex lg:justify-center
            `}>
                <img src={imageHome1} alt="image-home" className={`
                    max-w-[489px] w-full
                    lg:max-w-[350px] lg:w-full
                    xl:max-w-[489px] xl:w-full
                `} />
                <img src={imageHome2} alt="image-home" className={`
                    max-w-[489px] w-full
                    lg:max-w-[350px] lg:w-full
                    xl:max-w-[489px] xl:w-full
                `} />
                <img src={imageHome3} alt="image-home" className={`
                    max-w-[489px] w-full
                    lg:max-w-[350px] lg:w-full
                    xl:max-w-[489px] xl:w-full
                `} />
            </div>

            <div className={`
                lg:hidden mt-7
            `}>
                <Slider {...settings}>
                    <img src={imageHome1} alt="" className="max-w-[489px] w-full" />
                    <img src={imageHome2} alt="" className="max-w-[489px] w-full" />
                    <img src={imageHome3} alt="" className="max-w-[489px] w-full" />
                </Slider>
            </div>
        </>
    )
}