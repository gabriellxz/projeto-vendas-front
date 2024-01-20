interface Props {
    typeInput: string;
    inputLabel: string
}

export default function Input(props: Props) {
    return (
        <>
            <label className="text-xl">{props.inputLabel}</label>
            <input type={props.typeInput} className="border border-1 border-black outline-none p-2 w-full"/>
        </>
    )
}