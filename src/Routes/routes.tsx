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
import FormEndereco from "../Pages/Home/Form-endereco/form-enderco";
import PageError from "../Pages/Access-block/access-block";
import NivelAccess from "../utils/NivelAccess";


export default function RoutesApp() {


    return (
        <BrowserRouter>
            <UserAutenticadoProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="cadastro" element={<Cadastro />} />
                    <Route path="home" element={
                        <UserAutenticadoProvider>
                            <CustomRoutes>
                                <DataUserProvider>
                                    <Home />
                                </DataUserProvider>
                            </CustomRoutes>
                        </UserAutenticadoProvider>  
                    }>
                        <Route index element={<ListProduct />} />
                        <Route path="catalogo-produtos" element={<ListProduct />} />
                        <Route path="detalhes-produtos/:idProduto" element={<DetailsProduct />} />
                        <Route path="carrinho" element={<Cart />} />
                        <Route path="criar-endereço" element={<FormEndereco />} />
                    </Route>
                    <Route path="cadastro-produtos" element={
                        <CustomRoutes>
                            <UserAutenticadoProvider>
                                <NivelAccess>
                                    <CadastroProdutos />
                                </NivelAccess>
                            </UserAutenticadoProvider>
                        </CustomRoutes>
                    } />
                    <Route path="acesso-negado" element={<PageError />} />
                </Routes>
            </UserAutenticadoProvider >
        </BrowserRouter >
    )
}