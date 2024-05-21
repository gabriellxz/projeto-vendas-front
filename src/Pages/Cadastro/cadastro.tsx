import FormCadastro from "../../components/Form-cadastro/form-cadastro";
import Header from "../../components/Header/header";
import { motion } from "framer-motion"

export default function Cadastro() {
    return (
        <div>
            <Header />
            <motion.div className="flex justify-center items-center mt-8 sm:flex sm:justify-center sm:items-center"
                initial={{
                    opacity: 0,
                    translateY: 160,
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
            >
                <FormCadastro />
            </motion.div>
        </div>
    )
}