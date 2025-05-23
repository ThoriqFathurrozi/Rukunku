import React, { useEffect, useState } from "react";
import { Modal } from "../../../components/modal";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { InputForm } from "../../../components/form/Input";
import { houses } from "../../../repository/house";

export default function Edit({ row }) {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      number: row.number,
      address: row.address,
    },
  });

  const busy = isSubmitting;

  const onClose = React.useCallback(() => {
    reset();
    setIsOpen(!isOpen);
  }, [reset, isOpen]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const res = await houses.update(formData, row.house_id);
    const success = res.message.includes("successfully");
    if (!success) return;
    onClose();
    navigate("/house");
  };

  const onError = () => {
    console.log("errors");
  };

  useEffect(() => {
    if (!isOpen) return;

    setValue("number", row.number);
    setValue("address", row.address);
  }, [isOpen, row, setValue]);

  return (
    <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Edit">
      <div className="flex flex-row-reverse justify-between items-center">
        <Button aria-label="Close modal" onClick={() => onClose()}>
          &times;
        </Button>
        <h1 className="text-lg">Edit House</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <InputForm
            name="number"
            id="number"
            type="text"
            label="House Number"
            register={register("number", { required: true })}
            placeholder="House Number"
          />
          <InputForm
            name="address"
            id="address"
            type="text"
            placeholder="House Address"
            register={register("address", { required: true })}
          />
          <br />
          <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
        </form>
      </div>
    </Modal>
  );
}
