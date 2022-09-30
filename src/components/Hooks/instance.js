
import axios from "axios";
const url = "https://chatserver.mdtamiz.xyz";
// const url = 'http://localhost:5000'
const api = axios.create({
    baseURL: url,
    headers: {
        token: localStorage.getItem("token"),
        "content-type": "application/json",
    },
});

export default api;