import axios from "axios";
import { redirect } from "react-router";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
    withCredentials: true,
    withXSRFToken: true,
});

export const fetchSanctumCookie = async () => {
    try {
        await apiClient.get(import.meta.env.VITE_API_BASE_URL + "/sanctum/csrf-cookie", {
            withCredentials: true,
            credentials: "include",
        })
    } catch (error) {
        console.error("🆇 Failed to fetch CSRF cookie:", error);
    }
};

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401 && error.response.data.message === "Unauthenticated.") {
            localStorage.removeItem("token");
            redirect("/login");
        }
        return Promise.reject(error);
    }
);


export default apiClient;

