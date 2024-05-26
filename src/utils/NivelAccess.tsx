import { useContext } from "react";
import { UserAutenticado } from "../context/authContext";
import { Navigate } from "react-router-dom"

interface Props {
    children: JSX.Element
}

export default function NivelAccess(props: Props) {

    const { user } = useContext(UserAutenticado)

    if (user?.role == 1) {
        return <Navigate to={"/acesso-negado"} />
    }

    return props.children
}