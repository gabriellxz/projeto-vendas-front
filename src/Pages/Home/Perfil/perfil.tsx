import ButtonDark from "../../../components/Button-dark/button-dark";
import { useContext, useState } from "react";
import { UserAutenticado } from "../../../context/authContext";
import IconEdit from "../../../svg/icon-edit";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import api from "../../../config/config";
import { Button, TextField } from "@mui/material";
import Loading from "../../../components/Loading/loading";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { userSchema } from "./schemaProfile";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserFormData {
    name: string
    email: string
    cpf: string
    phone: string
}

export default function Perfil() {

    const { user, token } = useContext(UserAutenticado);

    const [isEditTable, setIsEditTable] = useState(false)
    const [loading, setLoading] = useState(false)

    const { register, control, handleSubmit } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: user?.telefone,
            cpf: user?.CPF
        }
    })

    function toggleEdit() {
        setIsEditTable((prevState) => !prevState)
    }

    async function editProfile(data: UserFormData) {


        const dataUser = {
            nome: data.name,
            email: data.email,
            Telefone: data.phone,
            CPF: data.cpf
        }

        setLoading(true)

        try {
            if (token) {
                const response = await api.put(`/users/${user?.id}`, dataUser, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                console.log(data)
                setLoading(false)
                console.log(response)
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    return (
        <motion.div className="px-[55px] pt-[30px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="flex flex-col items-center justify-between sm:flex-row gap-5">
                <span className="text-3xl uppercase font-bold">Minha conta</span>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Link to={"/home/meus-endereços"}>
                        <ButtonDark text="Meus endereços" />
                    </Link>
                    <Link to={"/home/meus-pedidos"}>
                        <ButtonDark text="Verificar meus pedidos" />
                    </Link>
                </div>
            </div>
            <form className="mt-[50px] border border-zinc-500 rounded-[10px] shadow-md shadow-zinc-300">
                <div className="flex items-center justify-between border border-b-zinc-500 px-[50px] py-2">
                    <span className="uppercase text-2xl">Dados pessoais</span>
                    <button type="button" className="bg-greenEco-200 p-2 rounded-[5px]" onClick={toggleEdit}>
                        <IconEdit style="text-white w-[30px] h-[30px]" />
                    </button>
                </div>
                <div className="px-[40px] py-8">
                    <div className="flex flex-col sm:flex-row w-full gap-5 mb-[40px]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full">
                            <span>Nome</span>
                            <TextField
                                disabled={!isEditTable}
                                type="text"
                                {...register("name")}
                                className="border border-zinc-500 rounded-md w-full p-2"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full">
                            <span>Telefone</span>
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputMask
                                        mask="99 999999999"
                                        disabled={!isEditTable}
                                        {...field}
                                    >
                                        {(inputProps) => (
                                            <TextField
                                                {...inputProps}
                                                // disabled={!isEditTable}
                                                type="text"
                                                className="border border-zinc-500 rounded-md w-full p-2"
                                            />
                                        )}
                                    </InputMask>
                                )}
                            />
                        </div>
                        { }
                    </div>
                    <div className="flex flex-col sm:flex-row w-full gap-5 mb-[40px]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full">
                            <span>Email</span>
                            <TextField
                                disabled={!isEditTable}
                                type="text"
                                {...register("email")}
                                className="border border-zinc-500 rounded-md w-full p-2"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full">
                            <span>CPF/CNPJ</span>
                            <Controller
                                name="cpf"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputMask
                                        mask="999.999.999-99"
                                        disabled={!isEditTable}
                                        {...field}
                                    >
                                        {(inputProps) => (
                                            <TextField
                                                {...inputProps}
                                                // disabled={!isEditTable}
                                                type="text"
                                                className="border border-zinc-500 rounded-md w-full p-2"
                                            />
                                        )}
                                    </InputMask>
                                )}
                            />
                        </div>
                    </div>
                </div>
                {
                    loading ? <Loading /> : (
                        <div className="flex justify-end p-3">
                            {isEditTable && <Button variant="outlined" type="submit" onClick={handleSubmit(editProfile)}>Salvar</Button>}
                        </div>
                    )
                }
            </form>
        </motion.div>
    )
}