import React from "react";
import { Link, useLoaderData } from "react-router";
import { Create } from "./create";
import Edit from "./edit";
import { Button } from "../../../components/ui/button";
import Badge from "../../../components/ui/badge";

export default function HousePage() {
  const houses = useLoaderData();

  return (
    <div>
      <div className="text-3xl font-semibold py-2 mb-8">Houses</div>
      <div>
        <Create />
      </div>
      <section>
        <table className="w-full my-0 text-dark border-neutral-200">
          <thead className="align-bottom">
            <tr className="font-semibold text-[0.95rem]">
              <th className="text-gray-800 text-start">Number</th>
              <th className="text-start">Address</th>
              <th className="text-start">Status</th>
            </tr>
          </thead>
          <tbody>
            {houses.length ? (
              houses.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b border-dashed last:border-b-0"
                >
                  <td key={row.number}>{row.number}</td>
                  <td key={row.address}>{row.address}</td>
                  <td key={index}>
                    <Badge text={row.status} />
                  </td>
                  <td>
                    <div className="flex gap-2 h-full w-full py-2">
                      <Edit row={row} />
                      <Link to={`${row.house_id}/resident`}>
                        <Button> Show Residents</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={houses.length} className="h-24 text-center">
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
