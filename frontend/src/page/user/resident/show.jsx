import React from "react";
import { useLoaderData } from "react-router";
import apiClient from "../../../lib/axios";
import AddHouseResident from "./house-resident/add";
import EditHouseResident from "./house-resident/edit";
import { formatDate } from "../../../lib/utils";
import Badge from "../../../components/ui/badge";
import SimpleCard from "../../../components/card/card-simple";

export function ShowHistoricalHouse() {
  const { resident, residentHouse } = useLoaderData();

  if (!resident) {
    return <div>Resident not found</div>;
  }

  async function fetchPrivateImage(id) {
    const response = await apiClient.get(
      `api/residents/stream-identification-card/${id}`,
      {
        responseType: "blob",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("File not found");
    }

    // Optionally: convert to object URL and display
    const imageUrl = URL.createObjectURL(response.data);
    document.getElementById("preview-card").src = imageUrl;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">Resident House</h1>
      <div className="my-4 flex flex-col gap-6">
        <div className="max-w-lg bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Resident Data
          </h1>
          <div className="flex gap-6 items-center">
            <img
              className="w-40 h-28 rounded-lg object-cover border-2 border-indigo-400"
              src={fetchPrivateImage(resident.resident_id)}
              alt={`${resident.full_name} photo`}
              id="preview-card"
            />
            <div className="text-gray-700 space-y-2">
              <p>
                <span className="font-semibold">Name:</span>{" "}
                {resident.full_name}
              </p>
              <p>
                <span className="font-semibold">Marital Status:</span>{" "}
                {resident.maritial_status}
              </p>
              <p>
                <span className="font-semibold">Resident Status:</span>{" "}
                {resident.resident_status}
              </p>
              <p>
                <span className="font-semibold">Phone Number:</span>{" "}
                {resident.phone_number}
              </p>
            </div>
          </div>
        </div>

        <div>
          <AddHouseResident residentId={resident.resident_id} />
        </div>
      </div>

      <div className="flex w-full flex-wrap items-start gap-2">
        {residentHouse.map((row) => (
          <SimpleCard key={row.resident_id}>
            <div className="font-semibold flex items-center justify-between text-lg mb-1">
              <h5>House</h5>
              <div className="flex gap-1">
                <Badge text={row.house.number} />
                <Badge text={row.house.status} />
              </div>
            </div>
            <p className="text-gray-600 mb-3">
              <span className="italic">{row.house.address}</span>
            </p>
            <p className="text-sm text-gray-500 mb-1">
              occupants from{" "}
              <span className="text-gray-700 font-medium">
                {formatDate(row.start_date)}
              </span>
              {" to "}
              <span className="text-gray-700 font-medium">
                {formatDate(row.end_date)}
              </span>
            </p>
            <div className="py-2 flex justify-end w-full">
              <EditHouseResident row={row} />
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  );
}
