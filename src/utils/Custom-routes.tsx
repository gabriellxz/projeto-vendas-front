import { useContext } from "react"
import { UserAutenticado } from "../context/authContext"
import { Navigate } from "react-router-dom"

interface Props {
    children: JSX.Element
}

export default function CustomRoutes({children}:Props) {

    const {token} = useContext(UserAutenticado)

    if (!token) {
        return <Navigate to={"/"}/>
    }

    return children
}