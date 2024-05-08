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
import Forget from "../Pages/Forget/forget";
import ChangePass from "../Pages/Change-pass/change-pass";
import HeaderDashboard from "../Pages/Dashboard/header-dashboard";
import RegistroDePedidos from "../Pages/Dashboard/Registro-de-pedidos/Resgistros-de-pedidos";
import ProdutoEstoque from "../Pages/Dashboard/Produtos-estoque/produtos-estoque";
import DetalhesDePedidos from "../Pages/Dashboard/Registro-de-pedidos/Detalhes-de-pedidos/detalhes-de-pedidos";

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
                        <UserAutenticadoProvider>
                            <CustomRoutes>
                                <NivelAccess>
                                    <CadastroProdutos />
                                </NivelAccess>
                            </CustomRoutes>
                        </UserAutenticadoProvider>
                    } />
                    <Route path="forget" element={<Forget />} />
                    <Route path="changePass" element={
                        <UserAutenticadoProvider>
                            <CustomRoutes>
                                <ChangePass />
                            </CustomRoutes>
                        </UserAutenticadoProvider>
                    } />
                    <Route path="dashboard" element={
                        <UserAutenticadoProvider>
                            <CustomRoutes>
                                <NivelAccess>
                                    <HeaderDashboard />
                                </NivelAccess>
                            </CustomRoutes>
                        </UserAutenticadoProvider>
                    }>
                        <Route index element={<RegistroDePedidos />} />
                        <Route path="registro-de-pedidos" element={<RegistroDePedidos />}/>
                        <Route path="detalhes-de-pedidos/:userId" element={<DetalhesDePedidos />} />
                        <Route path="produto-e-estoque" element={<ProdutoEstoque />} />
                    </Route>
                    <Route path="acesso-negado" element={<PageError />} />
                </Routes>
            </UserAutenticadoProvider >
        </BrowserRouter >
    )
}