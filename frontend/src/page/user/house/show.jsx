import apiClient from "../../../lib/axios";
import { useLoaderData } from "react-router";
import EditResidentHouse from "./resident-house/edit";
import AddResidentHouse from "./resident-house/add";
import SimpleCard from "../../../components/card/card-simple";
import Badge from "../../../components/ui/badge";
import { formatDate } from "../../../lib/utils";

export function ShowHistoricalResident() {
  const { house, houseResidents } = useLoaderData();

  if (!house) {
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
      <h1 className="text-3xl font-semibold">House Residents</h1>
      <div className="mt-2 py-1">
        <div className="max-w-lg bg-white rounded-xl shadow-md p-6 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">House Data</h1>
          <div className="space-y-4 text-gray-700">
            <div className="flex gap-2 items-center">
              <Badge text={house.number} /> <Badge text={house.status} />
            </div>
            <p>
              <span className="font-semibold">Address:</span> {house.address}
            </p>
          </div>
        </div>
        <div className="">
          <AddResidentHouse houseId={house.house_id} />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {houseResidents.map((row) => (
          <SimpleCard key={row.resident_id}>
            <h3 className="text-xl font-semibold">Resident</h3>
            <div>
              <p>{row.resident.full_name}</p>
              <div className="flex gap-2 items-center">
                <Badge text={row.resident.maritial_status} />
                <Badge text={row.resident.resident_status} />
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-1 mt-2">
              occupants from{" "}
              <span className="text-gray-700 font-medium">
                {formatDate(row.start_date)}
              </span>
              {" to "}
              <span className="text-gray-700 font-medium">
                {formatDate(row.end_date)}
              </span>
            </p>
            <div className="py-2 flex justify-end">
              <EditResidentHouse row={row} />
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  );
}
