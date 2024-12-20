import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserAutenticado } from "../context/authContext"

interface Props {
    children: JSX.Element
}

export function CustomRoutes({ children }: Props) {

    const { token } = useContext(UserAutenticado)
    // const token = localStorage.getItem("tokenUser")
    if (!token) {
        return <Navigate to={"/"} />
    }

    return children
}

export function AccessPaymentSucces({ children }: Props) {
    const queryParams = new URLSearchParams(location.search)
    const sessionId = queryParams.get("session_id")

    if (!sessionId) return <Navigate to={"/home"} />

    return children
}