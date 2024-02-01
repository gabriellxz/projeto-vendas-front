import { ToastContainer } from "react-toastify";
// import Input from "../Input/input";
import TitleForm from "../Title-form/title-form";
import Input from "../Input/input";
// import UploadImage from "../../svg/upload-image";
import ButtonDark from "../Button-dark/button-dark";
import { useContext, useState } from "react";
import api from "../../config/config";
import { UserAutenticado } from "../../context/authContext";

export default function FormCadastroProdutos() {

    const [value, setValue] = useState({
        nome_produto: "",
        preco: 0,
        descricao: "",
        estoque: 0
    })

    const { token } = useContext(UserAutenticado)

    function registerProductInput(e: any) {
        setValue({ ...value, [e.target.name]: e.target.value })
    }

    async function registerProduct(e: any) {
        e.preventDefault()
        console.log(token)

        await api.post("/Product/create", value, { headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
         } })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
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
                                value={value.nome_produto}
                                name="nome_produto"
                                onInputValue={registerProductInput}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <Input
                                typeInput="number"
                                inputLabel="Preço Vendido"
                                styleWidth="max-w-[325px] w-full"
                                value={value.preco}
                                name="preco"
                                onInputValue={registerProductInput}
                            />
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
                            <Input
                                typeInput="number"
                                inputLabel="Preço de Compra"
                                styleWidth="max-w-[325px] w-full"
                                value={value.estoque}
                                name="estoque"
                                onInputValue={registerProductInput}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <label className="text-xl">Descrição do produto</label>
                        <textarea onClick={registerProductInput} name="descricao" id="" className="resize-none border border-1 border-black outline-none p-2 w-full h-[170px]"></textarea>
                    </div>
                    {/* <div className="flex flex-col w-full">
                        <label className="text-xl">Imagem</label>
                        <div className="flex flex-col justify-center items-center border border-1 border-black outline-none p-2 w-full h-[170px]">
                            <UploadImage />
                            <label htmlFor="fileInput" className="cursor-pointer">Upload image of item</label>
                            <input type="file" id="fileInput" name="" className="hidden" />
                        </div>
                    </div> */}
                    <div>
                        <ButtonDark text="send" />
                    </div>
                </div>

                <ToastContainer />
            </form>
        </>
    )
}