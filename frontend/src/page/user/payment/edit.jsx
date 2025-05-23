import React, { useEffect, useState } from "react";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { useForm } from "react-hook-form";
import { Modal } from "../../../components/modal";
import { houses } from "../../../repository/house";
import { residents } from "../../../repository/resident";
import { format } from "date-fns";
import { payment } from "../../../repository/payment";
import { useNavigate } from "react-router";
import apiClient from "../../../lib/axios";
import { SelectForm } from "../../../components/form/select";
import { InputForm } from "../../../components/form/Input";

export default function EditPayment({ row }) {
  let navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const [optionCategory, setOptionCategory] = React.useState([]);

  const [optionStatus, setOptionStatus] = useState([]);

  const [optionCreateFilter, setOptionCreateFilter] = useState({
    houses: [],
    residents: [],
  });

  const [optionCreate, setOptionCreate] = React.useState({
    houses: [],
    residents: [],
  });

  const {
    getFieldState,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      house_id: row.foreign_house_id,
      resident_id: row.foreign_resident_id,
      category: row.foreign_category_id,
      payment_date: format(new Date(row.payment_date), "yyyy-MM-dd"),
      payment_total: row.total_payment,
      total_month: row.total_month,
      description: row.description,
      status: row.status,
    },
  });

  const busy = isSubmitting;

  const onClose = React.useCallback(() => {
    reset();
    setIsOpen((prev) => !prev);
  }, [reset]);

  async function filterResidentByHouse(house_id) {
    // filter resident by house
    if (house_id === "") return;
    if (getFieldState("resident_id") !== "") return;
    console.log("filter resident");

    const { houseResidents } = await houses.getResidentById(house_id);

    const residentInHouseId = houseResidents.map(
      (value) => value.resident.resident_id
    );

    if (residentInHouseId.length !== 0) {
      const data = optionCreate.residents.filter((value) => {
        return residentInHouseId.includes(value.resident_id);
      });

      setOptionCreateFilter((prev) => ({ ...prev, residents: data }));
    }
  }

  async function filterHouseByResident(resident_id) {
    // filter house by resident
    if (resident_id === "") return;
    if (getFieldState("house_id") !== "") return;

    console.log("filter house");

    const { residentHouse } = await residents.getHouseById(resident_id);

    const houseResidentId = residentHouse.map(
      (value) => value.foreign_house_id
    );

    if (houseResidentId.length !== 0) {
      const data = optionCreate.houses.filter((value) => {
        return houseResidentId.includes(value.house_id);
      });

      setOptionCreateFilter((prev) => ({ ...prev, houses: data }));
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    if (optionCategory.length === 0) {
      (async () => {
        const res = await apiClient("/api/categories?type=payment");
        setOptionCategory(res.data);
      })();
    }

    if (optionCreate.houses.length === 0) {
      (async () => {
        const res = await apiClient("/api/houses?status=occupied");
        setOptionCreate((prev) => ({ ...prev, houses: res.data }));
        setOptionCreateFilter((prev) => ({ ...prev, houses: res.data }));
      })();
    }

    if (optionCreate.residents.length === 0) {
      (async () => {
        const res = await apiClient("/api/residents");
        setOptionCreate((prev) => ({ ...prev, residents: res.data }));
        setOptionCreateFilter((prev) => ({ ...prev, residents: res.data }));
      })();
    }

    if (optionStatus.length === 0) {
      (async () => {
        const res = await apiClient("/api/payments/create");
        setOptionStatus(res.data.paymentStatus);
      })();
    }

    setValue("category", row.foreign_category_id);
    setValue("resident_id", row.foreign_resident_id);
    setValue("house_id", row.foreign_house_id);
    setValue("payment_date", format(new Date(row.payment_date), "yyyy-MM-dd"));
    setValue("payment_total", row.total_payment);
    setValue("status", row.status);
    setValue("total_month", row.total_month);
    setValue("description", row.description);

    if (
      getFieldState("resident_id") === "" &&
      getFieldState("house_id") === ""
    ) {
      setOptionCreateFilter((prev) => ({
        ...prev,
        residents: optionCreate.residents,
        houses: optionCreate.houses,
      }));
    }
  }, [
    isOpen,
    getFieldState,
    onClose,
    optionCategory,
    optionCreate,
    setValue,
    row,
    optionStatus,
  ]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    const res = await payment.update(formData, row.payment_id);
    const success = res.payment;
    if (!success) return;

    onClose();
    navigate("/payment");
  };

  const onError = (e) => {
    console.log(e);
    console.log("errors");
  };

  return (
    <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Edit">
      <div className="flex flex-row-reverse justify-between items-center">
        <Button aria-label="Close modal" onClick={() => setIsOpen(false)}>
          &times;
        </Button>
        <h1 className="text-lg">Edit payment</h1>
      </div>
      <div>
        <form method="post" onSubmit={handleSubmit(onSubmit, onError)}>
          <SelectForm
            disabled
            name="house_id"
            id="house_id"
            label="Payment House"
            {...register("house_id", { required: true })}
            onChange={(e) => {
              setValue("house_id", e.target.value);
              filterResidentByHouse(e.target.value);
            }}
            options={optionCreateFilter.houses.map((value) => ({
              label: value.number + " - " + value.address,
              value: value.house_id,
            }))}
          />
          <SelectForm
            disabled
            name="resident_id"
            id="resident_id"
            label="Resident Payment"
            {...register("resident_id", { required: true })}
            onChange={(e) => {
              setValue("resident_id", e.target.value);
              filterHouseByResident(e.target.value);
            }}
            options={optionCreateFilter.residents.map((value) => ({
              label: value.full_name + " - " + value.resident_status,
              value: value.resident_id,
            }))}
          />
          <InputForm
            id="payment_date"
            type="date"
            name="payment_date"
            label="Payment Date"
            register={register("payment_date", { required: true })}
          />
          <InputForm
            id="payment_total"
            type="number"
            name="payment_total"
            label="Payment Total"
            placeholder="Payment Total"
            register={register("payment_total", { required: true })}
          />
          <InputForm
            id="total_month"
            type="number"
            name="total_month"
            label="Total Month"
            placeholder="Total Month"
            register={register("total_month", { required: true })}
          />
          <InputForm
            id="description"
            type="text"
            name="description"
            label="Description"
            placeholder="Description"
            register={register("description", { required: true })}
          />

          <SelectForm
            id="category"
            label="Category"
            name="category"
            register={register("category", { required: true })}
            options={optionCategory.map((value) => ({
              label: value.name,
              value: value.category_id,
            }))}
          />
          <SelectForm
            name="status"
            id="status"
            className="w-full border px-4 py-2 rounded-lg"
            options={optionStatus}
            label="Payment Status"
            register={register("status", { required: true })}
            onChange={(e) => setValue("status", e.target.value)}
          />

          <br />
          <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
        </form>
      </div>
    </Modal>
  );
}
