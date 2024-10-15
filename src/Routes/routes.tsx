import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/login";
import Cadastro from "../Pages/Cadastro/cadastro";
import Home from "../Pages/Home/home";
import { UserAutenticadoProvider } from "../context/authContext";
import CustomRoutes from "../utils/Custom-routes";
import CadastroProdutos from "../Pages/CadastroProdutos/cadastro-produtos";
import ListProduct from "../Pages/Home/List-products/list-products";
import DetailsProduct from "../Pages/Details-product/details-product";
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
import PainelAdministrativo from "../Pages/Dashboard/Painel-administrativo/painel-administrativo";
import Perfil from "../Pages/Home/Perfil/perfil";
import { AnimatePresence } from "framer-motion";
import OrderUser from "../Pages/Home/Order-user/order-user";
import Enderecos from "../Pages/Home/Enderecos/enderecos";
import EditEndereco from "../Pages/Home/EditEndereco/editEndereco";
import PageSuccess from "../Pages/PageSuccess/page-success";
import PageErrorPayment from "../Pages/PageError/page-error";

export default function RoutesApp() {
    return (
        <AnimatePresence>
            <BrowserRouter>
                <UserAutenticadoProvider>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="cadastro" element={<Cadastro />} />
                        <Route path="home" element={
                            <UserAutenticadoProvider>
                                <CustomRoutes>
                                    <Home />
                                </CustomRoutes>
                            </UserAutenticadoProvider>
                        }>
                            <Route index element={<ListProduct />} />
                            <Route path="catalogo-produtos" element={<ListProduct />} />
                            <Route path="detalhes-produtos/:idProduto" element={<DetailsProduct />} />
                            <Route path="carrinho" element={<Cart />} />
                            <Route path="criar-endereço" element={<FormEndereco />} />
                            <Route path="perfil" element={<Perfil />} />
                            <Route path="meus-pedidos" element={<OrderUser />} />
                            <Route path="meus-endereços" element={<Enderecos />} />
                            <Route path="editar-endereço/:idEndereco" element={<EditEndereco />} />
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
                            <Route path="registro-de-pedidos" element={<RegistroDePedidos />} />
                            <Route path="detalhes-de-pedidos/:userId" element={<DetalhesDePedidos />} />
                            <Route path="produto-e-estoque" element={<ProdutoEstoque />} />
                            <Route path="painel-administrativo" element={<PainelAdministrativo />} />
                        </Route>
                        <Route path="acesso-negado" element={<PageError />} />
                        <Route path="pagamento-efetuado" element={<PageSuccess />} />
                        <Route path="pagamento-erro" element={<PageErrorPayment />} />
                    </Routes>
                </UserAutenticadoProvider >
            </BrowserRouter>
        </AnimatePresence>
    )
}