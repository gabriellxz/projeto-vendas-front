import { CartType } from "./cart";
import Endereco from "./endereco";

export default interface Pedidos {
    Delivered: boolean;
    adressId: number;
    carrinho: CartType;
    id_order: number;
    cartId: number;
    id: number;
    trackingCode: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    users: {
        nome: string;
        email: string;
        CPF: string;
    }
    adress: Endereco;
}