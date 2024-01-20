import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Pages/Login/login";
import Cadastro from "../Pages/Cadastro/cadastro";

export default function RoutesApp() {
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="cadastro" element={<Cadastro/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}