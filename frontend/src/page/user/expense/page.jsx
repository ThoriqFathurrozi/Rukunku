import React from "react";
import { useLoaderData } from "react-router";
import CreateExpense from "./create";
import EditExpense from "./edit";
import Badge from "../../../components/ui/badge";
import { formatDate } from "../../../lib/utils";

export default function ExpensePage() {
  const { expenses } = useLoaderData();

  return (
    <div>
      <div className="text-3xl font-semibold py-2 mb-8">Expenses</div>
      <div>
        <CreateExpense />
      </div>
      <section>
        <table className="w-full my-0 text-dark border-neutral-200">
          <thead className="align-bottom">
            <tr className="font-semibold text-[0.95rem]">
              <th className="text-gray-800 text-start">Expense Date</th>
              <th className="text-start">Expense Total</th>
              <th className="text-start">Description</th>
              <th className="text-start">Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length ? (
              expenses.map((row) => (
                <tr
                  key={row.resident_id}
                  className="border-b border-dashed last:border-b-0"
                >
                  <td className="p-3 pl-0" key={row.date}>
                    {formatDate(row.date)}
                  </td>
                  <td key={row.total}>{row.total}</td>
                  <td key={row.description}>{row.description}</td>
                  <td key={row.category.name}>
                    <Badge text={row.category.name} />
                  </td>
                  <td>
                    <div className="flex gap-2 h-full w-full">
                      <EditExpense row={row} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={expenses.length} className="h-24 text-center">
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
