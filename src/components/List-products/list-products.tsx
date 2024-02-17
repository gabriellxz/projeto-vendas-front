import { useEffect, useState } from "react"
import ProdutosDTO from "../../types/produto"
import api from "../../config/config"
import imageHome1 from '../../../public/imagem-home-1.jpeg'
import imageHome2 from '../../../public/imagem-home-2.jpeg'
import imageHome3 from '../../../public/imagem-home-3.jpeg'
import { Link } from "react-router-dom"
import CardProduct from "../Card-Product/card-product"
import MiniCard from "../Mini-card/mini-card"
import Loading from "../Loading/loading"
// import Slider from 'react-slick'
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';


export default function ListProduct() {

    const token = localStorage.getItem("tokenUser")
    const [product, setProduct] = useState<ProdutosDTO[]>([])
    const [imageSlide, setImageSlide] = useState(0)
    const [loading, setLoading] = useState(false)
    const images = [
        imageHome1,
        imageHome2,
        imageHome3
    ]

    useEffect(() => {
        const intervalId = setInterval(() => {
            setImageSlide((prevIndex) => (prevIndex + 1) % images.length)
        }, 5000)

        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        setLoading(true)

        async function getProducts() {
            if (token) {
                const response = await api.get("/Product", {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(token)}`
                    }
                })
                try {
                    setProduct(response.data.Company)
                    setLoading(false)
                } catch (error) {
                    console.log(error)
                    setLoading(false)
                }
            }
        }

        getProducts()
    }, [])

    return (
        <div>
            {/* IMAGENS VISÍVEIS PARA TELAS GRANDES */}
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

            {/* IMAGENS VISÍVEIS PARA TELAS PEQUENAS */}
            <div className={`
                lg:hidden mt-7
                flex justify-center
            `}>
                <img src={images[imageSlide]} alt="image-home" className="max-w-[489px] w-full" />
            </div>
            <div>
                <div className="m-10">
                    <div className="text-center text-greenEco-200">
                        <h1 className="uppercase font-kaisei text-5xl">elevando sua rotina de cuidados diários</h1>
                        <p className="font-inter text-xl">
                            Descubra o Segredo para uma Beleza Autentica
                        </p>
                        <Link to={""}>
                            Nossos Produtos
                        </Link>
                    </div>
                </div>
                <div className={`
                    flex flex-col
                `}>
                    <div className={`
                        flex flex-col items-center
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
                        <div className={`
                            grid grid-cols-1 gap-5
                            sm:grid sm:grid-cols-2
                            md:grid md:grid-cols-3
                            lg:flex
                        `}>
                            <MiniCard />
                            <MiniCard />
                            <MiniCard />
                            <MiniCard />
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