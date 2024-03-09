import { createContext } from "react";
import useProdutoId from "../hook/useProdutoId";

interface Produto {
    id_produto: number;
    nome_produto: string;
    preco: number;
    descricao: string;
    estoque: number;
    createdAt: string;
    updatedAt: string;
}

const ProdutoContext = createContext<Produto | any>({} as Produto)

function ProdutoProvider({ children }: any) {

    const {produtoId} = useProdutoId()

    return (
        <ProdutoContext.Provider value={produtoId}>
            {children}
        </ProdutoContext.Provider>
    )
}

export { ProdutoContext, ProdutoProvider }