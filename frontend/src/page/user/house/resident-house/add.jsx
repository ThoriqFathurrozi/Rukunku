import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { houseResident } from "../../../../repository/house-resident";
import { Modal } from "../../../../components/modal";
import { Button } from "../../../../components/ui/button";
import apiClient from "../../../../lib/axios";
import { SelectForm } from "../../../../components/form/select";
import { InputForm } from "../../../../components/form/Input";

export default function AddResidentHouse({ houseId }) {
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
      resident_id: "",
      house_id: houseId,
      start_date: "",
      end_date: "",
    },
  });
  const [optionCreate, setOptionCreate] = useState({
    residents: [],
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

    const res = await houseResident.create(formData);

    const success = res.message.includes("successfully");
    if (!success) return;

    onClose();
    navigate("/house/" + houseId + "/resident");
  };

  const onError = () => {
    console.log("errors");
  };

  // Close on Escape key
  useEffect(() => {
    if (optionCreate.residents == 0)
      (async () => {
        const res = await apiClient("/api/house-residents/create");
        setOptionCreate(res.data);
      })();
  }, [onClose, optionCreate, setValue]);

  return (
    <>
      <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Add House">
        <div className="flex flex-row-reverse justify-between items-center">
          <Button aria-label="Close modal" onClick={() => onClose()}>
            &times;
          </Button>
          <h1 className="text-lg">Add new house</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <SelectForm
              id="resident_id"
              label="Resident"
              options={optionCreate.residents.map((value) => ({
                label: value.full_name,
                value: value.resident_id,
              }))}
              {...register("resident_id", { required: true })}
              onChangeSelect={(e) => setValue("resident_id", e.target.value)}
            />
            <InputForm
              name="start_date"
              type="date"
              label="Start Date"
              register={register("start_date", { required: true })}
            />
            <InputForm
              type="date"
              name="end_date"
              id="end_date"
              label="End Date"
              register={register("end_date")}
            />
            <br />
            <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
