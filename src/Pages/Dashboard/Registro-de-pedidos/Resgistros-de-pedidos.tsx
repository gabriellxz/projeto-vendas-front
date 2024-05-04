import CardDashboard from "../../../components/Cards-dashboard/cards-dashboard";
import LayoutPedidos from "../../../components/Layout-pedidos/layout-pedidos";

export default function RegistroDePedidos() {
    return (
        <>
            <div>
                <div>
                    <h1 className="text-3xl font-bold">Registro de pedidos</h1>
                    <span className="flex gap-5">
                        <span>Registro de pedidos</span> &gt;
                    </span>
                </div>
                <div className="flex gap-[28px]">
                    <LayoutPedidos />
                    <div className="flex flex-col gap-[75px] mt-[30px] max-w-[380px] w-full">
                        <CardDashboard/>
                    </div>
                </div>
            </div>
        </>
    )
}