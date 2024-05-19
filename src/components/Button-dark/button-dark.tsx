interface Props {
    text?: string;
    login?: () => void;
    propsBtn?: (e:any) => void;
    filePost?: (produtoId:number) => void;
}

export default function ButtonDark(props:Props) {
    return (
        <>
            <button className="uppercase bg-greenEco-200 w-full text-white p-2" onClick={props.propsBtn}>{props.text}</button>
        </>
    )
}