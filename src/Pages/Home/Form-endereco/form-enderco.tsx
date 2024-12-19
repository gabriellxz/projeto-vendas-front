import ButtonDark from "../../../components/Button-dark/button-dark";
import { toast, ToastContainer } from "react-toastify"
// import usePayment from "../../../hook/usePayment";
import '../../../global.css'
import { motion } from "framer-motion"
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { useContext, useState } from "react";
import axios from "axios";
import api from "../../../config/config";
import { UserAutenticado } from "../../../context/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { adressSchema } from "./adressSchema";
import FormText from "react-bootstrap/esm/FormText";

interface CEP {
    localidade: string;
    uf: string;
}

interface AdressType {
    CEP: string
    numero: string
    complemento: string
    ponto_de_referencia: string
    bairro: string
    estado: string
    cidade: string
    telefone_contato: string
    userId: number | undefined
    Rua: string
}

export default function FormEndereco() {

    const navigate = useNavigate()

    const { register, control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<AdressType>({
        defaultValues: {
            CEP: "",
            estado: "",
            cidade: "",
        },
        resolver: zodResolver(adressSchema)
    })
    const [loadingCep, setLoadingCep] = useState(false)
    const { user, token } = useContext(UserAutenticado)

    function redirect() {
        navigate("/home")
    }

    async function getCep(data: { CEP: string }) {
        setLoadingCep(true)

        try {
            const response = await axios.get(`https://viacep.com.br/ws/${data.CEP}/json/`)
            const enderecoResponse: CEP = response.data
            // console.log(response.data)
            if (enderecoResponse && enderecoResponse.localidade && enderecoResponse.uf) {
                setValue("estado", enderecoResponse.uf || "")
                setValue("cidade", enderecoResponse.localidade || "")
                setLoadingCep(false)
            } else {
                throw new Error("resposta inválida da API")
            }
        } catch (err) {
            setLoadingCep(false)
            console.log(err)

            toast.error("Houve um erro na busca do CEP", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

    }

    async function createAdress(data: AdressType) {

        const dataAdress: AdressType = {
            bairro: data.bairro,
            CEP: data.CEP,
            cidade: data.cidade,
            complemento: data.complemento,
            estado: data.estado,
            numero: data.numero,
            ponto_de_referencia: data.ponto_de_referencia,
            Rua: data.Rua,
            telefone_contato: data.telefone_contato,
            userId: user?.id
        }

        try {
            if (token) {
                api.post("/Endereco", dataAdress, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                }).then(() => {
                    toast.success("Houve um erro na busca do CEP", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                    navigate("/home/meus-endereços")

                }).catch(() => {
                    toast.error("Houve um erro na criação do endereço", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <motion.div className="flex justify-center p-5"
                initial={{
                    opacity: 0,
                    translateY: 160
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
            >
                <div className="absolute top- left-5">
                    <Button variant="outlined" onClick={redirect}>Voltar</Button>
                </div>
                <form className="max-w-[670px] w-full mt-5" onSubmit={handleSubmit(createAdress)}>
                    <div>
                        <h1 className="text-xl font-bold mb-2">Informações para entrega</h1>
                        <div className="bg-zinc-400 p-[0.5px] w-full"></div>
                    </div>
                    <div className="flex w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <Controller
                                name="CEP"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputMask
                                        mask="99999-999"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            const rawValue = e.target.value.replace(/\D/g, "");
                                            field.onChange(rawValue);
                                        }}
                                    >
                                        {(inputProps) => (
                                            <TextField
                                                label="CEP"
                                                {...inputProps}
                                                type="text"
                                                className="border border-zinc-500 rounded-md w-full p-2"
                                            />
                                        )}
                                    </InputMask>
                                )}
                            />
                            {
                                errors.CEP && errors.CEP.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.CEP.message === "string" && errors.CEP.message
                                        }
                                    </FormText>
                                )
                            }
                            <Button
                                variant="outlined"
                                type="button"
                                onClick={() => getCep({ CEP: getValues("CEP") })}
                                disabled={loadingCep}
                            >
                                Buscar CEP
                            </Button>
                        </div>
                    </div>
                    <div className="md:flex md:flex-row w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <TextField
                                placeholder="Cidade"
                                disabled
                                {...register("cidade")}
                                variant="outlined"
                            />
                            {
                                errors.cidade && errors.cidade.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.cidade.message === "string" && errors.cidade.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                        <div className="flex flex-col w-full">
                            <TextField
                                placeholder="Estado"
                                disabled
                                {...register("estado")}
                                variant="outlined"
                            />
                            {
                                errors.estado && errors.estado.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.estado.message === "string" && errors.estado.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                    </div>
                    <div className="md:flex md:flex-row w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <TextField
                                label="Bairro"
                                {...register("bairro")}
                                variant="outlined"
                            />
                            {
                                errors.bairro && errors.bairro.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.bairro.message === "string" && errors.bairro.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                        <div className="flex flex-col w-full">
                            <TextField
                                variant="outlined"
                                label="Número"
                                {...register("numero")}
                                type="number"
                            />
                            {
                                errors.numero && errors.numero.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.numero.message === "string" && errors.numero.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                    </div>
                    <div className="md:flex md:flex-row w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <TextField
                                label="Rua"
                                {...register("Rua")}
                                variant="outlined"
                            />
                            {
                                errors.Rua && errors.Rua.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.Rua.message === "string" && errors.Rua.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                    </div>
                    <div className="md:flex md:flex-row w-full gap-[20px] mt-5">
                        <div className="flex flex-col w-full">
                            <TextField
                                variant="outlined"
                                {...register("ponto_de_referencia")}
                                label="Ponto de referência"
                            />
                            {
                                errors.ponto_de_referencia && errors.ponto_de_referencia.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.ponto_de_referencia.message === "string" && errors.ponto_de_referencia.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                        <div className="flex flex-col w-full">
                            <TextField
                                variant="outlined"
                                {...register("complemento")}
                                label="Complemento"
                            />
                            {
                                errors.complemento && errors.complemento.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.complemento.message === "string" && errors.complemento.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-[20px] mt-5">
                        <Controller
                            name="telefone_contato"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <InputMask
                                    mask="99 999999999"
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/\D/g, "");
                                        field.onChange(rawValue);
                                    }}
                                >
                                    {(inputProps) => (
                                        <TextField
                                            label="Telefone"
                                            {...inputProps}
                                            type="text"
                                            className="border border-zinc-500 rounded-md w-full p-2"
                                        />
                                    )}
                                </InputMask>
                            )}
                        />
                        {
                            errors.telefone_contato && errors.telefone_contato.message && (
                                <FormText className="text-red-600">
                                    {
                                        typeof errors.telefone_contato.message === "string" && errors.telefone_contato.message
                                    }
                                </FormText>
                            )
                        }
                    </div>
                    <div className="mt-8">
                        <ButtonDark text="Continue" />
                    </div>
                </form>
            </motion.div>
            <ToastContainer />
        </>
    )
}