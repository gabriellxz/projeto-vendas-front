import ButtonDark from "../../../components/Button-dark/button-dark";

export default function Perfil() {
    return (
        <>
            <div className="flex items-center justify-between px-[55px] pt-[30px]">
                <span className="text-3xl uppercase font-bold">Minha conta</span>
                <button>
                    <ButtonDark text="Verificar meus pedidos"/>
                </button>
            </div>
        </>
    )
}