import InforProduct from "../../../components/Infor-product/infor-product";
import { useContext, useEffect } from "react";
import { UserAutenticado } from "../../../context/authContext";
import {DataUser} from "../../../context/dataUser"
import api from "../../../config/config";

export default function OrderUser() {

    const { token } = useContext(UserAutenticado)
    const user = useContext(DataUser)

    console.log(user)
    
    useEffect(() => {
        async function getOrderUser() {
            if (token) {
                try {
                    const response = await api.get("/Order/User", {headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }})

                    console.log(response)
                } catch (error) {
                    console.log(error)
                }
            }
        }

        getOrderUser()
    }, [])

    return (
        <div>
            <InforProduct />
        </div>
    )
}