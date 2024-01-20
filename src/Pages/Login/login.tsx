import FormLogin from "../../components/Form-Login/form-login";
import Header from "../../components/Header/header";


export default function Login() {
    return (
        <>
            <Header/>
            <div className="flex justify-center items-center mt-8 sm:flex sm:justify-center sm:items-center">
                <FormLogin/>
            </div>
        </>
    )
}