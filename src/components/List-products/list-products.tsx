import { useEffect, useState } from "react"
import ProdutosDTO from "../../types/produto"
import api from "../../config/config"
import imageHome1 from '../../../public/imagem-home-1.jpeg'
import imageHome2 from '../../../public/imagem-home-2.jpeg'
import imageHome3 from '../../../public/imagem-home-3.jpeg'
import { Link } from "react-router-dom"
import CardProduct from "../Card-Product/card-product"

export default function ListProduct() {

    const token = localStorage.getItem("tokenUser")
    const [product, setProduct] = useState<ProdutosDTO[]>([])
    const [imageSlide, setImageSlide] = useState(0)
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
        async function getProducts() {
            if (token) {
                const response = await api.get("/Product", {
                    headers: {
                        "Authorization": `Bearer ${JSON.parse(token)}`
                    }
                })
                try {
                    setProduct(response.data.Company)
                    console.log(response.data.Company)
                    console.log(product)
                } catch (error) {
                    console.log(error)
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
                xl:flex xl:justify-center
            `}>
                <img src={imageHome1} alt="image-home" className="max-w-[489px] w-full" />
                <img src={imageHome2} alt="image-home" className="max-w-[489px] w-full" />
                <img src={imageHome3} alt="image-home" className="max-w-[489px] w-full" />
            </div>

            {/* IMAGENS VISÍVEIS PARA TELAS PEQUENAS */}
            <div className={`
                xl:hidden mt-7
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
                <div className="w-full p-10 flex justify-center">
                    <div className="sm:grid sm:grid-cols-2 sm:gap-7 grid grid-cols-1 gap-5">
                        {/* {
                            product.map((product: ProdutosDTO) => (
                                <CardProduct key={product.id_produto} iProduto={product}/>
                            ))
                        } */}
                        <CardProduct/>
                        <CardProduct/>
                        <CardProduct/>
                        <CardProduct/>
                    </div>
                </div>
            </div>
        </div>
    )
}