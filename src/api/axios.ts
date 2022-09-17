import { clientConfig } from "@/config/client-env"
import Axios from "axios"

export const axios = Axios.create({
    baseURL: clientConfig.api.BASE,
})

axios.interceptors.request.use((request) => {
    const token = localStorage.getItem("token")

    if (token) {
        request.headers!["Authorization"] = `Bearer ${token}`
    }

    return request
}
)
