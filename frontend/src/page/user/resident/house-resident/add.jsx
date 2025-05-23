import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { houseResident } from "../../../../repository/house-resident";
import apiClient from "../../../../lib/axios";
import { InputForm } from "../../../../components/form/Input";
import { Modal } from "../../../../components/modal";
import { SelectForm } from "../../../../components/form/select";

export default function AddHouseResident({ residentId }) {
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
      resident_id: residentId,
      house_id: "",
      start_date: "",
      end_date: "",
    },
  });
  const [optionCreate, setOptionCreate] = useState({
    houses: [],
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
    navigate("/resident/" + residentId + "/house");
  };

  const onError = () => {
    console.log("errors");
  };

  // Close on Escape key
  useEffect(() => {
    if (optionCreate.houses == 0)
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
              id="house_id"
              label="House"
              options={optionCreate.houses.map((value) => ({
                label: value.number,
                value: value.house_id,
              }))}
              {...register("house_id", { required: true })}
              onChangeSelect={(e) => setValue("house_id", e.target.value)}
            />
            <InputForm
              label="Start Date"
              type="date"
              id="start_date"
              register={register("start_date", { required: true })}
            />
            <InputForm
              label="End Date"
              type="date"
              id="end_date"
              register={register("end_date", { required: true })}
            />
            <br />
            <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
          </form>
        </div>
      </Modal>
    </>
  );
}
