import { ChangeEvent } from "react";
import TextField from "@mui/material/TextField"

interface Props {
    typeInput: string;
    inputLabel: string;
    styleWidth: string;
    name: string;
    value: string | number;
    onInputValue: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function Input(props: Props) {



    return (
        <>
            <TextField
                label={props.inputLabel} 
                variant="outlined"
                type={props.typeInput}
                value={props.value}
                onChange={props.onInputValue}
                name={props.name}
                className={`
                border border-1 border-black outline-none p-2 ${props.styleWidth}
            `}
            />
        </>
    )
}