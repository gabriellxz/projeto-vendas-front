import { loadStripe } from "@stripe/stripe-js"
import useCart from "./useCart"

export default function usePayment() {

    const { cart } = useCart()

    async function make() {


        const stripe = await loadStripe(String(process.env.KEY_STRIPE))

        const body = {
            products: cart
        }

        const headers = {
            "Content-Type": "application/json"
        }

        const response = await fetch("https://vendas-online-coral.vercel.app/payments/create-checkout-session", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        })

        const session = await response.json()

        const result = stripe?.redirectToCheckout({
            sessionId: session.id
        })

        if((await result)?.error) {
            console.log((await result)?.error)
        }
    }

    return {
        make
    }
}