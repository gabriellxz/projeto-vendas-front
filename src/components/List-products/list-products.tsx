import { useEffect, useState } from "react"
import ProdutosDTO from "../../types/produto"
import api from "../../config/config"
import imageHome1 from '../../../public/imagem-home-1.jpeg'
import imageHome2 from '../../../public/imagem-home-2.jpeg'
import imageHome3 from '../../../public/imagem-home-3.jpeg'

export default function ListProduct() {

    const token = localStorage.getItem("tokenUser")
    const [product, setProduct] = useState<ProdutosDTO[]>([])

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
                } catch (error) {
                    console.log(error)
                }
            }
        }

        getProducts()
    }, [])

    return (
        <div>
            <div className={`
                hidden
                xl:flex xl:justify-center
            `}>
                <img src={imageHome1} alt="image-home" className="max-w-[489px] w-full" />
                <img src={imageHome2} alt="image-home" className="max-w-[489px] w-full" />
                <img src={imageHome3} alt="image-home" className="max-w-[489px] w-full" />
            </div>
            <div>
                <div className="m-10">
                    <div className="text-center text-greenEco-200">
                        <h1 className="uppercase font-kaisei text-5xl">elevando sua rotina de cuidados diários</h1>
                        <p className="font-inter text-xl">
                            Descubra o Segredo para uma Beleza Autentica
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}