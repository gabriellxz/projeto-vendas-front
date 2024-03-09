import CardDetails from "../../components/Details-product-page/details-product-page";
import Loading from "../../components/Loading/loading";
import useProdutoId from "../../hook/useProdutoId";

export default function DetailsProduct() {

    const { loading, produto } = useProdutoId()

    return (
        <>
            {
                loading ? <Loading styleLoading="absolute top-[50%] left-[50%] bottom-[50%] right-[50%]" /> : produto && <CardDetails iProdutoDetails={produto} />
            }
        </>
    )
}