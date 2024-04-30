import { createContext,  useState } from "react";
import api from "../config/config";
    
interface ContextType {
    autenticado: boolean;
    logout: () => void;
    loading: boolean;
    token: string | null;
    login: (token: string | null) => void;
}

const UserAutenticado = createContext<ContextType>({} as ContextType)


function UserAutenticadoProvider({ children }: any) {

    const [autenticado, setAutenticado] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [token, setToken] = useState<string | null>(localStorage.getItem("tokenUser"))
    

    async function login(token: string | null) {
        setLoading(true)

        try {
            setLoading(false)
            setAutenticado(true)
            localStorage.setItem("tokenUser", JSON.stringify(token))
            setToken(token)

            if(token) {
                api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            }
        } catch(error) {
            setToken(null)
            setLoading(false)
        }
    }

    function logout() {
        localStorage.removeItem("tokenUser")
        api.defaults.headers.Authorization = ""
        setAutenticado(false)
        setToken(null)
    }

    return (
        <UserAutenticado.Provider value={{ autenticado, logout, loading, token, login }}>
            {children}
        </UserAutenticado.Provider>
    )
}

export { UserAutenticado, UserAutenticadoProvider }