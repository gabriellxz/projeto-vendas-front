import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/config";
import AWS from 'aws-sdk'

const ACCESS_KEY_AWS = import.meta.env.VITE_REACT_APP_ACCESS_KEY_AWS
const SECRET_KEY_AWS = import.meta.env.VITE_REACT_APP_SECRET_KEY_AWS
const BUCKET_AWS = import.meta.env.VITE_REACT_APP_BUCKET_AWS
const REGION_AWS = import.meta.env.VITE_REACT_APP_REGION_AWS

export default function useCreateProduct() {

    const [nome_produto, setNomeProduto] = useState<string>("")
    const [preco, setPreco] = useState<number>()
    const [descricao, setDescricao] = useState<string>("")
    const [estoque, setEstoque] = useState<number>()
    const [file, setFile] = useState<File | null>(null)
    const [produtoId, setProdutoId] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)
    const [categoryId, setCategoryId] = useState<number>()
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
            setFile(e.target.files[0])
        }
    }

    const token = localStorage.getItem("tokenUser")

    async function filePost(file: File | null) {
        if (!file) {
            console.log("Nenhum arquivo fornecido...");
            return;
        }

        const s3 = new AWS.S3({
            accessKeyId: ACCESS_KEY_AWS,
            secretAccessKey: SECRET_KEY_AWS,
            region: REGION_AWS
        });

        const params = {
            Bucket: BUCKET_AWS || "",
            Key: file.name,
            Body: file,
            ContentType: "image/png"
        };

        try {
            if (token) {

                const formData = new FormData()
                formData.append("file", file)

                const response = await api.post("/Product/Image", formData, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token),
                        "Content-Type": "multipart/form-data"
                    }
                });

                console.log("Resposta backend: ", response)
                const data = await s3.upload(params).promise();
                console.log("Arquivo enviado com sucesso!: ", data);
            }
        } catch (err) {
            console.log("erro: ", err);
        }
    }

    async function registerProduct(e: SyntheticEvent) {
        e.preventDefault()

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

                    const oferta = false

                    const data = {
                        nome_produto,
                        descricao,
                        preco,
                        estoque,
                        categoryId,
                        oferta
                    }

                    const response = await api.post("/Product/create", data, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${JSON.parse(token)}`
                        }
                    })

                    setProdutoId(response.data.id_produto)
                    filePost(file)

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
