import { ChangeEvent, SyntheticEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from "../config/config"
// import useCategory from "./useCategory"


export default function useCreateProduct() {

    const [nome_produto, setNomeProduto] = useState<string>("")
    const [preco, setPreco] = useState<number>()
    const [descricao, setDescricao] = useState<string>("")
    const [estoque, setEstoque] = useState<number>()
    const [image, setImage] = useState<File | null>(null)
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

    function handleImage(event: any) {
        if (event.target.value && event.target.files.length > 0) {
            setImage(event.target.value[0])
        }
    }

    const token = localStorage.getItem("tokenUser")
    // const { token } = useContext(UserAutenticado)


    async function registerProduct(e: SyntheticEvent) {
        e.preventDefault()
        console.log("Token: ", token)

        setLoading(true)


        try {
            if (token) {
                if (
                    nome_produto === "" ||
                    preco === undefined ||
                    estoque === undefined ||
                    image === null ||
                    descricao === ""
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

                    const formData = new FormData()

                    if (image) {
                        formData.append("file", image)
                    }

                    const data = {
                        nome_produto,
                        descricao,
                        preco,
                        estoque,
                        categoryId
                    }

                    await api.post("/Product/Image", formData, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${JSON.parse(token)}`
                        }
                    }).then((response) => {
                        console.log(response)
                    }).catch((err) => {
                        console.log(err)
                    })

                    await api.post("/Product/create", data, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${JSON.parse(token)}`
                        }
                    })
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
        image,
        handleDescricao,
        handleEstoque,
        handleNomeProduct,
        handlePreco,
        handleImage,
        categoryId,
        handleCategoria,
        registerProduct,
        loading
    }
}