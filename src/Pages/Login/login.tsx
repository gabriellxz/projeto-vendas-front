import Form from "../../components/Form/form";
import Header from "../../components/Header/header";


export default function Login() {
    return (
        <>
            <Header/>
            <div className="flex justify-center h-screen sm:flex sm:justify-center sm:items-center">
                <Form/>
            </div>
        </>
    )
}