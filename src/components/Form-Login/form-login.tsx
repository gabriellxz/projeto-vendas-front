import { Link } from "react-router-dom";
import ButtonDark from "../Button-dark/button-dark";
import ButtonLight from "../Button-light/button-light";
import Input from "../Input/input";
import TitleForm from "../Title-form/title-form";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loading from "../Loading/loading";
import useLogin from "../../hook/useLogin";

export default function FormLogin() {

    // const { email, senha, handleEmailValue, handleSenhaValue } = useInputChange()
    const {
        handleSubmit,
        validation,
        handleEmailValue,
        handleSenhaValue,
        senha,
        email
    } = useLogin()

    return (
        <>
            <form className="max-w-[600px] w-full m-5" onSubmit={handleSubmit}>
                <div className="mb-10">
                    <TitleForm text={"entrar"} />
                </div>
                <div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"email"} inputLabel={"Email"} styleWidth={"w-full"} name="email" value={email} onInputValue={handleEmailValue} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div>
                                <Input typeInput={"password"} inputLabel={"Senha"} styleWidth={"w-full"} name="senha" value={senha} onInputValue={handleSenhaValue} />
                                
                            </div>
                            <div>
                                <Link to={"/forget"} className="text-greenEco-100">Esqueceu sua senha?</Link>
                            </div>
                        </div>
                        <div className="text-center">
                            {
                                validation.loading ? <Loading />
                                    :
                                    <ButtonDark text={"sign in"} />
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