import { ToastContainer } from "react-toastify";
// import Input from "../Input/input";
import TitleForm from "../Title-form/title-form";
import Input from "../Input/input";
import UploadImage from "../../svg/upload-image";
import ButtonDark from "../Button-dark/button-dark";
import useCreateProduct from "../../hook/useCreateProduct";
import Loading from "../Loading/loading";
import Category from "../../types/category";
import useCategory from "../../hook/useCategory";
import { useState } from "react";
import CloseNavBar from "../../svg/closeNavbar";
import '../../global.css'

export default function FormCadastroProdutos() {

    function handleKeyDown(e:any) {
        if(e.key === "ArrowUp" || e.key === "ArrowDown") {
            e.preventDefault()
        }
    }

    const {
        handleDescricao,
        handleEstoque,
        handleNomeProduct,
        handlePreco,
        handleFile,
        preco,
        file,
        nome_produto,
        estoque,
        // filePost,
        categoryId,
        handleCategoria,
        registerProduct,
        loading,
        handleOferta
    } = useCreateProduct()
    const { categoria, categoriaNome, createCategory, onChangeCategoria, loadingCategory } = useCategory()

    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            <form className="max-w-[600px] w-full m-5" onSubmit={registerProduct}>
                <div className="mb-10 text-center">
                    <TitleForm text={"cadastre um novo produto"} />
                </div>
                <div className="flex flex-col gap-7 justify-center">
                    <div className="flex w-full gap-5">
                        <div className="flex flex-col w-full">
                            <Input
                                typeInput="text"
                                inputLabel="Nome"
                                styleWidth="max-w-[325px] w-full"
                                value={nome_produto}
                                name="nome_produto"
                                onInputValue={handleNomeProduct}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <div>
                                <label className="text-xl">Preço Vendido</label>
                                <input
                                    type="number"
                                    className="input border border-1 border-black outline-none p-2 max-w-[325px] w-full"
                                    onChange={handlePreco}
                                    name="preco"
                                    value={preco}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:flex sm:flex-row flex flex-col items-center w-full gap-5">
                        <div className="flex flex-col w-full">
                            <label className="text-xl">Categoria</label>
                            <div className="flex gap-2">
                                <select value={categoryId} onChange={handleCategoria} name="categoryId" id="" className="border border-1 border-black outline-none p-2 sm:max-w-[325px] w-full">
                                    <option>Selecione uma categoria</option>
                                    {
                                        categoria.map((cat: Category) => (
                                            <option value={cat.id} key={cat.id}>{cat.nome}</option>
                                        ))
                                    }
                                </select>
                                <span className="flex text-center select-none uppercase bg-greenEco-200 w-full text-white p-2 cursor-pointer" onClick={() => { setOpen(!open) }}>+ Categoria</span>
                            </div>
                            {open &&
                                <div className="flex gap-2 absolute top-[380px] bg-white max-w-[325px] w-full border border-greenEco-100 p-5 items-center">
                                    <span className="cursor-pointer">
                                        <CloseNavBar handleNavBar={() => { setOpen(!open) }} />
                                    </span>
                                    <Input
                                        inputLabel=""
                                        name="nome"
                                        onInputValue={onChangeCategoria}
                                        styleWidth="max-w-[325px] w-full"
                                        typeInput="text"
                                        value={categoriaNome}
                                    />
                                    {loadingCategory ? <Loading /> : <ButtonDark text="Criar" propsBtn={createCategory} />}
                                </div>
                            }
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-xl">Estoque</label>
                            <input
                                type="number"
                                className="input border border-1 border-black outline-none p-2 sm:max-w-[325px] w-full"
                                onChange={handleEstoque}
                                name="estoque"
                                value={estoque}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-xl">Descrição do produto</label>
                        <textarea onChange={handleDescricao} name="descricao" id="" className="resize-none border border-1 border-black outline-none p-2 w-full h-[170px]"></textarea>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-xl">Imagem</label>
                        <div className="flex flex-col justify-center items-center border border-1 border-black outline-none p-2 w-full h-[170px]">
                            <UploadImage />
                            <label htmlFor="fileInput" className="cursor-pointer">{file ? <p>imagem exportada</p> : <p>importar imagem</p>}</label>
                            <input type="file" id="fileInput" name="file" className="hidden" onChange={handleFile} />
                        </div>
                    </div>
                    <div>
                        <span className="text-2xl">Produto em oferta:</span>
                        <div className="flex gap-[30px] py-5">
                            <div className="flex items-center gap-1">
                                <span className="text-xl">Sim</span>
                                <input type="radio" name="oferta" value={"true"} onChange={handleOferta} className="w-5 h-5 cursor-pointer"/>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-xl">Não</span>
                                <input type="radio" name="oferta" value={"false"} onChange={handleOferta} className="w-5 h-5 cursor-pointer"/>
                            </div>
                        </div>
                    </div>
                    <div>
                        {loading ? <Loading /> : <ButtonDark text="send" />}

                    </div>
                </div>

                <ToastContainer />
            </form>
        </>
    )
}