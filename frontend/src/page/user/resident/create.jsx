import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";

import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useFetcher } from "react-router";
import { Modal } from "../../../components/modal/index";
import apiClient from "../../../lib/axios";
import { SelectForm } from "../../../components/form/select";
import { InputForm } from "../../../components/form/Input";

const Create = () => {
  let fetcher = useFetcher();

  let busy = fetcher.state !== "idle";

  const [isOpen, setIsOpen] = useState(false);
  const [residentStatus, setResidentStatus] = useState("");
  const [maritialStatus, setMartialStatus] = useState("");

  const [optionCreate, setOptionCreate] = useState({
    maritial_status: [],
    resident_status: [],
  });

  const onClose = () => {
    setMartialStatus("");
    setResidentStatus("");
    setIsOpen(!isOpen);
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    if (
      optionCreate.maritial_status.length === 0 &&
      optionCreate.resident_status.length === 0
    ) {
      (async () => {
        const res = await apiClient.get("api/residents/create");
        setOptionCreate(res.data);
      })();
    }
  }, [isOpen, optionCreate]);

  return (
    <>
      <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Create">
        <div className="flex flex-row-reverse justify-between items-center">
          <Button aria-label="Close modal" onClick={() => setIsOpen(false)}>
            &times;
          </Button>
          <h1 className="text-lg">Add new resident</h1>
        </div>
        <div>
          <fetcher.Form method="post" encType="multipart/form-data">
            <InputForm
              required
              label="Full Name"
              type="text"
              name="full_name"
              placeholder="Full Name"
            />
            <SelectForm
              required
              name="maritial_status"
              label="Maritial Status"
              options={optionCreate.maritial_status.map((value) => ({
                label: value,
                value: value,
              }))}
              value={maritialStatus}
              onChangeSelect={(e) => setMartialStatus(e.target.value)}
            />
            <SelectForm
              required
              name="resident_status"
              label="Resident Status"
              options={optionCreate.resident_status.map((value) => ({
                label: value,
                value: value,
              }))}
              value={residentStatus}
              onChangeSelect={(e) => setResidentStatus(e.target.value)}
            />
            <InputForm
              required
              label="Phone Number"
              type="text"
              name="phone_number"
              placeholder="Phone Number"
            />
            <Label htmlFor="identification_card_img">Identification Card</Label>
            <Input
              required
              type="file"
              name="identification_card_img"
              id="identification_card_img"
              accept="image/*"
              placeholder="Identification Card"
            />
            <br />
            <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
          </fetcher.Form>
        </div>
      </Modal>
    </>
  );
};

export default Create;
