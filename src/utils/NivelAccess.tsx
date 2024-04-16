import { useContext } from "react"
import { DataUser } from "../context/dataUser"
import { Navigate } from "react-router-dom"

interface Props {
    children: JSX.Element
}

export default function NivelAccess(props: Props) {

    const user = useContext(DataUser)

    if (user?.role == 1) {
        return <Navigate to={"/acesso-negado"} />
    }

    return props.children
}