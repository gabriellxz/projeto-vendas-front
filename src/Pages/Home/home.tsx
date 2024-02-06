import { useContext } from "react"
import { UserAutenticado } from "../../context/authContext"
import { Link, Outlet } from "react-router-dom"

export default function Home() {

    const { logout } = useContext(UserAutenticado)
    const token = localStorage.getItem("tokenUser")

    return (
        <>
            <h1>Home</h1>
            <p>{token}</p>
            <Link to={"/"} onClick={logout}>Sair</Link>
            <Outlet/>
        </>
    )
}