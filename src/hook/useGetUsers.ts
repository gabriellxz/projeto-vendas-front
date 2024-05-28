import api from "../config/config";
import { useEffect, useContext, useState } from "react";
import { UserAutenticado } from "../context/authContext";
import { User } from "../types/user";


export default function useGetUsers() {

    const [users, setUsers] = useState<User[]>([])
    const { token } = useContext(UserAutenticado)

    useEffect(() => {
        async function getUsers() {
            if (token) {
                try {
                    const response = await api.get("users", {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    setUsers(response.data)
                } catch (error) {
                    console.log(error)
                }
            }
        }

        getUsers()
    }, [])

    return {
        users
    }
}