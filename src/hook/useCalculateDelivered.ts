import { useContext, useState } from "react"
import { UserAutenticado } from "../context/authContext";
import api from "../config/config";
import useCart from "./useCart";

export default function useCalculateDelivered() {

    const { token } = useContext(UserAutenticado);
    const [cep, setCep] = useState<string>("")
    const [frete, setFrete] = useState<any>();
    const [LoadingFrete, setLoadingFrete] = useState<boolean>(false);
    const { produtoId } = useCart()

    async function calculateDelivered() {

        setLoadingFrete(true);

        if (token) {
            if (cep != null) {
                try {
                    const response = api.get(`/product/${produtoId}/delivery/${cep}`)
                    setLoadingFrete(false);
                    setFrete(response);
                } catch (error) {
                    setLoadingFrete(false);
                    console.log(error);
                }
            } else {
                console.log("algo de errado não está certo, preencha todin");
            }
        }
    }

    return {
        frete,
        LoadingFrete,
        setCep,
        calculateDelivered,
        cep
    }
}