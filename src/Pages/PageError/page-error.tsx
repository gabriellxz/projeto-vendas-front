import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import logo from "../../assets/yeshuá.svg"

export default function PageErrorPayment() {
    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <div className="flex gap-5">
                <ExclamationCircleIcon className="w-[100px] text-red-700" />
                <img src={logo} alt="logo" className="max-w-[120px] w-full" />
            </div>
            <p className="text-3xl uppercase">
                Ocorreu um erro ao efetuar o pagamento!
            </p>
        </div>
    )
}