import { useRef, useLayoutEffect } from "react";
import useListProduct from "../../hook/useListProduct"
import ProdutosDTO from "../../types/produto"
import CardProduct from "../Card-Product/card-product"
import Loading from "../Loading/loading"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface Props {
    reload: () => void;
    searchItem?: string;
}

export default function Catalog(props: Props) {

    const { product, loading } = useListProduct()
    const el: any = useRef()
    const tl: any = useRef()

    useLayoutEffect(() => {

        gsap.registerPlugin(ScrollTrigger)
        gsap.context(() => {
            tl.current = gsap.timeline({
                scrollTrigger: {
                    trigger: ".card-item",
                    scrub: true,
                    // markers: true,
                    end: "bottom 400px"
                }
            })
                .fromTo(".card-item", {
                    opacity: 0,
                    y: 160
                }, {
                    opacity: 1,
                    y: 0
                })
        }, el)

        return () => {
            gsap.killTweensOf(".card-item")
        }

    }, [])

    const filterProduct = product.filter((product: ProdutosDTO) =>
        product.nome_produto.toLocaleLowerCase().includes(props.searchItem ? props.searchItem.toLowerCase() : "")
    )

    return (
        <div ref={el}>
            <div className="sm:grid sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 grid grid-cols-2 gap-5 mt-5 pt-10 p-10 card-item">

                {loading ? (
                    <Loading />
                ) : (
                    product.length > 0 ? (
                        filterProduct.map((product) => (
                            <CardProduct key={product.id_produto} iProduto={product} reload={props.reload} />
                        ))
                    ) : (
                        <p>Não existem produtos...</p>
                    )
                )}

            </div>
        </div>
    )
}