import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    adressId: string;
}

const initialState: State = {
    adressId: ""
}

export const sliceEndereco = createSlice({
    name: "endereço",
    initialState,
    reducers: {
        changeValue(state: State, action: PayloadAction<string>) {
            console.log(action)
            return {
                ...state,
                adressId: action.payload
            }
        }
    }
});

export const { changeValue } = sliceEndereco.actions;
export const enderecoReducer = sliceEndereco.reducer;