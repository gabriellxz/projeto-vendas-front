import { useContext, useState } from "react";
import { UserAutenticado } from "../../../context/authContext";
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom";
import api from "../../../config/config";
import { useForm } from "react-hook-form";
import { userSchema } from "./schemaProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Footer from "../../../components/Footer/footer";

interface UserFormData {
    name: string
    email: string
    cpf: string
    phone: string
    genero: string
}

export default function Perfil() {

    const navigate = useNavigate()
    const { user, token, setUser } = useContext(UserAutenticado);

    const [isEditTable, setIsEditTable] = useState(true)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, watch } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: user?.telefone,
            cpf: user?.CPF,
            genero: user?.genero || "genero"
        }
    })

    const generoSelected = watch("genero")
    // console.log(errors)

    const editUser = async (data: UserFormData) => {
        // console.log(data)
        console.log(loading)

        setLoading(true)

        const dataUser = {
            nome: data.name,
            Telefone: data.phone,
            genero: data.genero,
            CPF: data.cpf,
            email: data.email
        }

        // console.log(data.genero)

        try {
            if (token) {
                const response = await api.put(`/users/${user?.id}`, dataUser, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                setLoading(false)
                setIsEditTable(!isEditTable)

                if (response.data) {
                    setUser({
                        ...user,
                        name: data.name,
                        CPF: data.cpf,
                        email: data.email,
                        genero: generoSelected,
                        telefone: data.phone
                    })

                    console.log(response)
                }

            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <>
            <motion.div className="p-5 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div>
                    {
                        isEditTable ? (
                            <button className="flex items-center gap-5 uppercase" onClick={() => navigate("/")}>
                                <ArrowLeftIcon className="w-[18px]" />
                                Voltar
                            </button>
                        ) : (
                            <button className="flex items-center gap-5 uppercase" onClick={() => setIsEditTable(!isEditTable)}>
                                <ArrowLeftIcon className="w-[18px]" />
                                Dados pessoais
                            </button>
                        )
                    }
                </div>
                <div className="mt-[30px] flex w-full">
                    <div className="w-[25%] hidden sm:flex">
                        <p>Olá, {user?.name}</p>
                        <ul>

                        </ul>
                    </div>
                    <div className="w-full">
                        <div className="flex items-center justify-between sm:max-w-[800px]">
                            <h1 className="text-3xl font-jura">
                                {isEditTable ? <h1>Dados pessoais</h1> : <h1>Editar dados pessoais</h1>}
                            </h1>
                            {
                                isEditTable && <button
                                    onClick={() => setIsEditTable(!isEditTable)}
                                    className="bg-greenEco-300 px-5 p-1 max-w-[200px] w-full text-white font-semibold"
                                    type="button"
                                >
                                    Editar
                                </button>
                            }
                        </div>
                        <form onSubmit={handleSubmit(editUser)} className="border border-1 border-zinc-300 p-5 space-y-[50px] sm:space-y-0 sm:gap-[50px] mt-5 sm:grid sm:grid-cols-2 sm:max-w-[800px] w-full">
                            <div>
                                <span className={`${!isEditTable && "text-greenEco-200 uppercase text-sm"} font-bold`}>Nome</span>
                                {
                                    isEditTable ? (
                                        <p className="text-zinc-400 px-2">{user?.name}</p>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                className={`${errors.name ? "border border-1 border-red-600" : "border border-1 border-zinc-400"}  w-full p-1 outline-none`}
                                                {...register("name")}
                                            />
                                            {
                                                errors.name && errors.name.message && (
                                                    <p className="text-red-600">
                                                        {
                                                            typeof errors.name.message === "string" && errors.name.message
                                                        }
                                                    </p>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <span className={`${!isEditTable && "text-greenEco-200 uppercase text-sm"} font-bold`}>Email</span>
                                {
                                    isEditTable ? (
                                        <p className="text-zinc-400 px-2">{user?.email}</p>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                className={`${errors.email ? "border border-1 border-red-600" : "border border-1 border-zinc-400"}  w-full p-1 outline-none`}
                                                {...register("email")}
                                            />
                                            {
                                                errors.email && errors.email.message && (
                                                    <p className="text-red-600">
                                                        {
                                                            typeof errors.email.message === "string" && errors.email.message
                                                        }
                                                    </p>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <span className={`${!isEditTable && "text-greenEco-200 uppercase text-sm"} font-bold`}>CPF</span>
                                {
                                    isEditTable ? (
                                        <p className="text-zinc-400 px-2">{user?.CPF}</p>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                className={`${errors.cpf ? "border border-1 border-red-600" : "border border-1 border-zinc-400"}  w-full p-1 outline-none`}
                                                {...register("cpf")}
                                            />
                                            {
                                                errors.cpf && errors.cpf.message && (
                                                    <p className="text-red-600">
                                                        {
                                                            typeof errors.cpf.message === "string" && errors.cpf.message
                                                        }
                                                    </p>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <span className={`${!isEditTable && "text-greenEco-200 uppercase text-sm"} font-bold`}>Genêro</span>
                                {
                                    isEditTable ? (
                                        <p className="text-zinc-400 px-2">{user?.genero}</p>
                                    ) : (
                                        <div>
                                            <select
                                                className={`${errors.genero ? "border border-1 border-red-600" : "border border-1 border-zinc-400"}  w-full p-1 outline-none`}
                                                {...register("genero")}
                                            >
                                                <option value="genero" disabled>Genêro</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="feminino">Feminino</option>
                                                <option value="outro">Outro</option>
                                            </select>
                                            {
                                                errors.genero && errors.genero.message && (
                                                    <p className="text-red-600">
                                                        {
                                                            typeof errors.genero.message === "string" && errors.genero.message
                                                        }
                                                    </p>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div>
                                <span className={`${!isEditTable && "text-greenEco-200 uppercase text-sm"} font-bold`}>Telefone</span>
                                {
                                    isEditTable ? (
                                        <p className="text-zinc-400 px-2">{user?.telefone}</p>
                                    ) : (
                                        <div>
                                            <input
                                                type="text"
                                                className={`${errors.name ? "border border-1 border-red-600" : "border border-1 border-zinc-400"}  w-full p-1 outline-none`}
                                                {...register("phone")}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                            <div className="flex justify-end">
                                {
                                    !isEditTable && <button
                                        className="bg-greenEco-300 px-5 p-1 max-w-[200px] w-full text-white font-semibold"
                                        type="submit"
                                    >
                                        Salvar alterações
                                    </button>
                                }
                            </div>
                        </form>
                    </div>
                </div>

            </motion.div>
            <Footer />
        </>
    )
}