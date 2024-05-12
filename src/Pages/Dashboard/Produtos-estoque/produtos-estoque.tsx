import CardDashboard from "../../../components/Cards-dashboard/cards-dashboard"
import LayoutPedidos from "../../../components/Layout-pedidos/layout-pedidos"
import TopDashboard from "../../../components/Top-dashboard/top-dashboard"
import useListProduct from "../../../hook/useListProduct"
import ProdutosDTO from "../../../types/produto"
import { useNavigate } from "react-router-dom"

export default function ProdutoEstoque() {

    const { product } = useListProduct()
    const navigate = useNavigate()


    function TableEstoque() {
        return (
            product.map((p: ProdutosDTO) => (
                <tr className={`w-full flex justify-between items-center mt-5`} key={p.id_produto}>
                    <td className="w-full text-left">{p.nome_produto}</td>
                    <td className="w-full text-center">linha 1</td>
                    <td className="w-full text-center">{p.estoque}</td>
                </tr>
            ))
        )
    }

    function linkNavigate() {
        navigate("/cadastro-produtos")
    }

    return (
        <div>
            <TopDashboard title="Produtos e estoque" titleRoute="Produtos e estoque" />
            <div className="flex gap-[28px] select-none">
                <div className="flex flex-col gap-[20px] mt-[30px] max-w-[380px] w-full">
                    <CardDashboard
                        titleCard1={"Modificar estoque"}
                        titleCard2={"Cadastrar produto"}
                        titleCard3={"Produtos em falta"}
                        styleCard={"items-center"}
                        link={linkNavigate}
                    />
                </div>
                <LayoutPedidos
                    titleLayout={"Produtos à venda"}
                    th1={"Produto"}
                    th2={"Linha"}
                    th3={"Qtd"}
                    styleTable={""}
                    component={<TableEstoque />}
                />
            </div>
        </div>
    )
}