import { useEffect, useState } from "react";
import api from "./instance";
import jwt_decode from "jwt-decode";

const useUser = () => {
    const [user, setUser] = useState({})
    const token = localStorage.getItem('accessToken')

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token);
            api.get(`/api/user/${decoded.email}`)
                .then(res => setUser(res.data))
        }
    }, [token])

    return user
}

export default useUser