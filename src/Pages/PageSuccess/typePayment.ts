export type CompleteOrder = {
    id_order: number;
    cart_Id: number;
    userId: number;
    adressId: number;
    sessionId: string;
    trackingCode: any;
    createdAt: string;
    updatedAt: string;
    OrderItem: {
        id: number;
        orderId: number;
        produtoId: number;
        quantidade: number;
        preco: number;
        produto: {
            id_produto: number;
            nome_produto: string;
            preco: number;
            descricao: string;
            estoque: number;
            oferta: boolean;
            weight: number;
            height: number;
            width: number;
            diameter: number;
            length: number;
            createdAt: string;
            updatedAt: string;
            categoryId: number;
        };
    }[];
    adress: {
        id: number;
        CEP: string;
        numero: string;
        complemento: string;
        ponto_de_referencia: string;
        bairro: string;
        estado: string;
        cidade: string;
        telefone_contato: string;
        Rua: string;
        userId: number;
    };
    users: {
        id: number;
        nome: string;
        email: string;
        senha: string;
        Telefone: string;
        genero: string;
        CPF: string;
        role: number;
        createdAt: string;
        updatedAt: string;
    };
};
