import { useEffect, useState } from "react"
import ProdutosDTO from "../../types/produto"
import api from "../../config/config"

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
            <div>
                <div className="">

                </div>
            </div>
            <div>
                {
                    product.map((p: ProdutosDTO) => (
                        <p key={p.id_produto}>{p.nome_produto}</p>
                    ))
                }
            </div>
        </div>
    )
}