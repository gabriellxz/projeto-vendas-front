import CardDashboard from "../../../components/Cards-dashboard/cards-dashboard"
import LayoutPedidos from "../../../components/Layout-pedidos/layout-pedidos"
import TopDashboard from "../../../components/Top-dashboard/top-dashboard"
// import useListProduct from "../../../hook/useListProduct"
import ProdutosDTO from "../../../types/produto"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import IconEdit from "../../../svg/icon-edit"
import FormEditProduct from "../../../components/Form-edit-product/form-edit-product"
import Category from "../../../types/category"
import useCategory from "../../../hook/useCategory"

export default function ProdutoEstoque() {

    // const { product } = useListProduct()
    const {categoria} = useCategory()
    const navigate = useNavigate()
    const [openButton, setOpenButton] = useState<boolean>(false)
    const [openModalEdit, setModalEdit] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<ProdutosDTO | null>(null)

    function openButtonsEdit() {
        setOpenButton(!openButton)
    }

    function closeModalEdit(status: boolean) {
        setModalEdit(status)
    }

    function handleOpenModalEdit(p: ProdutosDTO) {
        setSelectedProduct(p)
        setModalEdit(true)
    }

    function TableEstoque() {
        return (
            categoria.map((p: Category) => (
                p.Produtos.map((product: ProdutosDTO) => (
                    <tr className={`w-full flex justify-between items-center mt-5`} key={product.id_produto}>
                        <td className="w-full text-left">{product.nome_produto}</td>
                        <td className="w-full text-center">{p.nome}</td>
                        <td className="w-full text-center">{product.estoque}</td>
                        <td className="px-1 cursor-pointer" onClick={() => handleOpenModalEdit(product)}>{openButton && <IconEdit />}</td>
                    </tr>
                ))
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
                        editProductFunction={openButtonsEdit}
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
            {openModalEdit && <FormEditProduct iProduct={selectedProduct} closeModal={closeModalEdit} />}
        </div>
    )
}