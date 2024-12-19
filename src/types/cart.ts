export interface Cart {
    produtoId: number | undefined;
    amount: number;
}

export interface CartType {
    carrinho: {
        carrinho: [
            {
                Delivered: boolean;
                amount: number;
                cart_Id: number;
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
    Delivered:  boolean;
    amount: number;
    cart_Id: number;
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