import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import { houseResident } from "../../../../repository/house-resident";
import apiClient from "../../../../lib/axios";
import { Modal } from "../../../../components/modal";
import { Button } from "../../../../components/ui/button";
import { SelectForm } from "../../../../components/form/select";
import { InputForm } from "../../../../components/form/Input";

export default function EditResidentHouse({ row }) {
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
      house_id: row.foreign_house_id,
      resident_id: row.foreign_resident_id,
      start_date: format(new Date(row.start_date), "yyyy-MM-dd"),
      end_date: format(new Date(row.end_date), "yyyy-MM-dd"),
    },
  });
  const [optionCreate, setOptionCreate] = useState({
    residents: [],
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

    const success = res.message.includes("successfully");
    if (!success) return;

    onClose();
    navigate("/house/" + row.foreign_house_id + "/resident");
  };

  const onError = () => {
    console.log("errors");
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    if (optionCreate.residents == 0) {
      (async () => {
        const res = await apiClient("/api/house-residents/create");
        setOptionCreate(res.data);
      })();
    }

    setValue("house_id", row.foreign_house_id);
    setValue("resident_id", row.foreign_resident_id);
    setValue("start_date", format(new Date(row.start_date), "yyyy-MM-dd"));
    setValue("end_date", format(new Date(row.end_date), "yyyy-MM-dd"));
  }, [isOpen, optionCreate, setValue, row]);

  return (
    <>
      <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Edit House">
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
              register={register("resident_id", { required: true })}
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
