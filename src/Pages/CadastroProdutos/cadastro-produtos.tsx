import FormCadastroProdutos from "../../components/Form-cadastro-produtos/form-cadastro-produtos";
import Header from "../../components/Header/header";

export default function CadastroProdutos() {
    return (
        <>
            <Header />
            <div className="flex justify-center items-center mt-8 sm:flex sm:justify-center sm:items-center">
                <FormCadastroProdutos/>
            </div>
        </>
    )
}