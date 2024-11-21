import { configureStore } from "@reduxjs/toolkit";
import { enderecoReducer } from "./enderecoSlice";

export const store = configureStore({
    reducer: {
        endereco: enderecoReducer,
        cepDestino: enderecoReducer
    }
})

type GetType = typeof store.getState;
export type TypeReducer = ReturnType<GetType>;