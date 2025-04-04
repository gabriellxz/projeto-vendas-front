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
// import Category from "../../../types/category"
// import useCategory from "../../../hook/useCategory"
import api from "../../../config/config"
import TrashIcon from "../../../svg/trash-icon"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import Loading from "../../../components/Loading/loading"
import useListProduct from "../../../hook/useListProduct"

export default function ProdutoEstoque() {

    // const { product } = useListProduct()
    // const { categoria, setCategoria } = useCategory()
    const { product, setProduct } = useListProduct()
    const { token } = useContext(UserAutenticado)
    const navigate = useNavigate()
    const [openButton, setOpenButton] = useState<boolean>(false)
    const [openModalEdit, setModalEdit] = useState<boolean>(false)
    const [selectedProduct, setSelectedProduct] = useState<ProdutosDTO | null>(null)
    const [nomeCategory, setNomeCategory] = useState<string>("")
    const [categoryId, setCategoryId] = useState<number>()
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    function openButtonsEdit() {
        setOpenButton(!openButton)
    }

    function closeModalEdit(status: boolean) {
        setModalEdit(status)
    }

    function handleOpenModalEdit(p: ProdutosDTO, nomeCategory: string) {
        setSelectedProduct(p)
        setNomeCategory(nomeCategory)
        setCategoryId(categoryId)
        setModalEdit(true)
        // console.log(p)
    }


    function TableEstoque() {
        return (
            product.map((product: ProdutosDTO) => (
                <tr className={`w-full flex justify-between items-center mt-5`} key={product.id_produto}>
                    <td className="w-full text-left">{product.nome_produto}</td>
                    <td className="w-full text-center">{product.categoryId}</td>
                    <td className="w-full text-center">{product.estoque}</td>
                    <td className="px-1 cursor-pointer">{
                        openButton &&
                        <span className="flex">
                            <span onClick={() => handleOpenModalEdit(product, product.nome_produto)}><IconEdit style="w-[25px] h-[25px] text-black" /></span>
                            {loadingDelete ? <Loading /> : <span onClick={() => deleteProduct(product.id_produto)}><TrashIcon /></span>}
                        </span>
                    }</td>
                </tr>
            ))
        )
    }

    async function deleteProduct(id: number) {

        setLoadingDelete(true)

        if (token) {
            try {
                await api.delete(`/Product/${id}`, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                }).then(() => {
                    // console.log(response)

                    toast.success("Produto excluido com sucesso com sucesso!", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                    setLoadingDelete(false)

                    setProduct(product.filter((c: ProdutosDTO) => c.id_produto !== id))
                }).catch(() => {
                    toast.error("Não foi possivel excluir o produto.", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                    setLoadingDelete(false)
                    // console.log(error)
                })
            } catch (error) {
                toast.error("Não foi possivel excluir o produto.", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })

                setLoadingDelete(false)
                // console.log(error)
            }
        }
    }

    function linkNavigate() {
        navigate("/cadastro-produtos")
    }

    return (
        <div>
            <TopDashboard title="Produtos e estoque" titleRoute="Produtos e estoque" />
            <motion.div className="flex flex-col sm:flex-row gap-[28px] select-none"
                initial={{
                    opacity: 0,
                    translateX: 160
                }}
                animate={{
                    opacity: 1,
                    translateX: 0
                }}
            >
                <div className="flex flex-col gap-[20px] mt-[30px] sm:max-w-[380px] w-full">
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
                    th3={"Quantidade"}
                    styleTable={""}
                    component={<TableEstoque />}
                />
            </motion.div>
            {openModalEdit &&
                <FormEditProduct
                    categoryId={categoryId}
                    nomeCategory={nomeCategory}
                    iProduct={selectedProduct}
                    closeModal={closeModalEdit}
                    openModal={openModalEdit}
                />}
        </div>
    )
}