import { CheckCircleIcon } from "@heroicons/react/16/solid";
import logo from "../../assets/yeshuá.svg"

export default function PageSuccess() {
    return(
        <div className="flex justify-center items-center flex-col h-screen">
            <div className="flex gap-5">
                <CheckCircleIcon className="w-[100px] text-green-700"/>
                <img src={logo} alt="logo" className="max-w-[120px] w-full"/>
            </div>
            <p className="text-3xl uppercase text-center">
                Pagamento efetuado com sucesso!
            </p>
        </div>
    );
}