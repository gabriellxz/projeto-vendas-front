import { useContext } from "react"
import { UserAutenticado } from "../context/authContext"
import { Link } from "react-router-dom"

export default function ButtonLogout() {

    const {logout} = useContext(UserAutenticado)

    return (
        <Link to={"/"} className="cursor-pointer" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
        </Link>
    )
} 