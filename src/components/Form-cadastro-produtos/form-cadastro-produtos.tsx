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
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/16/solid"
import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField } from "@mui/material";

export default function FormCadastroProdutos() {

    function handleKeyDown(e: any) {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
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
        handleOferta,
        handlediameter,
        handleheight,
        handlelengthity,
        handleweight,
        handlewidth,
        height,
        diameter,
        weight,
        width,
        length
    } = useCreateProduct()
    const { categoria, categoriaNome, createCategory, onChangeCategoria, loadingCategory } = useCategory()

    const [open, setOpen] = useState<boolean>(false)
    const [openCampos, setOpenCampos] = useState<boolean>(false)

    function closeModal() {
        setOpenCampos(false)
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
                                <TextField
                                    label="Preço"
                                    variant="outlined"
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
                        <FormControl className="flex w-full">
                            <InputLabel>Categoria</InputLabel>
                            <div className="flex gap-2">
                                <Select
                                    value={categoryId}
                                    onChange={handleCategoria}
                                    name="categoryId"
                                    id=""
                                    className="w-[100%]"
                                >
                                    <MenuItem disabled selected>Selecione uma categoria</MenuItem>
                                    {
                                        categoria.map((cat: Category) => (
                                            <MenuItem value={cat.id} key={cat.id}>{cat.nome}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <Button
                                    variant="contained"
                                    onClick={() => { setOpen(!open) }}
                                    sx={{ backgroundColor: "#3044A6", width: "100%" }}
                                >
                                    + Categoria
                                </Button>
                            </div>
                        </FormControl>
                        <div className="flex flex-col w-full">
                            <TextField
                                variant="outlined"
                                label="Estoque"
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
                        <TextField
                            label="Descrição do produto"
                            multiline
                            rows={7}
                            onChange={handleDescricao}
                            name="descricao"
                            id=""
                            className="resize-none border border-1 border-black outline-none p-2 w-full h-[170px]"
                        >

                        </TextField>
                    </div>
                    <div>
                        <span className="flex justify-end cursor-pointer gap-2" onClick={() => setOpenCampos(!openCampos)}>
                            Mais
                            {
                                openCampos == false ? <ArrowDownIcon className="w-5" /> : <ArrowUpIcon className="w-5" />
                            }
                        </span>
                    </div>
                    {
                        openCampos &&
                        <div className="w-full flex flex-col gap-5">
                            <div className="flex flex-col w-full">
                                <TextField
                                    variant="outlined"
                                    label="Quantidade"
                                    type="number"
                                    className="input border border-1 border-black outline-none p-2 w-full"
                                    onChange={handlelengthity}
                                    name="length"
                                    value={length}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <div className="flex gap-5">
                                <div className="flex flex-col w-full">
                                    <TextField
                                        variant="outlined"
                                        label="Altura"
                                        type="number"
                                        className="input border border-1 border-black outline-none p-2 w-full"
                                        onChange={handleheight}
                                        name="height"
                                        value={height}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <TextField
                                        variant="outlined"
                                        label="Largura"
                                        type="number"
                                        className="input border border-1 border-black outline-none p-2 w-full"
                                        onChange={handlewidth}
                                        name="height"
                                        value={width}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="flex flex-col w-full">
                                    <TextField
                                        variant="outlined"
                                        label="Peso"
                                        type="number"
                                        className="input border border-1 border-black outline-none p-2 w-full"
                                        onChange={handleweight}
                                        name="weight"
                                        value={weight}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <TextField
                                        variant="outlined"
                                        label="Diâmentro"
                                        type="number"
                                        className="input border border-1 border-black outline-none p-2 w-full"
                                        onChange={handlediameter}
                                        name="diameter"
                                        value={diameter}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>
                        </div>
                    }
                    <div className="flex flex-col w-full">
                        <label className="text-xl">Imagem</label>
                        <div className="flex flex-col justify-center items-center border border-1 border-black outline-none p-2 w-full h-[170px]">
                            <UploadImage />
                            <label htmlFor="fileInput" className="cursor-pointer">{file ? <p>imagem exportada</p> : <p>importar imagem</p>}</label>
                            <input type="file" id="fileInput" name="file" className="hidden" onChange={handleFile} />
                        </div>
                    </div>
                    <FormControl>
                        <FormLabel>Produto em oferta:</FormLabel>
                        <RadioGroup>
                            <div>
                                <FormControlLabel
                                    control={<Radio />}
                                    label={"Sim"}
                                    name="oferta"
                                    value={"true"}
                                    onChange={handleOferta}
                                    className="w-5 h-5 cursor-pointer"
                                />
                            </div>
                            <div>
                                <FormControlLabel
                                    control={<Radio />}
                                    label={"Não"}
                                    name="oferta"
                                    value={"false"}
                                    onChange={handleOferta}
                                    className="w-5 h-5 cursor-pointer"
                                />
                            </div>
                        </RadioGroup>
                    </FormControl>
                    <div>
                        {loading ? <Loading /> : <ButtonDark text="send" />}

                    </div>
                </div>
                <Modal
                    open={open}
                    onClose={closeModal}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                >
                    <Box
                        sx={{
                            maxWidth: "500px",
                            width: "100%",
                            backgroundColor: "#fff", 
                            padding: "20px",
                            borderRadius: "8px", 
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
                        }}
                    >
                        <span className="text-right w-full cursor-pointer">
                            <CloseNavBar handleNavBar={() => { setOpen(!open) }} />
                        </span>
                        <div>
                            <Input
                                inputLabel="Nome da linha"
                                name="nome"
                                onInputValue={onChangeCategoria}
                                styleWidth="w-full"
                                typeInput="text"
                                value={categoriaNome}
                            />
                        </div>
                        {loadingCategory ? <Loading /> : <ButtonDark text="Criar" propsBtn={createCategory} />}
                    </Box>
                </Modal>

                <ToastContainer />
            </form>
        </>
    )
}