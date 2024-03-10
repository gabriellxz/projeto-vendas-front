// import { createContext } from "react";
// import useCart from "../hook/useCart";

// interface CartType {
//     amount: number;
//     cartId: number;
//     id: number;
//     produtoId: number;
//     produtos: {}
// }

// const CartContext = createContext<CartType | null>(null)

// function CartProvider({ children }: any) {

//     const { cart } = useCart()

//     return (
//         <CartContext.Provider value={cart}>
//             {children}
//         </CartContext.Provider>
//     )
// }