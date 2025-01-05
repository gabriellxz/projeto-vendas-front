import { useState, useContext, useEffect } from "react";
import { UserAutenticado } from "../../context/authContext";
import ProdutosDTO from "../../types/produto";
import api from "../../config/config";
import useCategory from "../../hook/useCategory";
import Category from "../../types/category";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../Loading/loading";
import CloseNavBar from "../../svg/closeNavbar";
import { Box, Button, FormControl, FormControlLabel, FormLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../../schemas/productSchema";
import FormText from "react-bootstrap/esm/FormText";

interface PropsForm {
    iProduct: ProdutosDTO | null;
    closeModal: (status: boolean) => void;
    nomeCategory: string | undefined;
    categoryId: number | undefined;
    openModal: boolean
}

interface TypeProductEdit {
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
}


export default function FormEditProduct(props: PropsForm) {

    const { categoria } = useCategory()
    const { token } = useContext(UserAutenticado)
    // const [nomeCategory, setNomeCategory] = useState<string | undefined>(props.nomeCategory)
    const [loading, setLoading] = useState<boolean>(false)
    const [openModalConfig, setOpenModalConfig] = useState(false)

    function openModal() {
        setOpenModalConfig(true)
    }

    function closeModal() {
        setOpenModalConfig(false)
    }

    const { register, handleSubmit, formState: { errors } } = useForm<TypeProductEdit>({
        defaultValues: {
            nome_produto: props.iProduct?.nome_produto,
            descricao: props.iProduct?.descricao,
            categoryId: props.iProduct?.categoryId,
            diameter: props.iProduct?.diameter,
            estoque: props.iProduct?.estoque,
            height: props.iProduct?.height,
            length: props.iProduct?.length,
            oferta: props.iProduct?.oferta,
            preco: props.iProduct?.preco,
            weight: props.iProduct?.weight,
            width: props.iProduct?.width
        },
        resolver: zodResolver(productSchema)
    })


    async function editProduct(data: TypeProductEdit) {

        setLoading(true)

        const dataProduct = {
            ...data,
            oferta: Boolean(data.oferta)
        }

        try {
            if (token) {
                await api.put(`/product/${props.iProduct?.id_produto}`, dataProduct, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token),
                        "Content-Type": "application/json"
                    }
                })

                toast.success("A edição do produto foi feita com sucesso!", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

                window.location.reload()
                setLoading(false)
            }
        } catch (err) {
            toast.error("Houve um erro na edição do produto", {
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

    useEffect(() => {
        if (

            errors.preco ||
            errors.diameter ||
            errors.estoque ||
            errors.weight ||
            errors.width
        ) {
            openModal()
        }
    }, [errors])

    return (

        <Modal
            open={props.openModal}
            onClose={props.closeModal}
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
                    position: "relative",
                }}
            >
                <div>
                    <span className="text-3xl font-bold">Editar produto</span>
                </div>
                <div className="absolute right-5 top-7">
                    <button onClick={() => props.closeModal(false)}><CloseNavBar /></button>
                </div>
                <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit(editProduct)}>
                    <div className="flex flex-col">
                        <TextField
                            type="text"
                            label="Nome do produto"
                            variant="outlined"
                            {...register("nome_produto")}
                        />
                        {
                            errors.nome_produto && errors.nome_produto.message && (
                                <FormText className="text-red-600">
                                    {
                                        typeof errors.nome_produto.message === "string" && errors.nome_produto.message
                                    }
                                </FormText>
                            )
                        }
                    </div>
                    <div className="w-full flex flex-col">
                        <Select
                            value={props.iProduct?.categoryId}
                            sx={{ width: "100%" }}
                            {...register("categoryId")}
                        >
                            <MenuItem>Selecione uma categoria</MenuItem>
                            {
                                categoria.map((c: Category) => (
                                    <MenuItem value={c.id}>{c.nome}</MenuItem>
                                ))
                            }
                        </Select>
                        {
                            errors.categoryId && errors.categoryId.message && (
                                <FormText className="text-red-600">
                                    {
                                        typeof errors.categoryId.message === "string" && errors.categoryId.message
                                    }
                                </FormText>
                            )
                        }
                    </div>
                    <Button variant="outlined" onClick={openModal}>Mais opções</Button>
                    <div className="w-full flex flex-col">
                        <TextField
                            type="text"
                            label="Descrição"
                            variant="filled"
                            maxRows={5}
                            sx={{
                                width: "100%"
                            }}
                            {...register("descricao")}
                        />
                        {
                            errors.descricao && errors.descricao.message && (
                                <FormText className="text-red-600">
                                    {
                                        typeof errors.descricao.message === "string" && errors.descricao.message
                                    }
                                </FormText>
                            )
                        }
                    </div>
                    <FormControl>
                        <FormLabel>Produto em oferta: {props.iProduct?.oferta === true ? "Sim" : "Não"}</FormLabel>
                        <RadioGroup
                            row
                            defaultValue={String(props.iProduct?.oferta)}
                            className="flex gap-[30px] py-5"
                            {...register("oferta", {
                                setValueAs: (value) => value === "true",
                            })}
                        >
                            <div className="flex items-center gap-1">
                                <FormControlLabel
                                    label="Sim"
                                    value="true"
                                    control={<Radio />}
                                />
                            </div>
                            <div className="flex items-center gap-1">
                                <FormControlLabel
                                    label="Não"
                                    value="false"
                                    control={<Radio />}
                                />
                            </div>
                        </RadioGroup>
                        {
                            errors.oferta && errors.oferta.message && (
                                <FormText className="text-red-600">
                                    {
                                        errors.oferta.message
                                    }
                                </FormText>
                            )
                        }
                    </FormControl>
                    <div className="w-full flex justify-center">
                        {
                            loading ? <Loading />
                                :
                                <button className="p-3 bg-green-300 text-green-800 font-bold max-w-[400px] w-full rounded-md text-xl">Salvar alterações</button>
                        }
                    </div>

                    <Modal
                        open={openModalConfig}
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
                                position: "relative",
                            }}
                        >
                            <div className="flex sm:flex sm:flex-row gap-4 mb-5">
                                <div className="w-full flex flex-col">
                                    <TextField
                                        type="number"
                                        label="Valor do produto"
                                        variant="outlined"
                                        sx={{ width: "100%" }}
                                        {...register("preco", {
                                            setValueAs: (value) => value == "" ? undefined : Number(value)
                                        })}
                                        inputProps={{
                                            step: "any"
                                        }}
                                    />
                                    {
                                        errors.preco && errors.preco.message && (
                                            <FormText className="text-red-600">
                                                {
                                                    errors.preco.message
                                                }
                                            </FormText>
                                        )
                                    }
                                </div>
                                <div className="w-full">
                                    <TextField
                                        type="number"
                                        label="Quantidade em estoque"
                                        variant="outlined"
                                        sx={{ width: "100%" }}
                                        {...register("estoque", {
                                            setValueAs: (value) => value == "" ? undefined : Number(value)
                                        })}
                                    />
                                    {
                                        errors.estoque && errors.estoque.message && (
                                            <FormText className="text-red-600">
                                                {
                                                    errors.estoque.message
                                                }
                                            </FormText>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4 mb-5">
                                <div className="flex flex-col w-full">
                                    <TextField
                                        type="number"
                                        label="Peso"
                                        variant="outlined"
                                        sx={{ width: "100%" }}
                                        {...register("weight", {
                                            setValueAs: (value) => value == "" ? undefined : Number(value)
                                        })}
                                    />
                                    {
                                        errors.weight && errors.weight.message && (
                                            <FormText className="text-red-600">
                                                {
                                                    errors.weight.message
                                                }
                                            </FormText>
                                        )
                                    }
                                </div>
                                <div className="flex flex-col w-full">
                                    <TextField
                                        label="Altura"
                                        type="number"
                                        sx={{ width: "100%" }}
                                        {...register("height", {
                                            setValueAs: (value) => value == "" ? undefined : Number(value)
                                        })}
                                    />
                                    {
                                        errors.height && errors.height.message && (
                                            <FormText className="text-red-600">
                                                {
                                                    errors.height.message
                                                }
                                            </FormText>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4 mb-5">
                                <div className="flex flex-col w-full">
                                    <TextField
                                        label="Largura"
                                        type="number"
                                        className="border border-zinc-500 rounded-md w-full p-2"
                                        sx={{ width: "100%" }}
                                        {...register("width", {
                                            setValueAs: (value) => value == "" ? undefined : Number(value)
                                        })}
                                    />
                                    {
                                        errors.width && errors.width.message && (
                                            <FormText className="text-red-600">
                                                {
                                                    errors.width.message
                                                }
                                            </FormText>
                                        )
                                    }
                                </div>

                                <div className="flex flex-col w-full">
                                    <TextField
                                        label="Diâmetro"
                                        type="number"
                                        className="border border-zinc-500 rounded-md w-full p-2"
                                        sx={{ width: "100%" }}
                                        {...register("diameter", {
                                            setValueAs: (value) => value == "" ? undefined : Number(value)
                                        })}
                                    />
                                    {
                                        errors.diameter && errors.diameter.message && (
                                            <FormText className="text-red-600">
                                                {
                                                    errors.diameter.message
                                                }
                                            </FormText>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="w-full mb-5">
                                <TextField
                                    type="number"
                                    label="Quantidade"
                                    variant="outlined"
                                    sx={{ width: "100%" }}
                                    {...register("length", {
                                        setValueAs: (value) => value == "" ? undefined : Number(value)
                                    })}
                                />
                                {
                                    errors.length && errors.length.message && (
                                        <FormText className="text-red-600">
                                            {
                                                errors.length.message
                                            }
                                        </FormText>
                                    )
                                }
                            </div>
                            <div className="w-full">
                                <Button
                                    variant="outlined"
                                    sx={{ width: "100%" }}
                                    onClick={closeModal}
                                    disabled={loading}
                                >
                                    Confirmar
                                </Button>
                            </div>
                        </Box>
                    </Modal>
                </form>
                <ToastContainer />
            </Box>
        </Modal>
    )
}