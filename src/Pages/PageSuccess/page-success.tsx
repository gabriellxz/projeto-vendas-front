import { CheckCircleIcon } from "@heroicons/react/16/solid";
import logo from "../../assets/yeshuá.svg"
import { useContext } from "react";
import { UserAutenticado } from "../../context/authContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PageSuccess() {

    const { user } = useContext(UserAutenticado)
    const navigate = useNavigate()

    function redirect() {
        navigate("/home")
    }

    console.log(user)

    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <div className="flex gap-5">
                <CheckCircleIcon className="w-[100px] text-green-700" />
                <img src={logo} alt="logo" className="max-w-[120px] w-full" />
            </div>
            <p className="text-3xl uppercase text-center">
                Pagamento efetuado com sucesso! Obrigado pela preferência, {user?.name}!
            </p>
            <div className="mt-5">
                <Button onClick={redirect} variant="outlined">Voltar para o catálogo</Button>
            </div>
        </div>
    );
}