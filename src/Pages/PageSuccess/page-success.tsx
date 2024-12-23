import { CheckCircleIcon } from "@heroicons/react/16/solid";
import logo from "../../assets/yeshuá.svg"
import { useContext, useEffect, useState } from "react";
import { UserAutenticado } from "../../context/authContext";
import { Box, Button, Modal } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./components/MyDocument";
import api from "../../config/config";
import { CompleteOrder } from "./typePayment";

export default function PageSuccess() {

    const location = useLocation()
    const navigate = useNavigate()
    const { user, token } = useContext(UserAutenticado)
    const [open, setOpen] = useState<boolean>(false)
    const [inforPayment, setInforPayment] = useState<CompleteOrder>()

    function handleOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    function redirect() {
        navigate("/")
    }

    async function sendSessionId(sessionId: string) {
        try {
            if (token) {
                const response = await api.get(`/Order/by-session/${sessionId}`, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(token)
                    }
                })

                console.log(response.data)
                setInforPayment(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const sessionId = queryParams.get("session_id")

        if (sessionId) {
            sendSessionId(sessionId)
        }
    }, [location])


    return (
        <>
            <div className="flex justify-center items-center flex-col h-screen">
                <div className="flex gap-5">
                    <CheckCircleIcon className="w-[100px] text-green-700" />
                    <img src={logo} alt="logo" className="max-w-[120px] w-full" />
                </div>
                <p className="text-3xl uppercase text-center">
                    Pagamento efetuado com sucesso! Obrigado pela preferência, {user?.name}!
                </p>
                <div className="mt-5 mb-5">
                    <Button onClick={redirect} variant="outlined">Voltar para o catálogo</Button>
                </div>
                <div>
                    <Button variant="outlined" onClick={handleOpen}>Visulizar recibo</Button>
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        maxWidth: "500px",
                        width: "100%",
                        backgroundColor: "#fff",
                        padding: "20px",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <div className="w-full h-64 overflow-hidden border border-gray-300 rounded mb-4">
                        <PDFViewer width="100%" height="100%" showToolbar={false}>
                            <MyDocument orderPDF={inforPayment} />
                        </PDFViewer>
                    </div>
                    <PDFDownloadLink document={<MyDocument orderPDF={inforPayment} />} fileName={`recibo-${user?.name}.pdf`}>
                        <Button variant="outlined">Fazer download</Button>
                    </PDFDownloadLink>
                </Box>
            </Modal>
        </>
    );
}