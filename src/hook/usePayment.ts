import { loadStripe } from "@stripe/stripe-js";
import useCart from "./useCart";
import { useState } from "react";
import { toast } from "react-toastify";

const KEY_STRIPE = import.meta.env.KEY_STRIPE

export default function usePayment() {
    const { cart } = useCart();

    const [loading, setLoading] = useState<boolean>(false)
    const token = localStorage.getItem("tokenUser")

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

                const response = await fetch("https://vendas-online-coral.vercel.app/payments/create-checkout-session", {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(body)
                });


                const session = await response.json();
                window.location.href = session.url

                // Redirecionar para o checkout do Stripe utilizando o Stripe SDK
                await stripe?.redirectToCheckout({
                    sessionId: session.id
                });
            }

        } catch (error) {
            setLoading(false)
            console.error("Erro ao processar pagamento:", error);
            toast.success("Erro ao processar pagamento", {
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
    }

    return {
        make,
        loading
    };
}
