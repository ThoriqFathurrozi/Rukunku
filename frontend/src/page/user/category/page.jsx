import React from "react";
import { useLoaderData } from "react-router";
import CreateCategory from "./create";
import EditCategory from "./edit";
import Badge from "../../../components/ui/badge";

export default function CategoryPage() {
  const categories = useLoaderData();

  return (
    <div>
      <div className="text-3xl font-semibold py-2 mb-8">Category</div>
      <div>
        <CreateCategory />
      </div>
      <section>
        <table className="w-full my-0 text-dark border-neutral-200">
          <thead className="align-bottom">
            <tr className="font-semibold text-[0.95rem]">
              <th className="text-gray-800 text-start">Name</th>
              <th className="text-start">Description</th>
              <th className="text-start">Type</th>
            </tr>
          </thead>
          <tbody>
            {categories.length ? (
              categories.map((row) => (
                <tr
                  key={row.resident_id}
                  className="border-b border-dashed last:border-b-0"
                >
                  <td className="p-3 pl-0" key={row.name}>
                    <Badge text={row.name} />
                  </td>
                  <td key={row.description}>{row.description}</td>
                  <td key={row.type}>
                    <Badge text={row.type} />
                  </td>
                  <td>
                    <div className="flex gap-2 h-full w-full">
                      <EditCategory row={row} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={categories.length} className="h-24 text-center">
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
