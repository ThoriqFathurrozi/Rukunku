import apiClient, { fetchSanctumCookie } from "../lib/axios";

export const houseResident = {
    create: async (request) => {
        try {
            await fetchSanctumCookie();


            const res = await apiClient.post("api/house-residents", request,)

            if (res.status !== 201 && res.status !== 200) {
                throw new Error("Network response was not ok");
            }

            const responseData = await res.data;

            return responseData;
        }
        catch (error) {
            console.error("🆇 Post Request to Create Failed:", error);
        }
    },
    update: async (request, id) => {
        try {
            await fetchSanctumCookie();


            const res = await apiClient.post("api/house-residents/" + id, request, {
                params: {
                    "_method": "PUT",
                }
            })

            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Network response was not ok");
            }

            const responseData = await res.data;

            return responseData;
        }
        catch (error) {
            console.error("🆇 Post Request to Create Failed:", error);
        }
    }
}



