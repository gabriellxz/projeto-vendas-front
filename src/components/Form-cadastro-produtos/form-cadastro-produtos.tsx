import { ToastContainer, toast } from "react-toastify";
// import Input from "../Input/input";
import TitleForm from "../Title-form/title-form";
import Input from "../Input/input";
import UploadImage from "../../svg/upload-image";
import ButtonDark from "../Button-dark/button-dark";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import api from "../../config/config";
import Loading from "../Loading/loading";
import { useNavigate } from "react-router-dom";

export default function FormCadastroProdutos() {

    const [nome_produto, setNomeProduto] = useState<string>("")
    const [preco, setPreco] = useState<number>()
    const [descricao, setDescricao] = useState<string>("")
    const [estoque, setEstoque] = useState<number>()

    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    function handleNomeProduct(event: ChangeEvent<HTMLInputElement>): void {
        setNomeProduto(event.target.value)
    }

    function handlePreco(event: ChangeEvent<HTMLInputElement>): void {
        const precoProduct: number = parseFloat(event.target.value)
        setPreco(precoProduct)
    }

    function handleDescricao(event: ChangeEvent<HTMLTextAreaElement>): void {
        setDescricao(event.target.value)
    }

    function handleEstoque(event: ChangeEvent<HTMLInputElement>): void {
        const numeroEstoque: number = parseFloat(event.target.value)
        setEstoque(numeroEstoque)
    }

    const token = localStorage.getItem("tokenUser")
    // const { token } = useContext(UserAutenticado)


    async function registerProduct(e: SyntheticEvent) {
        e.preventDefault()
        console.log("Token: ", token)

        const data = {
            nome_produto,
            descricao,
            preco,
            estoque
        }

        setLoading(true)

        console.log(data)

        try {
            if (token) {
                if (
                    nome_produto === "" ||
                    preco === undefined ||
                    estoque === undefined ||
                    descricao === ""
                ) {
                    toast.error("Preencha os campos corretamente!", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                    setLoading(false)
                } else {
                    await api.post("/Product/create", data, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${JSON.parse(token)}`
                        }
                    })
                    console.log("Produto Cadastrado com sucesso!")

                    toast.success("Produto cadastrado com sucesso!", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })

                    setTimeout(() => {
                        navigate("/home")
                    }, 3000)
                    // window.location.reload()
                    setLoading(false)
                }
            } else {
                console.error("Token não encontrado!")
            }
        } catch (error) {
            console.log(error)
        }

    }


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
                    <div className="flex w-full gap-5">
                        {/* <div className="flex flex-col w-full">
                            <label className="text-xl">Linha</label>
                            <select
                                name="linha"
                                className="border border-1 border-black outline-none p-2 max-w-[325px] w-full"
                            >
                                <option>Escolha uma linha</option>
                            </select>
                        </div> */}
                        <div className="flex flex-col w-full">
                            <label className="text-xl">Categoria</label>
                            <select name="" id="" className="border border-1 border-black outline-none p-2 max-w-[325px] w-full">
                                <option>Selecione uma categoria</option>
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
                            <label htmlFor="fileInput" className="cursor-pointer">Upload image of item</label>
                            <input type="file" id="fileInput" name="" className="hidden" />
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