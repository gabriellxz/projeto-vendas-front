export interface Cart {
    produtoId: number | undefined;
    amount: number;
}

export interface CartType {
    amount: number;
    cartId: number;
    produtoId: number;
    id: number;
    produtos: {
        descricao: string;
        imagem: [];
        nome_produto: string;
        preco: number;
    }
}