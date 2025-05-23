import React, { useEffect, useState } from "react";
import { Modal } from "../../../../components/modal";
import { Button } from "../../../../components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { houseResident } from "../../../../repository/house-resident";
import { format } from "date-fns";
import apiClient from "../../../../lib/axios";
import { SelectForm } from "../../../../components/form/select";
import { InputForm } from "../../../../components/form/Input";

export default function EditHouseResident({ row }) {
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
      resident_id: row.foreign_resident_id,
      house_id: row.foreign_house_id,
      start_date: format(new Date(row.start_date), "yyyy-MM-dd"),
      end_date: format(new Date(row.end_date), "yyyy-MM-dd"),
    },
  });
  const [optionCreate, setOptionCreate] = useState({
    houses: [],
  });

  const busy = isSubmitting;

  const onClose = React.useCallback(() => {
    setIsOpen(!isOpen);
    reset();
  }, [reset, isOpen]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const res = await houseResident.update(formData, row.house_resident_id);

    console.log(res);
    const success = res.message.includes("successfully");
    if (!success) return;

    onClose();
    navigate("/resident/" + row.foreign_resident_id + "/house");
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

    setValue("house_id", row.foreign_house_id);
  }, [onClose, optionCreate, setValue, row]);

  return (
    <>
      <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Edit House">
        <div className="flex flex-row-reverse justify-between items-center">
          <Button aria-label="Close modal" onClick={() => onClose()}>
            &times;
          </Button>
          <h1 className="text-lg">Edit house</h1>
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
