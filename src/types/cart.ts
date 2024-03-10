export interface Cart {
    produtoId: number | undefined;
    amount: number | null;
    usuarioId: number | undefined;
}

export interface CartType {
    amount: number | null
    produtos: {
        descricao: string;
        imagem: []
        nome_produto: string;
        preco: number;
    }
}