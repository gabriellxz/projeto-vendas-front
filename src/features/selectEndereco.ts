import {createSlice, PayloadAction} from "@reduxjs/toolkit"; 

interface State {
    endereco: string;
}

const initialState: State = {
    endereco: "",
}

export const sliceEndereco = createSlice({
    name: "endereço",
    initialState,
    reducers: {
        changeValue(state:State, action: PayloadAction<string>) {
            return {
                ...state,
                endereco: action.payload
            }
        }
    }
});

export const {} = sliceEndereco.actions;
export const enderecoReducer = sliceEndereco.reducer;