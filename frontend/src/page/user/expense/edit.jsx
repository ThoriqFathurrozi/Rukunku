import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { expense } from "../../../repository/expense";
import { Modal } from "../../../components/modal";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { format } from "date-fns";
import apiClient from "../../../lib/axios";
import { InputForm } from "../../../components/form/Input";
import { SelectForm } from "../../../components/form/select";

export default function EditExpense({ row }) {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      expense_date: format(new Date(row.date), "yyyy-MM-dd"),
      expense_total: row.total,
      category: row.foreign_category_id,
      description: row.description,
    },
  });

  const busy = isSubmitting;
  const [optionCategory, setOptionCategory] = React.useState([]);

  const onClose = React.useCallback(() => {
    reset();
    setIsOpen(!isOpen);
  }, [reset, isOpen]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (!(key == "identification_card_img" && data[key].length == 0))
        formData.append(key, data[key]);
    });

    const res = await expense.update(formData, row.expense_id);

    const success = res.message.includes("successfully");
    if (!success) return;

    onClose();
    navigate("/expense");
  };

  const onError = () => {
    console.log("errors");
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    if (optionCategory.length === 0) {
      (async () => {
        const res = await apiClient("/api/categories?type=expense");
        setOptionCategory(res.data);
      })();
    }

    setValue("category", row.foreign_category_id);
    setValue("expense_date", format(new Date(row.date), "yyyy-MM-dd"));
    setValue("expense_total", row.total);
    setValue("description", row.description);
  }, [isOpen, optionCategory, setValue, row]);

  return (
    <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Edit">
      <div className="flex flex-row-reverse justify-between items-center">
        <Button aria-label="Close modal" onClick={() => setIsOpen(false)}>
          &times;
        </Button>
        <h1 className="text-lg">Edit expense</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <InputForm
            name="expense_date"
            type="date"
            label="Expense Date"
            placeholder="Expense Date"
            register={register("expense_date", { required: true })}
            required
          />
          <InputForm
            type="number"
            placeholder="Expense Total"
            name="expense_total"
            id="expense_total"
            register={register("expense_total", { required: true })}
            label="Expense Total"
          />
          <InputForm
            type="text"
            placeholder="Description"
            name="description"
            id="description"
            label="Description"
            register={register("description", { required: true })}
          />
          <SelectForm
            id="category"
            label="Category"
            name="category"
            options={optionCategory.map((value) => ({
              label: value.name,
              value: value.category_id,
            }))}
            register={register("category", { required: true })}
            onChange={(e) => setValue("category", e.target.value)}
          />
          <br />
          <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
        </form>
      </div>
    </Modal>
  );
}
