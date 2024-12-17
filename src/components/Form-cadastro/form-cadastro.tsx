import ButtonLight from "../Button-light/button-light";
import TitleForm from "../Title-form/title-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import api from "../../config/config";
import { useContext, useState } from "react";
import { UserAutenticado } from "../../context/authContext";
import InputMask from "react-input-mask";
import ButtonDark from "../Button-dark/button-dark";
import Loading from "../Loading/loading";
import FormText from "react-bootstrap/esm/FormText";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./registerSchema";
import { AxiosError } from "axios";

interface TypeRegister {
    nome: string
    email: string
    senha: string
    Telefone: string
    genero: string
    CPF: string
}

export default function FormCadastro() {

    const { cadastro } = useContext(UserAutenticado)
    const navigate = useNavigate()
    const { register, control, handleSubmit, formState: { errors } } = useForm<TypeRegister>({
        resolver: zodResolver(registerSchema)
    })
    const [loading, setLoading] = useState(false)

    async function singUp(data: TypeRegister) {

        setLoading(true)

        const dataUser = {
            nome: data.nome,
            email: data.email,
            senha: data.senha,
            Telefone: data.Telefone,
            genero: data.genero,
            CPF: data.CPF
        }

        try {
            await api.post("/registrar", dataUser, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                const tokenAccess = response.data.accessToken
                cadastro(tokenAccess)
                navigate("/home")

                toast.success("Cadastro feito com sucesso!", {
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
            }).catch((error: AxiosError) => {
                console.log(error)

                if (error.response?.status === 404) {
                    toast.error("Este usuário já existe", {
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

                setLoading(false)
            })


        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <>
            <form className="max-w-[600px] w-full m-5" onSubmit={handleSubmit(singUp)}>
                <div className="mb-10">
                    <TitleForm text={"cadastro"} />
                </div>
                <div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <TextField
                                label="Email"
                                {...register("email")}
                                variant="outlined"
                            />
                            {
                                errors.email && errors.email.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.email.message === "string" && errors.email.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <TextField
                                label="Senha"
                                {...register("senha")}
                                variant="outlined"
                                type="password"
                            />
                            {
                                errors.senha && errors.senha.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.senha.message === "string" && errors.senha.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <Controller
                                name="CPF"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputMask
                                        mask="99999999999"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            const rawValue = e.target.value.replace(/\D/g, ""); 
                                            field.onChange(rawValue); 
                                        }}
                                    >
                                        {(inputProps) => (
                                            <TextField
                                                label="CPF"
                                                {...inputProps}
                                                type="text"
                                                className="border border-zinc-500 rounded-md w-full p-2"
                                            />
                                        )}
                                    </InputMask>
                                )}
                            />
                            {
                                errors.CPF && errors.CPF.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.CPF.message === "string" && errors.CPF.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-5">
                            <Controller
                                name="Telefone"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputMask
                                        mask="99999999999"
                                        {...field}
                                        value={field.value || ""}
                                        onChange={(e) => {
                                            const rawValue = e.target.value.replace(/\D/g, ""); // Remove máscara
                                            field.onChange(rawValue); // Atualiza o valor sem máscara
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
                                errors.Telefone && errors.Telefone.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.Telefone.message === "string" && errors.Telefone.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <TextField
                                label="Nome"
                                {...register("nome")}
                                variant="outlined"
                            />
                            {
                                errors.nome && errors.nome.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.nome.message === "string" && errors.nome.message
                                        }
                                    </FormText>
                                )
                            }
                        </div>
                        <FormControl className="mt-5">
                            <FormLabel id="label-radio-gender">Sexo</FormLabel>
                            {
                                errors.genero && errors.genero.message && (
                                    <FormText className="text-red-600">
                                        {
                                            typeof errors.genero.message === "string" && errors.genero.message
                                        }
                                    </FormText>
                                )
                            }
                            <RadioGroup
                                aria-labelledby="label-radio-gender"
                            >
                                <div className="flex items-center gap-3">
                                    <FormControlLabel
                                        control={<Radio />}
                                        label={"Feminino"}
                                        value={"feminino"}
                                        {...register("genero")}
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <FormControlLabel
                                        control={<Radio />}
                                        label={"Masculino"}
                                        value={"masculino"}
                                        {...register("genero")}
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <FormControlLabel
                                        control={<Radio />}
                                        label={"Outro"}
                                        value={"outro"}
                                        {...register("genero")}
                                    />
                                </div>
                            </RadioGroup>
                        </FormControl>
                        <div className="text-center">
                            {
                                loading ? <Loading />
                                    :
                                    <ButtonDark text={"cadastrar"} />
                            }
                            <div className="bg-zinc-400 p-[0.4px] w-full"></div>
                        </div>
                        <div>
                            <div className="flex justify-center mb-3">
                                <span>Já possui uma conta?</span>
                            </div>
                            <Link to={"/"}>
                                <ButtonLight text={"Entrar"} />
                            </Link>
                        </div>
                    </div>
                </div>

            </form>
            <ToastContainer />
        </>
    )
}