interface Props {
    title: string;
    titleRoute: string;
}

export default function TopDashboard(props:Props) {
    return (
        <div>
            <h1 className="text-3xl font-bold">{props.title}</h1>
            <span className="flex gap-5">
                <span>{props.titleRoute}</span> &gt;
            </span>
        </div>
    )
}