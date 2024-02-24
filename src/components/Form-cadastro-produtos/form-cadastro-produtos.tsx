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

export default function FormCadastroProdutos() {

    const {
        handleDescricao,
        handleEstoque,
        handleNomeProduct,
        handlePreco,
        handleImage,
        preco,
        image,
        nome_produto,
        estoque,
        categoryId,
        handleCategoria,
        registerProduct,
        loading
    } = useCreateProduct()
    const {categoria} = useCategory() 

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
                                    className="border border-1 border-black outline-none p-2 max-w-[325px] w-full"
                                    onChange={handlePreco}
                                    name="preco"
                                    value={preco}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full gap-5">
                        <div className="flex flex-col w-full">
                            <label className="text-xl">Categoria</label>
                            <select value={categoryId} onChange={handleCategoria} name="categoryId" id="" className="border border-1 border-black outline-none p-2 max-w-[325px] w-full">
                                <option>Selecione uma categoria</option>
                                {
                                    categoria.map((cat:Category) => (
                                        <option value={cat.id} key={cat.id}>{cat.nome}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-xl">Preço de Compra</label>
                            <input
                                type="number"
                                className="border border-1 border-black outline-none p-2 max-w-[325px] w-full"
                                onChange={handleEstoque}
                                name="estoque"
                                value={estoque}
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
                            <label htmlFor="fileInput" className="cursor-pointer">{image ? <p>deu certo</p> : <p>deu n</p>}</label>
                            <input type="file" id="fileInput" name="" className="hidden" onChange={handleImage}/>
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