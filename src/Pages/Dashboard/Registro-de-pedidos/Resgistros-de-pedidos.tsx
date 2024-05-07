import CardDashboard from "../../../components/Cards-dashboard/cards-dashboard";
import LayoutPedidos from "../../../components/Layout-pedidos/layout-pedidos";
import TopDashboard from "../../../components/Top-dashboard/top-dashboard"

export default function RegistroDePedidos() {

    

    return (
        <>
            <div>
                <TopDashboard title={"Registro de pedidos"} titleRoute={"Registro de pedidos"} />
                <div className="flex gap-[28px] select-none">
                    <LayoutPedidos/>
                    <div className="flex flex-col gap-[20px] mt-[30px] max-w-[380px] w-full">
                        <CardDashboard />
                    </div>
                </div>
            </div>
        </>
    )
}