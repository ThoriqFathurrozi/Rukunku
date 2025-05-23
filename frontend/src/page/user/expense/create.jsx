import React, { useEffect } from "react";
import { useFetcher } from "react-router";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Modal } from "../../../components/modal";
import { Button } from "../../../components/ui/button";
import apiClient from "../../../lib/axios";
import { SelectForm } from "../../../components/form/select";
import { InputForm } from "../../../components/form/Input";

export default function CreateExpense() {
  const [isOpen, setIsOpen] = React.useState(false);
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";
  const success = fetcher.state === "loading";

  const [optionCategory, setOptionCategory] = React.useState([]);

  const onClose = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (optionCategory.length === 0) {
      (async () => {
        const res = await apiClient("/api/categories?type=expense");
        setOptionCategory(res.data);
      })();
    }

    if (busy && success) {
      onClose();
    }
  }, [busy, success, optionCategory.length, onClose]);

  return (
    <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Create">
      <div className="flex flex-row-reverse justify-between items-center">
        <Button aria-label="Close modal" onClick={() => setIsOpen(false)}>
          &times;
        </Button>
        <h1 className="text-lg">Add new expense</h1>
      </div>
      <div>
        <fetcher.Form method="post">
          <InputForm
            name="expense_date"
            type="date"
            label="Expense Date"
            placeholder="Expense Date"
            required
          />
          <InputForm
            required
            type="number"
            placeholder="Expense Total"
            name="expense_total"
            id="expense_total"
            label="Expense Total"
          />
          <InputForm
            required
            type="text"
            placeholder="Description"
            name="description"
            id="description"
            label="Description"
          />
          <SelectForm
            required
            id="category"
            label="Category"
            name="category"
            options={optionCategory.map((value) => ({
              label: value.name,
              value: value.category_id,
            }))}
          />
          <br />
          <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
        </fetcher.Form>
      </div>
    </Modal>
  );
}
