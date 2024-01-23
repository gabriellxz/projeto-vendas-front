import ButtonDark from "../Button-dark/button-dark";
import ButtonLight from "../Button-light/button-light";
import Input from "../Input/input";
import TitleForm from "../Title-form/title-form";
import data from '../../ddd.json'
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/config";
import useInputChange from "../../hook/useInputChange";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function FormCadastro() {

    const navigate = useNavigate()
    const {

        telefoneData,
        email,
        senha,
        nome,
        genero,
        handleEmailValue,
        handleGeneroValue,
        handleNomeInput,
        handleSenhaValue,
        handleTelefoneValue

    } = useInputChange()

    async function handleSubmit(e: any) {
        e.preventDefault()
        const Telefone = telefoneData.ddd + telefoneData.Telefone

        console.log(email)
        console.log(senha)
        console.log(Telefone)
        console.log(nome)
        console.log(genero)


        const data = {
            email,
            senha,
            nome,
            Telefone,
            genero
        }

        await api.post("/registrar", data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            console.log(response)

            if (response.status === 201) {
                setTimeout(() => {
                    navigate("/")
                }, 3000)
                
                toast.success("Usuário cadastrado com sucesso!")
            }

        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            <form className="max-w-[600px] w-full m-5" onSubmit={handleSubmit}>
                <div className="mb-10">
                    <TitleForm text={"cadastro"} />
                </div>
                <div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"email"} inputLabel={"Email"} styleWidth={"w-full"} name={"email"} value={email} onInputValue={handleEmailValue} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"password"} inputLabel={"Senha"} styleWidth={"w-full"} name={"senha"} value={senha} onInputValue={handleSenhaValue} />
                        </div>
                        <div className="flex gap-5">
                            <div className="flex flex-col max-w-[108px] w-full">
                                <span className="text-xl">DDD</span>
                                <select name="ddd" id="" value={telefoneData.ddd} onChange={handleTelefoneValue} className="border border-1 border-black outline-none p-2 max-w-[108px] w-full">
                                    <option>DDD</option>
                                    {
                                        data.dddsPorEstado.map((ddd: string) => (
                                            <option>{ddd}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="w-full">
                                <Input typeInput={"tel"} inputLabel={"Telefone"} styleWidth={"w-full"} name={"Telefone"} value={telefoneData.Telefone} onInputValue={handleTelefoneValue} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"text"} inputLabel={"Nome completo"} styleWidth={"w-full"} name={"nome"} value={nome} onInputValue={handleNomeInput} />
                        </div>
                        <div className="flex flex-col mt-5">
                            <span className="text-xl">Sexo</span>
                            <div className="flex flex-col gap-5 mt-5 sm:flex sm:flex-row">
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="gender" value={"feminino"} onChange={handleGeneroValue} className="w-[40px] h-[40px] border border-1 border-black" />
                                    Feminino
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="gender" value={"masculino"} onChange={handleGeneroValue} className="w-[40px] h-[40px] border border-1 border-black" />
                                    Masculino
                                </div>
                                <div className="flex items-center gap-3">
                                    <input type="radio" name="gender" value={"outro"} onChange={handleGeneroValue} className="w-[40px] h-[40px] border border-1 border-black" />
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
            <ToastContainer />
        </>
    )
}