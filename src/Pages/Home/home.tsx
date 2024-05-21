import { Outlet } from "react-router-dom"
import Header from "../../components/Header/header"
import { motion } from "framer-motion"

export default function Home() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Header />
            <Outlet />
        </motion.div>
    )
}