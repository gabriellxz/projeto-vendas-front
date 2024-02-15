interface Props {
    text: string;
    login?: () => void;
    handleLogin?: () => void;
}

export default function ButtonDark(props:Props) {
    return (
        <>
            <button className="uppercase bg-greenEco-200 w-full text-white p-2 mb-10" onClick={props.handleLogin}>{props.text}</button>
        </>
    )
}