interface Props {
    text: string;
    removeProductCart?: (produtoId:number) => void;
}

export default function ButtonLight(props:Props) {
    return (
        <>
            <button className="p-2 border border-1 border-black w-full" onClick={() => props.removeProductCart}>{props.text}</button>
        </>
    )
}