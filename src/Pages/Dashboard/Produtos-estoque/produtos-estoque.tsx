import CardDashboard from "../../../components/Cards-dashboard/cards-dashboard"
import LayoutPedidos from "../../../components/Layout-pedidos/layout-pedidos"
import TopDashboard from "../../../components/Top-dashboard/top-dashboard"
// import useListProduct from "../../../hook/useListProduct"
import ProdutosDTO from "../../../types/produto"
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import { UserAutenticado } from "../../../context/authContext"
import IconEdit from "../../../svg/icon-edit"
import FormEditProduct from "../../../components/Form-edit-product/form-edit-product"
import Category from "../../../types/category"
import useCategory from "../../../hook/useCategory"
import api from "../../../config/config"
import { AxiosError, AxiosResponse } from "axios"
import TrashIcon from "../../../svg/trash-icon"

export default function ProdutoEstoque() {

    // const { product } = useListProduct()
    const { categoria, setCategoria } = useCategory()
    const { token } = useContext(UserAutenticado)
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
                        <td className="px-1 cursor-pointer">{
                            openButton && <span className="flex">
                                <span onClick={() => handleOpenModalEdit(product)}><IconEdit /></span> <span onClick={() => deleteProduct(product.id_produto)}><TrashIcon/></span>
                            </span>
                        }</td>
                    </tr>
                ))
            ))
        )
    }

    async function deleteProduct(id: number) {
        if (token) {
            try {
                await api.delete(`/Product/${id}`, {headers:{
                    "Authorization": "Bearer " + JSON.parse(token)
                }})
                    .then((response: AxiosResponse) => {
                        console.log(response)
                        setCategoria(categoria.filter((c: Category) => c.id_produto !== id))
                    }).catch((error: AxiosError) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        }
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