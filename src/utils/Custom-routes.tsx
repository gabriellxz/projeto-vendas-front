import { Navigate } from "react-router-dom"

interface Props {
    children: JSX.Element
}

export default function CustomRoutes({ children }: Props) {

    // const { tokenAccess } = useContext(UserAutenticado)
    const token = localStorage.getItem("tokenUser")
    if (!token) {
        return <Navigate to={"/"} />
    }

    return children
}