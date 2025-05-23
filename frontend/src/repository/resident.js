import apiClient, { fetchSanctumCookie } from "../lib/axios";

export const residents = {
    getAll: async () => {
        try {
            const res = await apiClient("api/residents")
            if (res.status !== 200) throw Error("failed fetch for " + "api/residents")

            return res.data
        } catch (error) {
            console.error("🆇 Post Request Failed:", error);
            return { errors: error.response.data }
        }
    },
    create: async (request) => {
        try {
            await fetchSanctumCookie();


            const res = await apiClient.post("api/residents", request)

            if (res.status !== 200 && res.status !== 201) {
                return res.data.message
            }

            const responseData = await res.data;

            return responseData;

        } catch (error) {
            console.error("🆇 Post Request to Create Failed:", error);
            return { errors: error.response.data }
        }
    },
    update: async (request, id) => {
        try {
            await fetchSanctumCookie();



            const res = await apiClient.post("api/residents/" + id, request, {
                params: {
                    "_method": "PUT",
                }
            })



            if (res.status !== 200) {
                throw new Error("Network response was not ok");
            }

            const responseData = await res.data;

            return responseData;


        } catch (error) {
            console.error("🆇 Post Request to Create Failed:", error);
        }
    },
    getHouseById: async (id) => {
        try {
            await fetchSanctumCookie();

            const res = await apiClient.get("/api/house-residents", {
                params: {
                    resident_id: id
                }
            })
            if (res.status !== 200) throw Error("failed fetch for " + "/resident/" + id + "/house")

            return res.data
        }
        catch (error) {
            console.error("🆇 Post Request Failed:", error);
        }
    }
}