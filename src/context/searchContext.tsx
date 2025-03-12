import { createContext, ReactNode, useContext, useState } from "react";

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({children}: {children:ReactNode}) {

    const [searchTerm, setSearchTerm] = useState("")

    return (
        <SearchContext.Provider value={{searchTerm, setSearchTerm}}>
            {children}
        </SearchContext.Provider>
    )
}

export function useSearch() {
    const context = useContext(SearchContext)

    if(!context) {
        throw new Error("error")
    }
    return context
}