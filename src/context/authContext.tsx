import { createContext, useEffect, useState } from "react";
import api from "../config/config";

interface ContextType {
    autenticado: boolean;
    logout: () => void;
    loading: boolean;
    token: string | null
}

const UserAutenticado = createContext<ContextType>({} as ContextType)


function UserAutenticadoProvider({ children }: any) {

    const [autenticado, setAutenticado] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        async function getlogin() {
            try {
                const token = localStorage.getItem("tokenUser")

                if (token) {
                    api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
                    setAutenticado(true)
                    setToken(token)
                }
            } catch (error) {
                console.log(error)
                setToken(null)
            } finally {
                setLoading(false)
            }
        }

        getlogin()
    }, [])

    function logout() {
        localStorage.removeItem("tokenUser")
        api.defaults.headers.Authorization = null
        setAutenticado(false)
        setToken(null)
    }

    return (
        <UserAutenticado.Provider value={{ autenticado, logout, loading, token }}>
            {children}
        </UserAutenticado.Provider>
    )
}

export { UserAutenticado, UserAutenticadoProvider }