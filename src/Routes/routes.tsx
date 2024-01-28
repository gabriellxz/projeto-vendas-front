import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/login";
import Cadastro from "../Pages/Cadastro/cadastro";
import Home from "../Pages/Home/home";
import { UserAutenticadoProvider } from "../context/authContext";
import CustomRoutes from "../utils/Custom-routes";
import CadastroProdutos from "../Pages/CadastroProdutos/cadastro-produtos";

export default function RoutesApp() {
    return (
        <UserAutenticadoProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="cadastro" element={<Cadastro />} />
                    <Route path="home" element={
                        <CustomRoutes>
                            <Home/>
                        </CustomRoutes>
                    } />
                    <Route path="cadastro-produtos" element={<CadastroProdutos />}/>
                </Routes>
            </BrowserRouter>
        </UserAutenticadoProvider>
    )
}