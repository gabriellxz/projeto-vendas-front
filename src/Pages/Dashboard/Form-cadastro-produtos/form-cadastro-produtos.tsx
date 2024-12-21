import { toast, ToastContainer } from "react-toastify";
// import Input from "../Input/input";
import TitleForm from "../../../components/Title-form/title-form";
import Input from "../../../components/Input/input";
import ButtonDark from "../../../components/Button-dark/button-dark";
import Loading from "../../../components/Loading/loading";
import Category from "../../../types/category";
import useCategory from "../../../hook/useCategory";
import { useContext, useState } from "react";
import CloseNavBar from "../../../svg/closeNavbar";
import '../../../global.css'
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid"
import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { UserAutenticado } from "../../../context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../../schemas/productSchema";
import api from "../../../config/config";
import FormText from "react-bootstrap/esm/FormText";
import { AxiosResponse } from "axios";

interface TypeCreateProduct {
    nome_produto: string
    preco: number
    descricao: string
    estoque: number
    oferta: boolean
    weight: number
    height: number
    width: number
    diameter: number
    length: number
    categoryId: number
    file?: FileList
}

export default function FormCadastroProdutos() {

    const navigate = useNavigate();
    const { token } = useContext(UserAutenticado)
    const [loading, setLoading] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<TypeCreateProduct>({
        resolver: zodResolver(productSchema)
    })
    const { categoria, categoriaNome, createCategory, onChangeCategoria, loadingCategory } = useCategory()

    // console.log(errors)

    async function createProduct(data: TypeCreateProduct) {
        setLoading(true)

        const dataProduct = {
            ...data,
            oferta: Boolean(data.oferta)
        }

        try {
            if (token) {
                const response: AxiosResponse = await api.post("/product/create", dataProduct, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token),
                        "Content-Type": "application/json"
                    }
                })

                const formData = new FormData()

                if (data.file) {
                    Array.from(data.file).forEach((file) => {
                        formData.append("file", file)
                    })
                }

                api.post(`/product/Image/${response.data.id_produto}`, formData, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token),
                        "Content-Type": "multipart/form-data"
                    }
                }).then(() => {
                    toast.success("O produto foi criado com sucesso!", {
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
                    navigate("/dashboard/produto-e-estoque")
                }).catch((error) => {
                    console.log(error)

                    toast.error("Houve um erro na criação do produto", {
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
                })

                setLoading(false)
            }
        } catch (err) {
            toast.error("Houve um erro na criação do produto", {
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
    }

    const [open, setOpen] = useState<boolean>(false)
    const [openCampos, setOpenCampos] = useState<boolean>(false)

    function closeModal() {
        setOpenCampos(false)
    }

    function redirect() {
        navigate("/dashboard/produto-e-estoque")
    }

    const selectedFile = watch("file")

    return (
        <>
            <div className="absolute top-5 left-5">
                <Button variant="outlined" onClick={redirect}>Voltar</Button>
            </div>
            <form className="max-w-[600px] w-full m-5" onSubmit={handleSubmit(createProduct)}>
                <div className="mb-10 text-center">
                    <TitleForm text={"cadastre um novo produto"} />
                </div>
                <div className="flex flex-col gap-7 justify-center">
                    <div className="flex w-full gap-5">
                        <div className="flex flex-col w-full">
                            <TextField
                                {...register("nome_produto")}
                                label="Nome do produto"
                                variant="outlined"
                            />
                            {
                                errors.nome_produto && errors.nome_produto.message && (
                                    <FormText className="text-red-600">
                                        {errors.nome_produto.message}
                                    </FormText>
                                )
                            }
                        </div>
                        <div className="flex flex-col w-full">
                            <TextField
                                label="Preço"
                                variant="outlined"
                                type="number"
                                {...register("preco", {
                                    setValueAs: (value) => value == "" ? undefined : Number(value)
                                })}
                            />
                            {
                                errors.preco && errors.preco.message && (
                                    <FormText className="text-red-600">
                                        {errors.preco.message}
                                    </FormText>
                                )
                            }
                        </div>
                    </div>
                    <div className="sm:flex sm:flex-row flex flex-col items-center w-full gap-5">
                        <FormControl className="flex w-full">
                            <InputLabel>Categoria</InputLabel>
                            <div className="flex gap-2">
                                <Select
                                    {...register("categoryId")}
                                    variant="outlined"
                                    label="Categoria"
                                    sx={{
                                        minWidth: "200px",
                                        maxWidth: "200px",
                                        overflow: "hidden",
                                    }}
                                >
                                    <MenuItem disabled selected>Selecione uma categoria</MenuItem>
                                    {
                                        categoria.map((cat: Category) => (
                                            <MenuItem value={cat.id} key={cat.id}>{cat.nome}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <Button
                                    variant="contained"
                                    onClick={() => { setOpen(!open) }}
                                    sx={{ backgroundColor: "#3044A6", width: "100%", fontSize: "10px" }}
                                >
                                    + Categoria
                                </Button>
                            </div>
                            {
                                errors.categoryId && errors.categoryId.message && (
                                    <FormText className="text-red-600">
                                        {errors.categoryId.message}
                                    </FormText>
                                )
                            }
                        </FormControl>
                        <div className="flex flex-col w-full">
                            <TextField
                                variant="outlined"
                                label="Estoque"
                                type="number"
                                {...register("estoque", {
                                    setValueAs: (value) => value == "" ? undefined : Number(value)
                                })}
                            />
                            {
                                errors.estoque && errors.estoque.message && (
                                    <FormText className="text-red-600">
                                        {errors.estoque.message}
                                    </FormText>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <TextField
                            label="Descrição do produto"
                            multiline
                            rows={7}
                            {...register("descricao")}
                        />
                        {
                            errors.descricao && errors.descricao.message && (
                                <FormText className="text-red-600">
                                    {errors.descricao.message}
                                </FormText>
                            )
                        }
                    </div>
                    <div>
                        <span className="flex justify-end cursor-pointer gap-2" onClick={() => setOpenCampos(!openCampos)}>
                            Mais
                            {
                                openCampos == false ? <ArrowDownIcon className="w-5" /> : <ArrowUpIcon className="w-5" />
                            }
                        </span>
                    </div>
                    {
                        openCampos &&
                        <div className="w-full flex flex-col gap-5">
                            <div className="flex flex-col w-full">
                                <TextField
                                    variant="outlined"
                                    label="Quantidade"
                                    type="number"
                                    {...register("length", {
                                        setValueAs: (value) => value == "" ? undefined : Number(value)
                                    })}
                                />
                                {
                                    errors.length && errors.length.message && (
                                        <FormText className="text-red-600">
                                            {errors.length.message}
                                        </FormText>
                                    )
                                }
                            </div>
                            <div className="flex gap-5">
                                <div className="flex flex-col w-full">
                                    <TextField
                                        variant="outlined"
                                        label="Altura"
                                        type="number"
                                        {...register("height", {
                                            setValueAs: (value) => value == "" ? undefined : Number(value)
                                        })}
                                    />
                                    {
                                        errors.height && errors.height.message && (
                                            <FormText className="text-red-600">
                                                {errors.height.message}
                                            </FormText>
                                        )
                                    }
                                </div>
                                <div className="flex flex-col w-full">
                                    <TextField
                                        variant="outlined"
                                        label="Largura"
                                        type="number"
                                        {...register("width", {
                                            setValueAs: (value) => value == "" ? undefined : Number(value)
                                        })}
                                    />
                                    {
                                        errors.width && errors.width.message && (
                                            <FormText className="text-red-600">
                                                {errors.width.message}
                                            </FormText>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="flex flex-col w-full">
                                    <TextField
                                        variant="outlined"
                                        label="Peso"
                                        type="number"
                                        {...register("weight", {
                                            setValueAs: (value) => value == "" ? undefined : Number(value)
                                        })}
                                    />
                                    {
                                        errors.weight && errors.weight.message && (
                                            <FormText className="text-red-600">
                                                {errors.weight.message}
                                            </FormText>
                                        )
                                    }
                                </div>
                                <div className="flex flex-col w-full">
                                    <TextField
                                        variant="outlined"
                                        label="Diâmentro"
                                        type="number"
                                        {...register("diameter", {
                                            setValueAs: (value) => value == "" ? undefined : Number(value)
                                        })}
                                    />
                                    {
                                        errors.diameter && errors.diameter.message && (
                                            <FormText className="text-red-600">
                                                {errors.diameter.message}
                                            </FormText>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    <div className="flex flex-col w-full">
                        <label className="text-xl">Imagem</label>
                        <div>
                            <Controller
                                control={control}
                                name="file"
                                defaultValue={undefined}
                                render={({ field }) => (
                                    <Box>
                                        <Button
                                            variant="outlined"
                                            component="label"
                                        >
                                            Selecionar arquivo
                                            <input
                                                type="file"
                                                hidden
                                                multiple
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    if (files) {
                                                        console.log("arquivo: ", files)
                                                        field.onChange(files);
                                                    }
                                                }}
                                            />
                                        </Button>

                                        {selectedFile && (
                                            <Typography variant="body2" sx={{ marginTop: "8px" }}>
                                                {Array.from(selectedFile).map((file) => file.name).join(", ")}
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            />
                        </div>
                    </div>
                    <FormControl sx={{ display: "flex", flexDirection: "column" }}>
                        <FormLabel>Produto em oferta:</FormLabel>
                        <RadioGroup
                            {...register("oferta", {
                                setValueAs: (value) => value === "true"
                            })}
                        >
                            <div>
                                <FormControlLabel
                                    control={<Radio />}
                                    label={"Sim"}
                                    value={"true"}
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    control={<Radio />}
                                    label={"Não"}
                                    value={"false"}
                                />
                            </div>
                        </RadioGroup>
                        {
                            errors.oferta && errors.oferta.message && (
                                <FormText className="text-red-600">
                                    {errors.oferta.message}
                                </FormText>
                            )
                        }
                    </FormControl>
                    <div>
                        {loading ? <Loading /> : <ButtonDark text="send" />}

                    </div>
                </div>
                <Modal
                    open={open}
                    onClose={closeModal}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "500px",
                            width: "100%",
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <span className="text-right w-full cursor-pointer">
                            <CloseNavBar handleNavBar={() => { setOpen(!open) }} />
                        </span>
                        <div>
                            <Input
                                inputLabel="Nome da linha"
                                name="nome"
                                onInputValue={onChangeCategoria}
                                styleWidth="w-full"
                                typeInput="text"
                                value={categoriaNome}
                            />
                        </div>
                        {loadingCategory ? <Loading /> : <ButtonDark text="Criar" propsBtn={() => createCategory(setOpen)} />}
                    </Box>
                </Modal>

                <ToastContainer />
            </form>
        </>
    )
}