
import { redirect } from "react-router";
import apiClient, { fetchSanctumCookie } from "../lib/axios";

export const auth = {
    login: async (request) => {
        try {
            await fetchSanctumCookie();
            const res = await apiClient.post("/api/login", request);

            if (res.status !== 200) {
                return res.message;
            }

            localStorage.setItem("token", res.data.token);

        } catch (error) {
            console.error("🆇 Post Request Failed:", error);
            return { errors: error.response.data }
        }
    },
    logout: async () => {
        try {
            await fetchSanctumCookie();
            const res = await apiClient.post("/api/logout");

            if (res.status !== 200) {
                return res.message;
            }

            localStorage.removeItem("token");

            return redirect("/login");
        } catch (error) {
            console.error("🆇 Post Request Failed:", error);
            return { errors: error.response.data }
        }
    }
}
