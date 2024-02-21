import { Outlet } from "react-router-dom"
import Header from "../../components/Header/header"

export default function Home() {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}