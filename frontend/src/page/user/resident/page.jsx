import React from "react";
import { Link, useLoaderData } from "react-router";
import Create from "./create";
import apiClient from "../../../lib/axios";
import EditPage from "./edit";
import { Button } from "../../../components/ui/button";
import Badge from "../../../components/ui/badge";

export default function ResidentPage() {
  const residents = useLoaderData();

  async function fetchPrivateImage(id, url) {
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
      const defaultUrl = URL.createObjectURL(url);
      document.getElementById("preview-" + id).src = defaultUrl;
      return null;
    }

    // Optionally: convert to object URL and display
    const imageUrl = URL.createObjectURL(response.data);
    document.getElementById("preview-" + id).src = imageUrl;
  }

  return (
    <div>
      <div className="text-3xl font-semibold py-2 mb-8">Residents</div>
      <div>
        <Create />
      </div>
      <section>
        <table className="w-full my-0 text-dark border-neutral-200">
          <thead className="align-bottom">
            <tr className="font-semibold text-[0.95rem]">
              <th>Identification Card</th>
              <th className="text-gray-800 text-start">Full Name</th>
              <th className="text-start">Maritial Status</th>
              <th className="text-start">Phone Number</th>
              <th className="text-start">Resident Status</th>
            </tr>
          </thead>
          <tbody>
            {residents.length ? (
              residents.map((row) => (
                <tr
                  key={row.resident_id}
                  className="border-b border-dashed last:border-b-0"
                >
                  <td key={row.resident_id}>
                    <img
                      className="w-96 h-56 my-2"
                      id={"preview-" + row.resident_id}
                      src={
                        fetchPrivateImage(
                          row.resident_id,
                          row.identification_card_img
                        ) ?? row.identification_card_img
                      }
                      alt=""
                    />
                  </td>
                  <td className="p-3 pl-0" key={row.full_name}>
                    {row.full_name}
                  </td>
                  <td key={row.maritial_status}>
                    <Badge text={row.maritial_status} />
                  </td>
                  <td key={row.phone_number}>{row.phone_number}</td>
                  <td key={row.resident_status}>
                    <Badge text={row.resident_status} />
                  </td>
                  <td>
                    <div className="flex gap-2 h-full w-full">
                      <EditPage row={row} />
                      <Link to={`${row.resident_id}/house`}>
                        <Button> Show House</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={residents.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
