import { createContext, useEffect, useState } from "react";
import api from "../config/config";

interface ContextType {
    autenticado: boolean;
    signIn: (sit: boolean) => void;
    token: string | null;
}

const UserAutenticado = createContext<ContextType>({} as ContextType)


function UserAutenticadoProvider({ children }: any) {

    const tokenValidation = localStorage.getItem("tokenUser")
    const [autenticado, setAutenticado] = useState<boolean>(false)
    const [token, setToken] = useState(tokenValidation)

    useEffect(() => {
        function getLogin() {
            const token = localStorage.getItem("tokenUser")

            if (token) {
                api.defaults.headers.Authorization = `Bearer ${token}`
                setToken(token)
                setAutenticado(true)
            } else {
                setAutenticado(false)
            }
        }

        getLogin()
    }, [])



    function signIn(sit: boolean) {
        setAutenticado(sit)
    }

    return (
        <UserAutenticado.Provider value={{ autenticado, signIn, token }}>
            {children}
        </UserAutenticado.Provider>
    )
}

export { UserAutenticado, UserAutenticadoProvider }