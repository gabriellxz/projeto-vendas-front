import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserAutenticado } from "../context/authContext"

interface Props {
    children: JSX.Element
}

export default function CustomRoutes({ children }: Props) {

    const { token } = useContext(UserAutenticado)
    // const token = localStorage.getItem("tokenUser")
    if (!token) {
        return <Navigate to={"/"} />
    }

    return children
}