import { useContext, useEffect, useState } from "react"
import { UserAutenticado } from "../context/authContext"
import api from "../config/config"

export default function useGetProfitTotal() {

    const { token } = useContext(UserAutenticado)
    const [profitTotal, setProfitTotal] = useState<number | null>(null)

    useEffect(() => {
        async function getProfitTotal() {
            if (token) {
                try {
                    const response = await api.get("/profit/total", {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    setProfitTotal(response.data)
                } catch (error) {
                    console.error(error)
                }
            }
        }

        getProfitTotal()
    }, [])

    return {
        profitTotal
    }
}