import { ChangeEvent, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../config/config"
import { supabase } from '../utils/supabase'
// import useCategory from "./useCategory"

export default function useCreateProduct() {

    const [nome_produto, setNomeProduto] = useState<string>("")
    const [preco, setPreco] = useState<number>()
    const [descricao, setDescricao] = useState<string>("")
    const [estoque, setEstoque] = useState<number>()
    const [file, setFile] = useState<File | null>(null)
    const [produtoId, setProdutoId] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)
    const [categoryId, setCategoryId] = useState<number>()
    // const {categoryId} = useCategory()
    const navigate = useNavigate()

    function handleNomeProduct(event: ChangeEvent<HTMLInputElement>): void {
        setNomeProduto(event.target.value)
    }

    function handlePreco(event: ChangeEvent<HTMLInputElement>): void {
        const precoProduct: number = parseFloat(event.target.value)
        setPreco(precoProduct)
    }

    function handleDescricao(event: ChangeEvent<HTMLTextAreaElement>): void {
        setDescricao(event.target.value)
    }

    function handleEstoque(event: ChangeEvent<HTMLInputElement>): void {
        const numeroEstoque: number = parseFloat(event.target.value)
        setEstoque(numeroEstoque)
    }

    function handleCategoria(event: ChangeEvent<HTMLSelectElement>): void {
        const categoryId: number = parseInt(event.target.value)
        setCategoryId(categoryId)
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            return setFile(e.target.files[0])
        }
    }

    async function filePost(produtoId?: number) {
        const { data, error } = await supabase.storage
            .from("Products")
            .upload(`public/${produtoId}/` + file?.name, file as File)

        if (data) {
            console.log(data)
        } else if (error) {
            console.log(error)
        }
    }

    const token = localStorage.getItem("tokenUser")
    // const { product } = useListProduct()

    async function registerProduct(e: SyntheticEvent) {
        e.preventDefault()
        // console.log("Token: ", token)

        setLoading(true)


        try {
            if (token) {
                if (
                    nome_produto === "" ||
                    preco === undefined ||
                    estoque === undefined ||
                    file === null ||
                    descricao === "" ||
                    categoryId === undefined
                ) {
                    toast.error("Preencha os campos corretamente!", {
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
                } else {

                    const data = {
                        nome_produto,
                        descricao,
                        preco,
                        estoque,
                        categoryId
                    }

                    const response = await api.post("/Product/create", data, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${JSON.parse(token)}`
                        }
                    })

                    setProdutoId(response.data.id_produto)
                    filePost(response.data.id_produto)

                    console.log("Produto Cadastrado com sucesso!")

                    toast.success("Produto cadastrado com sucesso!", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                    setTimeout(() => {
                        navigate("/home")
                    }, 3000)
                    // window.location.reload()
                    setLoading(false)

                }
            } else {
                console.error("Token não encontrado!")
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
        }

    }


    return {
        nome_produto,
        preco,
        estoque,
        file,
        handleDescricao,
        handleEstoque,
        handleNomeProduct,
        handlePreco,
        produtoId,
        handleFile,
        filePost,
        categoryId,
        handleCategoria,
        registerProduct,
        loading
    }
}