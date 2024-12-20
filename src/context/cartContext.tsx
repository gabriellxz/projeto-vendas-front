import { createContext, useState } from "react"

interface CartTypeContext {
    amountContext: number | null
    setAmountContext: React.Dispatch<React.SetStateAction<number | null>>
}

const CartContext = createContext<CartTypeContext>({} as CartTypeContext)

function CartContextProvider({ children }: any) {

    const [amountContext, setAmountContext] = useState<number | null>(null)

    return (
        <CartContext.Provider value={{ amountContext, setAmountContext }}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartContextProvider }