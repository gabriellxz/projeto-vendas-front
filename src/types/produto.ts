export default interface ProdutosDTO {
    id_produto: number;
    nome_produto: string;
    preco: number;
    descricao: string;
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