import { createContext, useEffect, useState } from "react";
// import api from "../config/config";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface ContextType {
    autenticado: boolean;
    logout: () => void;
    token: string | null;
    login: (token: string | null) => void;
    cadastro: (token: string | null) => void;
    user: dataUser | null;
}

interface dataUser {
    id: number;
    name: string;
    email: string;
    telefone: string;
    CPF: string;
    role: number | string;
    exp: number;
}

const UserAutenticado = createContext<ContextType>({} as ContextType)


function UserAutenticadoProvider({ children }: any) {

    const navigate = useNavigate()
    const [autenticado, setAutenticado] = useState<boolean>(false)
    // const [loading, setLoading] = useState<boolean>(true)
    const [token, setToken] = useState<string | null>(localStorage.getItem("tokenUser"))
    const [user, setUser] = useState<dataUser | null>(null)

    useEffect(() => {
        if (token) {
            try {
                const userDecoded: dataUser = jwtDecode(token)
                const currentTime = Date.now() / 1000
                setUser(userDecoded)

                if (userDecoded.exp > currentTime) {
                    setAutenticado(true)
                } else {
                    setAutenticado(false)
                    localStorage.removeItem("tokenUser")
                    setToken(null)
                    navigate("/")
                }
            } catch (error) {
                console.log(error)
                setAutenticado(false)
            }
        } else {
            setAutenticado(false)
        }
    }, [token])

    function login(token: string | null) {
        localStorage.setItem("tokenUser", JSON.stringify(token))
        setAutenticado(true)
        setToken(token)
    }

    function cadastro(token: string | null) {
        localStorage.setItem("tokenUser", JSON.stringify(token))
        setAutenticado(true)
        setToken(token)
    }

    function logout() {
        localStorage.removeItem("tokenUser")
        setToken(null)
        setAutenticado(false)
    }

    return (
        <UserAutenticado.Provider value={{ autenticado, logout, token, login, cadastro, user }}>
            {children}
        </UserAutenticado.Provider>
    )
}

export { UserAutenticado, UserAutenticadoProvider }