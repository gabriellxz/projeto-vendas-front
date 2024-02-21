import './style.css'

interface Props {
    styleLoading?: string;
}

export default function Loading(props: Props) {
    return (
        <div className={`
            lds-ring
            ${props.styleLoading}
        `}><div></div><div></div><div></div><div></div></div>
    )
}