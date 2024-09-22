interface Props {
    text: string;
}

export default function ButtonLight(props: Props) {
    return (
        <>
            <button className="p-2 border border-1 border-black w-full">{props.text}</button>
        </>
    )
}