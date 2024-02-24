import { useEffect, useState } from "react"
import api from "../config/config"
import { AxiosResponse } from "axios"
import Category from "../types/category"

export default function useCategory() {

    const [categoria, setCategoria] = useState<Category[]>([])

    useEffect(() => {
        async function getcategoria() {
            await api.get("/Category")
                .then((response: AxiosResponse) => {
                    console.log(response.data)
                    setCategoria(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getcategoria()
    }, [])


    return {
        categoria,
    }
}