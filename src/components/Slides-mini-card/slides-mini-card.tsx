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
            breakpoint: '640px',  
            numVisible: 1,        
            numScroll: 1          
        },
        {
            breakpoint: '1024px', 
            numVisible: 3,        
            numScroll: 3          
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
