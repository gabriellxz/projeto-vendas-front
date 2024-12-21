import { Link, useNavigate } from "react-router-dom";
import ButtonDark from "../Button-dark/button-dark";
import ButtonLight from "../Button-light/button-light";
import TitleForm from "../Title-form/title-form";
import Form from "react-bootstrap/Form"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from "../Loading/loading";
import { useForm } from "react-hook-form";
import api from "../../config/config";
import { useContext, useState } from "react";
import { UserAutenticado } from "../../context/authContext";
import { TextField } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./loginSchema";
import { AxiosError } from "axios";

interface TypeLogin {
    email: string
    senha: string
}

export default function FormLogin() {

    const { login } = useContext(UserAutenticado)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<TypeLogin>({
        resolver: zodResolver(loginSchema)
    })
    const [loading, setLoading] = useState(false)


    async function signIn(data: TypeLogin) {

        setLoading(true)

        try {
            await api.post("/login", data, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                const tokenAccess = response.data.accessToken
                login(tokenAccess)
                navigate("/")
                setLoading(false)
            }).catch((error: AxiosError) => {
                if (error.response?.status === 401) {
                    toast.error("Email ou senha incorretos", {
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
            })


        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <>
            <form className="max-w-[600px] w-full m-5" onSubmit={handleSubmit(signIn)}>
                <div className="mb-10">
                    <TitleForm text={"entrar"} />
                </div>
                <div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <TextField
                                type="text"
                                label="Email"
                                {...register("email")}
                                variant="outlined"
                            />
                            {
                                errors.email && errors.email.message && (
                                    <Form.Text className="text-red-600">
                                        {
                                            typeof errors.email.message === "string" && errors.email.message
                                        }
                                    </Form.Text>
                                )
                            }
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <TextField
                                    type="password"
                                    label="senha"
                                    {...register("senha")}
                                    variant="outlined"
                                    sx={{ width: "100%" }}
                                />
                                {
                                    errors.senha && errors.senha.message && (
                                        <Form.Text className="text-red-600">
                                            {
                                                typeof errors.senha.message === "string" && errors.senha.message
                                            }
                                        </Form.Text>
                                    )
                                }
                            </div>
                            <div>
                                <Link to={"/forget"} className="text-greenEco-100">Esqueceu sua senha?</Link>
                            </div>
                        </div>
                        <div className="text-center">
                            {
                                loading ? <Loading />
                                    :
                                    <ButtonDark text={"entrar"} />
                            }
                            <div className="bg-zinc-400 p-[0.4px] w-full"></div>
                        </div>
                        <div>
                            <div className="flex justify-center mb-3">
                                <span>Não possui uma conta?</span>
                            </div>
                            <Link to={"/cadastro"}>
                                <ButtonLight text={"Criar uma conta"} />
                            </Link>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </form>
        </>
    )
}