export default interface ProdutosDTO {
    id_produto: number;
    nome_produto: string;
    preco: number;
    oferta: boolean;
    descricao: string;
    estoque: number;
    createdAt: string;
    categoryId: number;
    updatedAt: string;
    imagem: [
        {
            url: string;
            produtoId: number;
        }
    ]
}