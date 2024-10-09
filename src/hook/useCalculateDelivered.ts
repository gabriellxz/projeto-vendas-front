import { useContext, useState } from "react"
import { UserAutenticado } from "../context/authContext";
import api from "../config/config";
import useCart from "./useCart";
import { toast } from "react-toastify";

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
                    const response = await api.get(`/product/${produtoId}/delivery/${cep}`, {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(token)
                        }
                    })

                    const freteData = response.data.map((array: any) => array[0].pcFinal)

                    setLoadingFrete(false);
                    setFrete(freteData[0])
                    console.log(response);
                } catch (error) {
                    setLoadingFrete(false);
                    console.log(error);

                    toast.error("Ocorreu um erro ao processar o valor.", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
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