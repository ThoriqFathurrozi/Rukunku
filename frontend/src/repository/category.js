import apiClient, { fetchSanctumCookie } from "../lib/axios";


export const category = {
    getAll: async () => {
        try {
            const res = await apiClient.get("api/categories");
            return res.data;
        } catch (error) {
            console.error("🆇 Get Request to Fetch Failed:", error);
        }
    },
    create: async (formData) => {
        const endpoint = '/api/categories'

        try {
            await fetchSanctumCookie();

            const res = await apiClient.post(endpoint, formData)

            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Network response was not ok");
            }

            return res.data
        } catch (e) {
            console.error("🆇 Post Request Failed:", e);
        }

    },
    update: async (formData, id) => {
        const endpoint = '/api/categories/' + id

        try {
            await fetchSanctumCookie();

            const res = await apiClient.post(endpoint, formData, {
                params: {
                    "_method": "PUT",
                }
            })

            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Network response was not ok");
            }

            return res.data
        } catch (e) {
            console.error("🆇 Post Request Failed:", e);
        }
    }
}