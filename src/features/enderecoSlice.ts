import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    adressId: string;
    cepDestino: string;
}

const initialState: State = {
    adressId: "",
    cepDestino: ""
}

interface UpdateFieldPayload {
    field: "adressId" | "cepDestino";
    value: string;
}

export const sliceEndereco = createSlice({
    name: "endereço",
    initialState,
    reducers: {
        changeValue(state: State, action: PayloadAction<UpdateFieldPayload>) {
            console.log(action)
            const { field, value } = action.payload
            state[field] = value
        }
    }
});

export const { changeValue } = sliceEndereco.actions;
export const enderecoReducer = sliceEndereco.reducer;