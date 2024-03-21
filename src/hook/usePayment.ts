import { loadStripe } from "@stripe/stripe-js";
import useCart from "./useCart";
import { SyntheticEvent } from "react";

export default function usePayment() {
    const { cart } = useCart();

    async function make(e: SyntheticEvent) {
            
        e.preventDefault();
        const token = localStorage.getItem("tokenUser")

        try {
            if (token) {
                const stripe = await loadStripe("pk_test_51OoR2AAeNy38u8Qr6ukpIdEo8ShzA06bq0B4z8kx4ONU8Ewy68rT0lehAbEkckCgMSlHzPz2KsYqc31zFpHvsPiH00DDqDdENB");

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
            console.error("Erro ao processar pagamento:", error);
        }
    }

    return {
        make
    };
}
