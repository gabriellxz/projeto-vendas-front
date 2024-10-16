import { ChangeEvent, SyntheticEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../config/config";
import { UserAutenticado } from "../context/authContext";
import { SelectChangeEvent } from "@mui/material";
// import AWS from 'aws-sdk'

// const ACCESS_KEY_AWS = import.meta.env.ACCESS_KEY_AWS
// const SECRET_KEY_AWS = import.meta.env.SECRET_KEY_AWS
// const BUCKET_AWS = import.meta.env.BUCKET_AWS
// const REGION_AWS = import.meta.env.REGION_AWS

export default function useCreateProduct() {

    const [nome_produto, setNomeProduto] = useState<string>("")
    const [preco, setPreco] = useState<number>()
    const [descricao, setDescricao] = useState<string>("")
    const [estoque, setEstoque] = useState<number>()
    const [file, setFile] = useState<File | null>(null)
    const [produtoId, setProdutoId] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)
    const [categoryId, setCategoryId] = useState<number>()
    const [ofertaProduct, setOfertaProduct] = useState<string>("")
    const [width, setWidth] = useState<number>()
    const [weight, setWeight] = useState<number>()
    const [height, setHeight] = useState<number>()
    const [diameter, setDiamater] = useState<number>()
    const [length, setLength] = useState<number>()
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

    function handleCategoria(event: SelectChangeEvent<any>): void {
        const categoryId: number = parseInt(event.target.value)
        setCategoryId(categoryId)
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>): void {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0])
        }
    }

    function handleOferta(e: any): void {
        setOfertaProduct(e.target.value)
        // const oferta = ofertaProduct == "true" ? false : true
        // console.log(oferta)
    }

    function handlewidth(e:ChangeEvent<HTMLInputElement>) {
        const widthValue: number = parseInt(e.target.value)
        setWidth(widthValue)
    }

    function handleweight(e:ChangeEvent<HTMLInputElement>) {
        const weightValue: number = parseInt(e.target.value)
        setWeight(weightValue)
    }

    function handleheight(e:ChangeEvent<HTMLInputElement>) {
        const heightValue: number = parseInt(e.target.value)
        setHeight(heightValue)
    }

    function handlelengthity(e:ChangeEvent<HTMLInputElement>) {
        const lengthityValue: number = parseInt(e.target.value)
        setLength(lengthityValue)
    }

    function handlediameter(e:ChangeEvent<HTMLInputElement>) {
        const diameterValue: number = parseInt(e.target.value)
        setDiamater(diameterValue)
    }

    // const token = localStorage.getItem("tokenUser")
    const { token } = useContext(UserAutenticado)

    async function registerProduct(e: SyntheticEvent) {
        e.preventDefault();
    
        setLoading(true);
    
        const oferta = ofertaProduct === "true";
    
        if (
            nome_produto !== "" &&
            descricao !== "" &&
            preco !== undefined &&
            estoque !== undefined &&
            categoryId !== undefined &&
            file !== null &&
            diameter !== null &&
            weight !== null &&
            height !== null &&
            width !== null &&
            length !== null
        ) {
            const data = {
                nome_produto,
                descricao,
                preco,
                estoque,
                categoryId,
                oferta,
                diameter,
                weight,
                height,
                width,
                length
            };
    
            try {
                if (token) {
                    const response = await api.post("/product/create", data, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${JSON.parse(token)}`
                        }
                    });
    
                    setLoading(false);
                    setProdutoId(response.data.id_produto);
    
                    toast.success("Produto cadastrado com sucesso!", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored"
                    });
    
                    const formData = new FormData();
                    if (file) {
                        formData.append("file", file);
                    }
    
                    api.post(`/product/Image/${response.data.id_produto}`, formData, {
                        headers: {
                            Authorization: `Bearer ${JSON.parse(token)}`,
                            "Content-Type": "multipart/form-data"
                        }
                    });
    
                    setTimeout(() => {
                        navigate("/dashboard/produto-e-estoque");
                    }, 3000);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
    
                toast.error("Ocorreu um erro ao cadastrar o produto. Por favor, tente novamente.", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                });
            }
        } else {
            setLoading(false);
            toast.error("Preencha todos os campos corretamente.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    }
    


    // async function filePost(file: File | null) {
    // if (!file) {
    //     console.log("Nenhum arquivo fornecido...");
    //     return;
    // }

    // const s3 = new AWS.S3({
    //     accessKeyId: ACCESS_KEY_AWS,
    //     secretAccessKey: SECRET_KEY_AWS,
    //     region: REGION_AWS
    // });

    // const params = {
    //     Bucket: BUCKET_AWS || "",
    //     Key: file.name,
    //     Body: file,
    //     ContentType: "image/png"
    // };

    // try {
    //     if (token) {



    // const data = await s3.upload(params).promise();
    // console.log("Arquivo enviado com sucesso!: ", data);
    //     }
    // } catch (err) {
    //     console.log("erro: ", err);
    // }
    // }

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
        // filePost,
        categoryId,
        handleCategoria,
        registerProduct,
        loading,
        handleOferta,
        ofertaProduct,
        handleheight,
        handleweight,
        handlewidth,
        handlelengthity,
        handlediameter,
        diameter,
        length,
        width,
        weight,
        height
    }
}
