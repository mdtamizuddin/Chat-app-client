
import axios from "axios";
const url = "https://chat-server-omega.vercel.app/";
// const url = 'http://localhost:5000'
const api = axios.create({
    baseURL: url,
    headers: {
        token: localStorage.getItem("token"),
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
});

export default api;