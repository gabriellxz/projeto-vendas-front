import { useState } from "react"

export default function useValidation() {
    
    const [validation, setValidation] = useState({
        type: "",
        message: "",
        loading: false
    })

    return{
        validation,
        setValidation
    }
}