import api from "../config/config";

export function findById(id: number, token: string) {
    return api.get(`/Product/${id}`, {
        headers: {
            "Authorization": `Bearer ${JSON.parse(token)}`
        }
    })
}