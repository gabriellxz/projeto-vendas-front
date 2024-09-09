import { MapPinIcon } from "@heroicons/react/16/solid";
import useEndereco from "../../../hook/useEndereco"
import Endereco from "../../../types/endereco";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Enderecos() {

    const { endereco, deleteEndereco } = useEndereco();

    

    return (
        <div>
            {
                endereco.map((e: Endereco) => (
                    <div key={e.id} className="bg-zinc-100 my-2 flex justify-between items-center p-5">
                        <div className="flex gap-5 ">
                            <div>
                                <MapPinIcon className="w-[50px]" />
                            </div>
                            <div>
                                <div>
                                    <span>{`${e.bairro}, ${e.numero}`}</span>
                                </div>
                                <div className="font-bold flex flex-col">
                                    <span>{`${e.Rua}, ${e.cidade}, ${e.CEP}`}</span>
                                    <span>+{e.telefone_contato}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link to={`/home/editar-endereço/${e.id}`} className="text-blue-600 text-xl cursor-pointer">Editar</Link>
                            <span onClick={() => deleteEndereco(e.id)} className="text-red-600 text-xl cursor-pointer">Excluir</span>
                        </div>
                    </div>
                ))
            }
            <ToastContainer/>
        </div>
    )
}