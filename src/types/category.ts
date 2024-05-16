import ProdutosDTO from "./produto";

export default interface Category extends ProdutosDTO {
    id: number;
    nome: string;
    Produtos: []
}