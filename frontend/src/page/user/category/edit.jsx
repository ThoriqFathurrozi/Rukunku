import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Modal } from "../../../components/modal";
import { category } from "../../../repository/category";
import apiClient from "../../../lib/axios";
import { SelectForm } from "../../../components/form/select";
import { InputForm } from "../../../components/form/Input";

export default function EditCategory({ row }) {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [optionType, setOptionType] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: row.name,
      description: row.description,
      type: row.type,
    },
  });

  const busy = isSubmitting;

  const onClose = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const res = await category.update(formData, row.category_id);

    const success = res.message.includes("successfully");
    if (!success) return;

    onClose();
    navigate("/category");
  };

  const onError = (e) => {
    console.log(e);
  };

  useEffect(() => {
    if (!isOpen) return;
    if (optionType.length === 0) {
      (async () => {
        const res = await apiClient("api/categories/create");
        setOptionType(res.data.categoryType);
      })();
    }
    setValue("name", row.name);
    setValue("description", row.description);
    setValue("type", row.type);
  }, [isOpen, optionType, setValue, row]);

  return (
    <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Edit">
      <div className="flex flex-row-reverse justify-between items-center">
        <Button aria-label="Close modal" onClick={() => setIsOpen(false)}>
          &times;
        </Button>
        <h1 className="text-lg">Edit Category</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <InputForm
            type="text"
            placeholder="Category Name"
            name="name"
            id="name"
            label="Category Name"
            register={register("name", { required: true })}
            required
          />

          <InputForm
            type="text"
            placeholder="Category Description"
            name="description"
            id="description"
            label="Category Description"
            register={register("description", { required: true })}
            required
          />
          <SelectForm
            id="type"
            label="Category Type"
            name="type"
            register={register("type", { required: true })}
            options={
              optionType &&
              optionType.map((value) => ({
                label: value,
                value: value,
              }))
            }
          />
          <br />
          <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
        </form>
      </div>
    </Modal>
  );
}
