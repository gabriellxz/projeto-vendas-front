import FormCadastro from "../../components/Form-cadastro/form-cadastro";
import Header from "../../components/Header/header";

export default function Cadastro() {
    return (
        <>
            <Header />
            <div className="flex justify-center items-center mt-8 sm:flex sm:justify-center sm:items-center">
                <FormCadastro />
            </div>
        </>
    )
}