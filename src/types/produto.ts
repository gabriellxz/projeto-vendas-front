export default interface ProdutosDTO {
    id_produto: number;
    nome_produto: string;
    preco: number;
    oferta: boolean;
    descricao: string;
    linha: string;
    estoque: number;
    createdAt: string;
    updatedAt: string;
    imagem: [
        {
            url: string;
            produtoId: number;
        }
    ]
}