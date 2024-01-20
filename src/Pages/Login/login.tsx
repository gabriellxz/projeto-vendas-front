import Form from "../../components/Form/form";
import Header from "../../components/Header/header";


export default function Login() {
    return (
        <>
            <Header/>
            <div className="flex justify-center items-center h-screen">
                <Form/>
            </div>
        </>
    )
}