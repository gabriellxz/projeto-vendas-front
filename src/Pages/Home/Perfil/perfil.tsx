import ButtonDark from "../../../components/Button-dark/button-dark";
import { useContext, useState } from "react";
import { UserAutenticado } from "../../../context/authContext";
import IconEdit from "../../../svg/icon-edit";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

export default function Perfil() {

    const { user } = useContext(UserAutenticado);

    const [isEditTable, setIsEditTable] = useState(false)

    function toggleEdit() {
        setIsEditTable((prevState) => !prevState)
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
            <div className="mt-[50px] border border-zinc-500 rounded-[10px] shadow-md shadow-zinc-300">
                <div className="flex items-center justify-between border border-b-zinc-500 px-[50px] py-2">
                    <span className="uppercase text-2xl">Dados pessoais</span>
                    <button className="bg-greenEco-200 p-2 rounded-[5px]">
                        <IconEdit style="text-white w-[30px] h-[30px]" onClickEdit={toggleEdit}/>
                    </button>
                </div>
                <div className="px-[40px] py-8">
                    <div className="flex flex-col sm:flex-row w-full gap-5 mb-[40px]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full">
                            <span>Nome</span>
                            <input disabled={!isEditTable} type="text" value={user?.name} className="border border-zinc-500 rounded-md w-full p-2" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full">
                            <span>Telefone</span>
                            <input disabled={!isEditTable} type="text" value={user?.telefone} className="border border-zinc-500 rounded-md w-full p-2" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full gap-5 mb-[40px]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full">
                            <span>Email</span>
                            <input disabled={!isEditTable} type="text" value={user?.email} className="border border-zinc-500 rounded-md w-full p-2" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 w-full">
                            <span>CPF/CNPJ</span>
                            <input disabled={!isEditTable} type="text" value={user?.CPF} className="border border-zinc-500 rounded-md w-full p-2" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}