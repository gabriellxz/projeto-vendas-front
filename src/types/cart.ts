export interface Cart {
    produtoId: number | undefined;
    amount: number;
}

export interface CartType {
    carrinho: {
        carrinho: [
            {
                amount: number;
                cartId: number;
                produtoId: number;
                id: number;
                produtos: {
                    descricao: string;
                    imagem: [
                        {
                            url: string;
                            produtoId: number;
                        }
                    ];
                    nome_produto: string;
                    preco: number;
                }
            }
        ]
    }
}

export interface CartOrderUser {
    amount: number;
    cartId: number;
    produtoId: number;
    id: number;
    produtos: {
        descricao: string;
        imagem: [
            {
                url: string;
                produtoId: number;
            }
        ];
        nome_produto: string;
        preco: number;
    }
}