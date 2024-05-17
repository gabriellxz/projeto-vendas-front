import { useState, useContext, ChangeEvent, SyntheticEvent } from "react";
import { UserAutenticado } from "../../context/authContext"
import ProdutosDTO from "../../types/produto";
import api from "../../config/config";
import useCategory from "../../hook/useCategory";
import Category from "../../types/category";
import { ToastContainer, toast } from "react-toastify";
import { AxiosError, AxiosResponse } from "axios";
import Loading from "../Loading/loading";
import CloseNavBar from "../../svg/closeNavbar";

interface PropsForm {
    iProduct: ProdutosDTO | null;
    closeModal: (status: boolean) => void;
}

export default function FormEditProduct(props: PropsForm) {

    const { categoria } = useCategory()
    const { token } = useContext(UserAutenticado)
    const [nomeProduto, setNomeProduto] = useState<string | undefined>(props.iProduct?.nome_produto)
    const [precoProduto, setPrecoProduto] = useState<number | undefined>(props.iProduct?.preco)
    const [estoqueProduto, setEstoqueProduto] = useState<number | undefined>(props.iProduct?.estoque)
    const [descricaoProduto, setDescricaoProduto] = useState<string | undefined>(props.iProduct?.descricao)
    const [ofertaProduto, setOfertaProduto] = useState<string>("")
    const [categoryProduto, setCategoryProduto] = useState<number | undefined>(props.iProduct?.categoryId)
    const [loading, setLoading] = useState<boolean>(false)

    function onChangeNomeProduto(e: ChangeEvent<HTMLInputElement>) {
        setNomeProduto(e.target.value)
    }
    
    function onChangePrecoEstoque(e: ChangeEvent<HTMLInputElement>) {
        const precoEstoque: number = parseFloat(e.target.value)
        setEstoqueProduto(precoEstoque)
    }

    function onChangePrecoProduto(e: ChangeEvent<HTMLInputElement>) {
        const precoProduct: number = parseFloat(e.target.value)
        setPrecoProduto(precoProduct)
    }

    function onChangeDescricaoProduto(e: ChangeEvent<HTMLTextAreaElement>) {
        setDescricaoProduto(e.target.value)
    }

    function onChangeOfertaProduto(e: any) {
        setOfertaProduto(e.target.value)
    }

    function onChangeCategoriaProduto(e: ChangeEvent<HTMLSelectElement>) {
        const categoriaProduto: number = parseFloat(e.target.value)
        setCategoryProduto(categoriaProduto)
    }


    async function putProducts(e: SyntheticEvent) {
        e.preventDefault()
        setLoading(true)

        const oferta = ofertaProduto === "true";

        const data = {
            id_produto: props.iProduct?.id_produto,
            nome_produto: nomeProduto,
            preco: precoProduto,
            descricao: descricaoProduto,
            estoque: estoqueProduto,
            oferta: oferta,
            categoryId: categoryProduto
        }

        console.log(data)

        if (
            nomeProduto !== "" &&
            precoProduto !== undefined &&
            estoqueProduto !== undefined &&
            descricaoProduto !== "" &&
            ofertaProduto !== undefined 
        ) {
            if (token) {
                try {
                    await api.put(`/Product/${props.iProduct?.id_produto}`, data, {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    }).then((response: AxiosResponse) => {
                        setLoading(false)
                        console.log(response)


                        toast.success("Alterações feitas com sucesso!", {
                            position: "bottom-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                        });


                        setTimeout(() => {
                            if (response.status === 200) {
                                location.reload()
                                props.closeModal(false)
                            }
                        }, 2000)
                    }).catch((error: AxiosError) => {
                        setLoading(false)
                        console.log(error)

                        toast.error("Não foi possível fazer as alterações.", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored"
                        });
                    })

                } catch (error) {
                    setLoading(false);
                    console.log(error)
                }
            }
        } else {
            setLoading(false);

            toast.error("Preencha os campos corretamente.", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    }

    

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-md shadow-zinc-500 sm:max-w-[700px] w-full p-5 rounded-xl">
            <div>
                <span className="text-3xl font-bold">Editar produto</span>
            </div>
            <form className="flex flex-col gap-6 p-4" onSubmit={putProducts}>
                <div>
                    <span onClick={() => props.closeModal(false)}><CloseNavBar /></span>
                </div>
                <div>
                    <span>Nome do produto</span>
                    <input type="text" name="nome_produto" onChange={onChangeNomeProduto} className="w-full outline-none border border-zinc-600 rounded-md p-3 bg-slate-200" value={nomeProduto} />
                </div>
                <div className="flex gap-8">
                    <div>
                        <span>Valor do produto</span>
                        <input type="number" name="preco" onChange={onChangePrecoProduto} className="w-full outline-none border border-zinc-600 rounded-md p-3 bg-slate-200" value={precoProduto} />
                    </div>
                    <div>
                        <span>Quantidade em estoque</span>
                        <input type="number" name="estoque" onChange={onChangePrecoEstoque} className="w-full outline-none border border-zinc-600 rounded-md p-3 bg-slate-200" value={estoqueProduto} />
                    </div>
                    <div>
                        <span>Categoria</span>
                        <select name="categoryId" value={categoryProduto} onChange={onChangeCategoriaProduto} id="" className="w-full outline-none border border-zinc-600 rounded-md p-3 bg-slate-200">
                            {
                                categoria.map((c: Category) => (
                                    <option value={c.id}>{c.nome}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <span>Descrição</span>
                    <textarea name="descricao" onChange={onChangeDescricaoProduto} id="" value={descricaoProduto} className="resize-none w-full outline-none border border-zinc-600 rounded-md p-3 bg-slate-200"></textarea>
                </div>
                <div>
                    <span className="text-2xl">Produto em oferta: {props.iProduct?.oferta === true ? "Sim" : "Não"}</span>
                    <div className="flex gap-[30px] py-5">
                        <div className="flex items-center gap-1">
                            <span className="text-xl">Sim</span>
                            <input type="radio" name="oferta" value={"true"} onChange={onChangeOfertaProduto} className="w-5 h-5 cursor-pointer" />
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-xl">Não</span>
                            <input type="radio" name="oferta" value={"false"} onChange={onChangeOfertaProduto} className="w-5 h-5 cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    {
                        loading ? <Loading />
                            :
                            <button className="p-3 bg-green-300 text-green-800 font-bold max-w-[400px] w-full rounded-md text-xl">Salvar alterações</button>
                    }
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}