import apiClient, { fetchSanctumCookie } from "../lib/axios";

export const houses = {
    getAll: async () => {
        try {
            const res = await apiClient("/api/houses", {
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            })

            return res.data

        } catch (error) {
            console.error("🆇 Post Request Failed:", error);
        }
    },
    create: async (formData) => {
        try {
            await fetchSanctumCookie();


            const res = await apiClient.post("/api/houses", formData)

            if (res.status !== 200) {
                throw new Error("Network response was not ok");
            }

            return res.data

        } catch (error) {
            console.error("🆇 Post Request Failed:", error);
        }
    },
    update: async (formData, id) => {
        try {
            await fetchSanctumCookie();


            const res = await apiClient.post("/api/houses/" + id, formData, {
                params: {
                    _method: "PUT"
                }
            })

            return res.data

        } catch (error) {
            console.error("🆇 Post Request Failed:", error);
        }
    },
    getResidentById: async (id) => {
        try {
            const res = await apiClient("/api/house-residents", {
                params: {
                    house_id: id
                }
            })

            return res.data

        } catch (error) {
            console.error("🆇 Post Request Failed:", error);
        }
    }
}
