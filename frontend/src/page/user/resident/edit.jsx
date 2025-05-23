import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useForm } from "react-hook-form";
import { residents } from "../../../repository/resident";
import { Modal } from "../../../components/modal";
import apiClient from "../../../lib/axios";
import { InputForm } from "../../../components/form/Input";
import { SelectForm } from "../../../components/form/select";

export default function EditPage({ row }) {
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
      full_name: row.full_name,
      maritial_status: row.maritial_status,
      resident_status: row.resident_status,
      phone_number: row.phone_number,
    },
  });

  const busy = isSubmitting;

  const [optionCreate, setOptionCreate] = useState({
    maritial_status: [],
    resident_status: [],
  });

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

    const res = await residents.update(formData, row.resident_id);

    const success = res.message.includes("successfully");
    if (!success) return;

    onClose();
    navigate("/resident");
  };

  const onError = () => {
    console.log("errors");
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    if (optionCreate.maritial_status == 0 && optionCreate.resident_status == 0)
      (async () => {
        const res = await apiClient("/api/residents/create");
        setOptionCreate(res.data);
      })();

    setValue("maritial_status", row.maritial_status);
    setValue("resident_status", row.resident_status);
  }, [isOpen, onClose, optionCreate, setValue, row]);

  return (
    <>
      <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Edit">
        <div className="flex flex-row-reverse justify-between items-center">
          <Button aria-label="Close modal" onClick={() => onClose()}>
            &times;
          </Button>
          <h1 className="text-lg">Add new resident</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <InputForm
              label="Full Name"
              type="text"
              name="full_name"
              id="full_name"
              placeholder="Full Name"
              register={register("full_name", { required: true })}
            />
            <SelectForm
              id="martialStatus"
              label="Maritial Status"
              options={optionCreate.maritial_status.map((value) => ({
                label: value,
                value: value,
              }))}
              {...register("maritial_status", { required: true })}
              onChangeSelect={(e) =>
                setValue("maritial_status", e.target.value)
              }
            />
            <SelectForm
              id="resident_status"
              label="Resident Status"
              options={optionCreate.resident_status.map((value) => ({
                label: value,
                value: value,
              }))}
              {...register("resident_status", { required: true })}
              onChangeSelect={(e) =>
                setValue("resident_status", e.target.value)
              }
            />
            <InputForm
              label="Phone Number"
              type="text"
              name="phone_number"
              id="phone_number"
              placeholder="Phone Number"
              register={register("phone_number", { required: true })}
            />
            <Label htmlFor="identification_card_img">Identification Card</Label>
            <Input
              type="file"
              name="identification_card_img"
              id="identification_card_img"
              accept="image/*"
              placeholder="Identification Card"
              register={register("identification_card_img")}
            />
            <br />
            <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
