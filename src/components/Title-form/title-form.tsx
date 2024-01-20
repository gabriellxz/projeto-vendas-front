interface Props {
    text: string;
}

export default function TitleForm(props:Props) {
    return(
        <>
            <h1 className="text-3xl font-bold uppercase">{props.text}</h1>
        </>
    )
}