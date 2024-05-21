import CardDetails from "../../components/Details-product-page/details-product-page";
import Loading from "../../components/Loading/loading";
import useProdutoId from "../../hook/useProdutoId";
import { motion } from "framer-motion"

export default function DetailsProduct() {

    const { loading, produto } = useProdutoId()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            {
                loading ? <Loading styleLoading="absolute top-[50%] left-[50%] bottom-[50%] right-[50%]" /> : produto && <CardDetails iProdutoDetails={produto} />
            }
        </motion.div>
    )
}