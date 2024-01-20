interface Props {
    text: string;
}

export default function ButtonDark(props:Props) {
    return (
        <>
            <button className="uppercase bg-zinc-950 w-full text-white p-2 mb-10">{props.text}</button>
        </>
    )
}