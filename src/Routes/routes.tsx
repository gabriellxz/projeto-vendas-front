import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/login";
import Cadastro from "../Pages/Cadastro/cadastro";
import Home from "../Pages/Home/home";
import { UserAutenticadoProvider } from "../context/authContext";
import CustomRoutes from "../utils/Custom-routes";
import CadastroProdutos from "../Pages/CadastroProdutos/cadastro-produtos";
import ListProduct from "../Pages/Home/List-products/list-products";
import DetailsProduct from "../Pages/Details-product/details-product";
import { DataUserProvider } from "../context/dataUser";
import Cart from "../Pages/Home/Cart/cart";
import { CartProvider } from "../context/cart";

export default function RoutesApp() {

    return (
        <BrowserRouter>
            <UserAutenticadoProvider>
                <DataUserProvider>
                    <CartProvider>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="cadastro" element={<Cadastro />} />
                            <Route path="home" element={
                                <CustomRoutes>
                                    <Home />
                                </CustomRoutes>
                            }>
                                <Route index element={<ListProduct />} />
                                <Route path="catalogo-produtos" element={<ListProduct />} />
                                <Route path="detalhes-produtos/:idProduto" element={<DetailsProduct />} />
                                <Route path="carrinho" element={<Cart />} />
                            </Route>
                            <Route path="cadastro-produtos" element={
                                <CustomRoutes>
                                    <CadastroProdutos />
                                </CustomRoutes>
                            } />
                        </Routes>
                    </CartProvider>
                </DataUserProvider>
            </UserAutenticadoProvider >
        </BrowserRouter>
    )
}