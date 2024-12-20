import ButtonDark from "../../../components/Button-dark/button-dark";
import { useContext, useState } from "react";
import { UserAutenticado } from "../../../context/authContext";
import IconEdit from "../../../svg/icon-edit";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import api from "../../../config/config";
import { Button, FormControlLabel, FormGroup, Radio, RadioGroup, TextField } from "@mui/material";
import Loading from "../../../components/Loading/loading";
import { Controller, useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { userSchema } from "./schemaProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface UserFormData {
    name: string
    email: string
    cpf: string
    phone: string
    genero: string
}

export default function Perfil() {

    const { user, token, setUser } = useContext(UserAutenticado);

    const [isEditTable, setIsEditTable] = useState(false)
    const [loading, setLoading] = useState(false)

    const { register, control, handleSubmit } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
            phone: user?.telefone,
            cpf: user?.CPF,
            genero: user?.genero
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
                const response: AxiosResponse = await api.put(`/users/${user?.id}`, dataUser, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                // console.log(data)
                setLoading(false)
                // console.log(response)

                if (response.data) {
                    setUser({
                        ...user,
                        name: data.name,
                        CPF: data.cpf,
                        email: data.email,
                        genero: data.genero,
                        telefone: data.phone
                    })

                    toast.success("Informações editadas com sucesso!", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                    setIsEditTable(!isEditTable)
                }
            }
        } catch (e) {
            console.log(e)
            setLoading(false)

            toast.error("Houve um erro ao editar as suas informações", {
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
                    <div className="w-full flex gap-3 mb-5">
                        <TextField
                            variant="outlined"
                            {...register("name")}
                            label="Nome"
                            sx={{ width: "100%" }}
                            disabled={!isEditTable}
                        />

                        <TextField
                            variant="outlined"
                            {...register("email")}
                            label="Email"
                            sx={{ width: "100%" }}
                            disabled={!isEditTable}
                        />
                    </div>
                    <div className="w-full flex gap-3 mb-5">
                        <Controller
                            name="cpf"
                            control={control}
                            defaultValue={user?.CPF}
                            render={({ field }) => (
                                <InputMask
                                    disabled={!isEditTable}
                                    mask="999.999.999-99"
                                    {...field}
                                    value={field.value || ""}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/\D/g, ""); // Remove máscara
                                        field.onChange(rawValue); // Atualiza o valor sem máscara
                                    }}
                                >
                                    {(inputProps) => (
                                        <TextField
                                            variant="outlined"
                                            {...inputProps}
                                            label="CPF"
                                            type="text"
                                            sx={{ width: "100%" }}
                                        />
                                    )}
                                </InputMask>
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue={user?.telefone}
                            render={({ field }) => (
                                <InputMask
                                    disabled={!isEditTable}
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
                                            variant="outlined"
                                            {...inputProps}
                                            label="Telefone"
                                            type="text"
                                            sx={{ width: "100%" }}
                                        />
                                    )}
                                </InputMask>
                            )}
                        />
                    </div>
                    <div className="w-full flex gap-3 mb-5">
                        <FormGroup>
                            <RadioGroup
                                row
                                defaultValue={user?.genero}
                                {...register("genero")}
                            >
                                <FormControlLabel
                                    control={<Radio />}
                                    label="Feminino"
                                    value="feminino"
                                    
                                />
                                <FormControlLabel
                                    control={<Radio />}
                                    label="Masculino"
                                    value="masculino"
                                />
                                <FormControlLabel
                                    control={<Radio />}
                                    label="Outro"
                                    value="outro"
                                />
                            </RadioGroup>
                        </FormGroup>
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