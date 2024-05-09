import Pedidos from "../../types/pedidos";

interface PropsDetails {
    details?: Pedidos;
}

export default function InforClient(props: PropsDetails) {

    return (
        <>
            <div className="mt-8 flex flex-col gap-7 py-5">
                <div className="flex w-full gap-8">
                    <div className="flex items-center gap-5 w-full">
                        <span className="font-semibold">Nome</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.users.nome}</span>
                    </div>
                    <div className="flex items-center gap-5 w-full">
                        <span className="font-semibold">Telefone</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.adress.telefone_contato}</span>
                    </div>
                </div>
                <div className="flex w-full gap-8 border-b border-zinc-500 pb-9">
                    <div className="flex items-center gap-5 w-full">
                        <span className="font-semibold">Email</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.users.email}</span>
                    </div>
                    <div className="flex items-center gap-5 w-full">
                        <span className="font-semibold">CPF/CNPJ</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">1234-1234</span>
                    </div>
                </div>
                <div className="flex w-full gap-8">
                    <div className="flex items-center w-full gap-5">
                        <span className="font-semibold">CEP</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.adress.CEP}</span>
                    </div>
                    <div className="flex items-center w-full gap-5">
                        <span className="font-semibold">Cidade</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.adress.cidade}</span>
                    </div>
                    <span className="flex items-center w-full gap-5">
                        <span className="font-semibold">Bairro</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.adress.bairro}</span>
                    </span>
                </div>
                <div className="flex w-full gap-8">
                    <div className="flex w-full gap-5 items-center">
                        <span className="font-semibold">Endereço</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.adress.complemento}</span>
                    </div>
                    <div className="flex w-full gap-5 items-center">
                        <span className="font-semibold">Número</span>
                        <span className="border border-zinc-500 rounded-md w-full p-2">{props.details?.adress.numero}</span>
                    </div>
                </div>
            </div>
        </>
    )
}