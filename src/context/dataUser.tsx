import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

interface UserDecoded {
    id:number;
    name:string;
    email:string;
    role:number;
}

const DataUser = createContext<UserDecoded | null>(null)

function DataUserProvider({children}: any) {

    const [user, setUser] = useState<UserDecoded | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('tokenUser')

        try {
            if(token) {
                const decoded:UserDecoded = jwtDecode(token)
                setUser(decoded)
            }
        } catch (e) {
            console.log(e)
        }
    }, [])

    return(
        <DataUser.Provider value={user}>
            {children}
        </DataUser.Provider>
    )
}

export {DataUserProvider, DataUser}