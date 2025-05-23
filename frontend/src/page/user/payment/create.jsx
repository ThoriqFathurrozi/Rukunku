import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { Modal } from "../../../components/modal";

import { Button } from "../../../components/ui/button";
import { houses } from "../../../repository/house";
import { residents } from "../../../repository/resident";
import apiClient from "../../../lib/axios";
import { SelectForm } from "../../../components/form/select";
import { InputForm } from "../../../components/form/Input";

export default function CreatePayment() {
  const [isOpen, setIsOpen] = React.useState(false);
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";
  const success = fetcher.state === "loading";

  const [houseResident, setHouseResident] = React.useState({
    house_id: "",
    resident_id: "",
  });

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

  const [isFetchData, setIsFetchData] = useState({
    houses: false,
    residents: false,
    category: false,
    status: false,
  });

  const onClose = React.useCallback(() => {
    // reset State
    setHouseResident({ house_id: "", resident_id: "" });
    setOptionCreateFilter({
      houses: optionCreate.houses,
      residents: optionCreate.residents,
    });
    setIsOpen((prev) => !prev);
  }, [optionCreate]);

  useEffect(() => {
    if (optionCategory.length === 0 && !isFetchData.category) {
      (async () => {
        const res = await apiClient("/api/categories?type=payment");
        if (res.status !== 200) return;

        setIsFetchData((prev) => ({ ...prev, category: true }));
        setOptionCategory(res.data);
      })();
    }

    if (optionCreate.houses.length === 0 && !isFetchData.houses) {
      (async () => {
        const res = await apiClient("/api/houses?status=occupied");
        if (res.status !== 200) return;
        setIsFetchData((prev) => ({ ...prev, houses: true }));

        setOptionCreate((prev) => ({ ...prev, houses: res.data }));
        setOptionCreateFilter((prev) => ({ ...prev, houses: res.data }));
      })();
    }

    if (optionCreate.residents.length === 0 && !isFetchData.residents) {
      (async () => {
        const res = await apiClient("/api/residents");
        if (res.status !== 200) return;
        setIsFetchData((prev) => ({ ...prev, residents: true }));

        setOptionCreate((prev) => ({ ...prev, residents: res.data }));
        setOptionCreateFilter((prev) => ({ ...prev, residents: res.data }));
      })();
    }

    if (optionStatus.length === 0 && !isFetchData.status) {
      (async () => {
        const res = await apiClient("/api/payments/create");
        if (res.status !== 200) return;

        setIsFetchData((prev) => ({ ...prev, status: true }));
        setOptionStatus(res.data.paymentStatus);
      })();
    }

    if (
      houseResident.resident_id === "" &&
      houseResident.house_id === "" &&
      isOpen
    ) {
      console.log("hello", houseResident.resident_id, houseResident.house_id);
      setOptionCreateFilter((prev) => ({
        ...prev,
        residents: optionCreate.residents,
        houses: optionCreate.houses,
      }));
    }
  }, [
    isFetchData,
    isOpen,
    busy,
    success,
    optionCategory,
    optionCreate,
    onClose,
    houseResident,
    optionStatus,
  ]);

  async function filterResidentByHouse(house_id) {
    // filter resident by house
    if (house_id === "") return;
    if (houseResident.resident_id !== "") return;

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
    if (houseResident.house_id !== "") return;

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

  return (
    <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Create">
      <div className="flex flex-row-reverse justify-between items-center">
        <Button aria-label="Close modal" onClick={() => setIsOpen(false)}>
          &times;
        </Button>
        <h1 className="text-lg">Add new Payment</h1>
      </div>
      <div>
        <fetcher.Form method="post">
          <SelectForm
            name="house_id"
            id="house_id"
            label="Payment House"
            onChange={(e) => {
              setHouseResident({ ...houseResident, house_id: e.target.value });
              filterResidentByHouse(e.target.value);
            }}
            options={optionCreateFilter.houses.map((value) => ({
              label: value.number + " - " + value.address,
              value: value.house_id,
            }))}
          />
          <SelectForm
            name="resident_id"
            id="resident_id"
            label="Resident Payment"
            onChange={(e) => {
              setHouseResident({
                ...houseResident,
                resident_id: e.target.value,
              });
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
            required
          />
          <InputForm
            id="payment_total"
            type="number"
            name="payment_total"
            label="Payment Total"
            placeholder="Payment Total"
          />
          <InputForm
            id="total_month"
            type="number"
            name="total_month"
            label="Total Month"
            placeholder="Total Month"
          />
          <InputForm
            id="description"
            type="text"
            name="description"
            label="Description"
            placeholder="Description"
          />

          <SelectForm
            id="category"
            label="Category"
            name="category"
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
          />

          <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
        </fetcher.Form>
      </div>
    </Modal>
  );
}
