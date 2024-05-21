import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { UserAutenticado } from "./authContext";

interface UserDecoded {
    id: number;
    name: string;
    email: string;
    telefone: string;
    CPF: string;
    role: number | string;
}

const DataUser = createContext<UserDecoded | null>(null)

function DataUserProvider({ children }: any) {

    const [user, setUser] = useState<UserDecoded | null>(null)
    const {token} = useContext(UserAutenticado)

    useEffect(() => {

        try {
            if (token) {
                const decoded: UserDecoded = jwtDecode(token)
                setUser(decoded)
            }
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (
        <DataUser.Provider value={user}>
            {children}
        </DataUser.Provider>
    )
}

export { DataUserProvider, DataUser }