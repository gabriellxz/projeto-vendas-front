import axios from 'axios';

const api = axios.create({
    baseURL: "https://vendas-online-ruddy.vercel.app"
});

export default api;