import FormLogin from "../../components/Form-Login/form-login";
import Header from "../../components/Header/header";
import { motion } from "framer-motion";

export default function Login() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Header />
            <div className="flex justify-center items-center mt-8 sm:flex sm:justify-center sm:items-center">
                <FormLogin />
            </div>
        </motion.div>
    )
}