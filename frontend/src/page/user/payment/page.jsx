import React from "react";
import { useLoaderData } from "react-router";
import CreatePayment from "./create";
import EditPayment from "./edit";
import { formatCurrency, formatDate } from "../../../lib/utils";
import Badge from "../../../components/ui/badge";

export default function PaymentPage() {
  const { payments } = useLoaderData();

  return (
    <div>
      <div className="text-3xl font-semibold py-2 mb-8">Payments</div>
      <div>
        <CreatePayment />
      </div>
      <section>
        <table className="w-full my-0 text-dark border-neutral-200">
          <thead className="align-bottom">
            <tr className="font-semibold text-[0.95rem]">
              <th className="text-gray-800 text-start">Payment Date</th>
              <th className="text-gray-800 text-start px-2">Status</th>
              <th className="text-start px-2">House</th>
              <th className="text-start px-2">Resident</th>
              <th className="text-start px-2">Total</th>
              <th className="text-start px-2">Total Month</th>
              <th className="text-start px-2">Description</th>
              <th className="text-start px-2">Category</th>
            </tr>
          </thead>
          <tbody>
            {payments.length ? (
              payments.map((row) => {
                return (
                  <tr
                    key={row.resident_id}
                    className="border-b border-dashed last:border-b-0"
                  >
                    <td className="p-3 pl-0" key={row.payment_date}>
                      {formatDate(row.payment_date)}
                    </td>
                    <td key={row.status}>
                      <Badge text={row.status} />{" "}
                    </td>
                    <td key={row.house.house_id} className="">
                      <div className="flex items-center gap-2">
                        <Badge text={row.house.number} />
                        <h6 className="font-medium">{row.house.address}</h6>
                      </div>
                    </td>
                    <td key={row.resident.full_name}>
                      <div className="flex items-center gap-2">
                        <h6>{row.resident.full_name}</h6>
                        <Badge text={row.resident.resident_status} />
                      </div>
                    </td>
                    <td key={row.total} className="px-2">
                      {formatCurrency(row.total_payment)}
                    </td>
                    <td key={row.total_month} className="px-2">
                      {row.total_month}
                    </td>
                    <td key={row.description}>{row.description}</td>
                    <td key={row.category.category_id}>
                      <Badge text={row.category.name} />
                    </td>
                    <td className>
                      <div className="flex gap-2 h-full w-full px-2">
                        <EditPayment row={row} />
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={payments.length} className="h-24 text-center">
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
