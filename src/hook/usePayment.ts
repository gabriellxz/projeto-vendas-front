import { loadStripe } from "@stripe/stripe-js";
import {useCart} from "../context/cartContext";
import { useContext, useState } from "react";
import { UserAutenticado } from "../context/authContext";
import { useSelector } from "react-redux";
import { TypeReducer } from "../features/store";

const KEY_STRIPE = import.meta.env.KEY_STRIPE

export default function usePayment() {
    const { cart } = useCart();

    const [loading, setLoading] = useState<boolean>(false)
    // const token = localStorage.getItem("tokenUser")
    const { token } = useContext(UserAutenticado)

    const selectedAdressId = useSelector((state: TypeReducer) => state.endereco.adressId)
    const cepDestino = useSelector((state:TypeReducer) => state.endereco.cepDestino)

    async function make() {

        setLoading(true)

        try {
            if (token) {
                const stripe = await loadStripe(String(KEY_STRIPE));
                setLoading(false)

                const body = {
                    products: cart
                };

                const headers = {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + JSON.parse(token)
                };

                if (selectedAdressId) {
                    const response = await fetch(`https://vendas-online-ruddy.vercel.app/payments/create-checkout-session/${selectedAdressId}/${cepDestino}`, {
                        method: "POST",
                        headers: headers,
                        body: JSON.stringify(body)
                    });


                    const session = await response.json();
                    // console.log(session)
                    // console.log(selectedAdressId)
                    window.location.href = session.url

                    // Redirecionar para o checkout do Stripe utilizando o Stripe SDK
                    await stripe?.redirectToCheckout({
                        sessionId: session.id
                    });
                }
            }

        } catch (error) {
            setLoading(false)
            // console.error("Erro ao processar pagamento:", error);
            // toast.error("Erro ao processar pagamento", {
            //     position: "bottom-center",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            // })
            
        }
    }

    return {
        make,
        loading
    };
}
