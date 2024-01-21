import ButtonDark from "../Button-dark/button-dark";
import ButtonLight from "../Button-light/button-light";
import Input from "../Input/input";
import TitleForm from "../Title-form/title-form";

export default function FormLogin() {
    return (
        <>
            <form className="max-w-[600px] w-full m-5">
                <div className="mb-10">
                    <TitleForm text={"entrar"}/>
                </div>
                <div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"email"} inputLabel={"Email"} styleWidth={"w-full"}/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input typeInput={"password"} inputLabel={"Senha"} styleWidth={"w-full"}/>
                            <div>
                                <span>Esqueceu sua senha?</span>
                            </div>
                        </div>
                        <div className="">
                            <ButtonDark text={"sign in"}/>
                            <div className="bg-zinc-400 p-[0.4px] w-full"></div>
                        </div>
                        <div>
                            <div className="flex justify-center mb-3">
                                <span>Não possui uma conta?</span>
                            </div>
                            <div>
                                <ButtonLight text={"Criar uma conta"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}