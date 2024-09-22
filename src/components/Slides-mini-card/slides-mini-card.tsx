import useListProduct from "../../hook/useListProduct";
import ProdutosDTO from "../../types/produto";
import MiniCard from "../Mini-card/mini-card";
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function SlidesMiniCard() {

    const { product } = useListProduct()

    // const produtosOferta = product.filter((product: ProdutosDTO) => {
    //     product.oferta === true
    // })

    const responsiveOptions = [
        {
            breakpoint: '640px',  // sm breakpoint
            numVisible: 1,        // 1 card visível em telas menores que 640px
            numScroll: 1          // 1 card por scroll
        },
        {
            breakpoint: '1024px', // a partir de md (tablet ou desktop)
            numVisible: 3,        // 3 cards visíveis em telas maiores que 640px
            numScroll: 3          // 3 cards por scroll
        }
    ];

    return (
        <div className="w-full">
            {/* TELAS GRANDES */}
            <Carousel
                value={product.filter((product: ProdutosDTO) => product.oferta === true)}
                itemTemplate={(product: ProdutosDTO) => <MiniCard key={product.id_produto} iProduto={product} />}
                responsiveOptions={responsiveOptions}
                numVisible={3}
                numScroll={3}
                circular
                autoplayInterval={3000}
            />
        </div>
    )
}
