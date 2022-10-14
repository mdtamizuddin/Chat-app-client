
import axios from "axios";
const url = "https://mdtamiz.xyz";
// const url = 'http://localhost:3001'
const api = axios.create({
    baseURL: url,
    headers: {
        token: localStorage.getItem("token"),
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
});

export default api;