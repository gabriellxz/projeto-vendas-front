import { ChangeEvent, useEffect, useState } from "react"
import api from "../config/config"
import { AxiosResponse } from "axios"
import Category from "../types/category"
import { toast } from "react-toastify"

export default function useCategory() {

    const [categoria, setCategoria] = useState<Category[]>([])
    const [categoriaNome, setCategoriaNome] = useState<string>("")
    const [loadingCategory, setLoading] = useState<boolean>(false)

    function onChangeCategoria(event: ChangeEvent<HTMLInputElement>) {
        setCategoriaNome(event.target.value)
    }

    const token = localStorage.getItem("tokenUser")

    async function createCategory(e: any) {
        e.preventDefault()

        const data = {
            nome: categoriaNome
        }

        setLoading(true)

        try {
            if (token) {
                await api.post("/Category", data, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                toast.success("Categoria criada com sucesso!", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

                setLoading(false)
            }
        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    useEffect(() => {
        async function getcategoria() {
            await api.get("/Category")
                .then((response: AxiosResponse) => {
                    // console.log(response.data)
                    setCategoria(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

        getcategoria()
    }, [categoria])


    return {
        categoria,
        createCategory,
        categoriaNome,
        onChangeCategoria,
        loadingCategory
    }
}