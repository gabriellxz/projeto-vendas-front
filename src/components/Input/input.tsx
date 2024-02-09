import { ChangeEvent } from "react";

interface Props {
    typeInput: string;
    inputLabel: string;
    styleWidth: string;
    name: string;
    value: string | number;
    onInputValue: (event:ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: Props) {

    

    return (
        <>
            <label className="text-xl">{props.inputLabel}</label>
            <input type={props.typeInput} value={props.value} onChange={props.onInputValue} name={props.name} className={`
                border border-1 border-black outline-none p-2 ${props.styleWidth}
            `}/>
        </>
    )
}