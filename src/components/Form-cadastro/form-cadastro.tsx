import ButtonDark from "../Button-dark/button-dark";
import ButtonLight from "../Button-light/button-light";
import Input from "../Input/input";
import TitleForm from "../Title-form/title-form";
import data from '../../ddd.json'
import { Link } from "react-router-dom";

export default function FormCadastro() {

    return (
        <>
            <form className="max-w-[600px] w-full m-5">
                <div className="mb-10">
                    <TitleForm text={"cadastro"} />
                </div>
                <div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"email"} inputLabel={"Email"} styleWidth={"w-full"} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"password"} inputLabel={"Senha"} styleWidth={"w-full"} />
                        </div>
                        <div className="flex gap-5">
                            <div className="flex flex-col max-w-[108px] w-full">
                                <span className="text-xl">DDD</span>
                                <select name="" id="" className="border border-1 border-black outline-none p-2 max-w-[108px] w-full">
                                    {
                                        data.dddsPorEstado.map((ddd: string, index: number) => (
                                            <option key={index}>{ddd}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-full">
                                <Input typeInput={"tel"} inputLabel={"Telefone"} styleWidth={"w-full"} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"text"} inputLabel={"Nome completo"} styleWidth={"w-full"} />
                        </div>
                        <div className="flex flex-col mt-5">
                            <span className="text-xl">Sexo</span>
                            <div className="flex flex-col gap-5 mt-5 sm:flex sm:flex-row">
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="gender" className="w-[40px] h-[40px] border border-1 border-black" />
                                    Feminino
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="gender" className="w-[40px] h-[40px] border border-1 border-black" />
                                    Masculino
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="gender" className="w-[40px] h-[40px] border border-1 border-black" />
                                    Outro
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <ButtonDark text={"cadastrar"} />
                            <div className="bg-zinc-400 p-[0.4px] w-full"></div>
                        </div>
                        <div>
                            <div className="flex justify-center mb-3">
                                <span>Ja possui uma conta?</span>
                            </div>
                            <Link to={"/"}>
                                <ButtonLight text={"Entrar"} />
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}