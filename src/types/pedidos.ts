import { Cart } from "./cart";
import Endereco from "./endereco";

export default interface Pedidos {
    Delivered: boolean;
    adress: Endereco;
    adressId: number;
    carrinho: Cart;
    cartId: number;
    id: number;
    trackingCode: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    users: {
        nome: string;
        email: string;
    }
}