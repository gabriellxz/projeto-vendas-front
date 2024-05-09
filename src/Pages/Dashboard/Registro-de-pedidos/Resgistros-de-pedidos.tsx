import CardDashboard from "../../../components/Cards-dashboard/cards-dashboard";
import LayoutPedidos from "../../../components/Layout-pedidos/layout-pedidos";
import TopDashboard from "../../../components/Top-dashboard/top-dashboard";
import usePedidos from "../../../hook/usePedidos";


export default function RegistroDePedidos() {

    const { orderUser } = usePedidos()

    return (
        <>
            <div>
                <TopDashboard title={"Registro de pedidos"} titleRoute={"Registro de pedidos"} />
                <div className="flex gap-[28px] select-none">
                    <LayoutPedidos
                        titleLayout="Pedidos"
                        th1={"Cliente"}
                        th2={"Data"}
                        th3={"Status"}
                        styleTable={""}
                    />
                    <div className="flex flex-col gap-[20px] mt-[30px] max-w-[380px] w-full">
                        <CardDashboard
                            titleCard1={"Pedidos"}
                            titleCard2={"Clientes"}
                            titleCard3={"Histórico de pedidos"}
                            orderUserLength={orderUser.length}
                            styleCard={"font-bold flex flex-col justify-center gap-2"}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}