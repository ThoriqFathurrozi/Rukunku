import apiClient, { fetchSanctumCookie } from "../lib/axios"

export const payment = {
    getAll: async () => {
        const endpoint = "api/payments"

        try {
            const res = await apiClient(endpoint)
            if (res.status !== 200) throw Error("failed fetch for " + endpoint)
            return res.data
        } catch (error) {
            console.error("🆇 Post Request Failed:", error);
        }
    },
    create: async (formData) => {
        const endpoint = "api/payments"

        try {
            await fetchSanctumCookie();

            const res = await apiClient.post(endpoint, formData)

            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Network response was not ok");
            }

            return res.data

        } catch (error) {
            console.error("🆇 Post Request Failed:", error);
        }
    },
    update: async (formData, id) => {
        const endpoint = "api/payments/" + id

        try {
            await fetchSanctumCookie();

            const res = await apiClient.post(endpoint, formData, {
                params: {
                    "_method": "PUT",
                }
            })

            if (res.status !== 200) {
                throw new Error("Network response was not ok");
            }

            return res.data

        } catch (error) {
            console.error("🆇 Post Request Failed:", error);
        }
    }
}