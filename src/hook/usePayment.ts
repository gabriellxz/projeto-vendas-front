import { loadStripe } from "@stripe/stripe-js";
import useCart from "./useCart";

export default function usePayment() {
    const { cart } = useCart();

    async function make() {
        try {
            const stripe = await loadStripe(String(process.env.KEY_STRIPE));

            const body = {
                products: cart
            };

            const headers = {
                "Content-Type": "application/json"
            };

            const response = await fetch("/payments/create-checkout-session", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            const session = await response.json();

            // Redirecionar para o checkout do Stripe utilizando o Stripe SDK
            await stripe?.redirectToCheckout({
                sessionId: session.id
            });

        } catch (error) {
            console.error("Erro ao processar pagamento:", error);
        }
    }

    return {
        make
    };
}
