import { configureStore } from "@reduxjs/toolkit";
import { enderecoReducer } from "./selectEndereco";

export const store = configureStore({
    reducer: {
        endereco: enderecoReducer
    }
})

type GetType = typeof store.getState;
export type TypeReducer = ReturnType<GetType>;