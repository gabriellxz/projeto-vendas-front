import LayoutPedidos from "../../../components/Layout-pedidos/layout-pedidos";

export default function RegistroDePedidos() {
    return(
        <>
            <div>
                <div>
                    <h1 className="text-3xl font-bold">Registro de pedidos</h1>
                    <span className="flex  gap-5">
                        <span>Registro de pedidos</span> &gt;
                    </span>
                </div>
                <LayoutPedidos/>
            </div>
        </>
    )
}