export default function NextArrow(props:any) {
    const {className, style, onClick} = props
    return (
        <div
            className={className}
            style={{ ...style, display: "none" }}
            onClick={onClick}
        />

    )
}