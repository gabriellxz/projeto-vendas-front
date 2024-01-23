import axios from 'axios';

const api = axios.create({
    baseURL: "https://vendas-online-coral.vercel.app"
});

export default api;