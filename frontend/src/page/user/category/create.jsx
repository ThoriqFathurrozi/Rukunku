import React, { useEffect, useState } from "react";
import { Modal } from "../../../components/modal";
import { Button } from "../../../components/ui/button";
import { useFetcher } from "react-router";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import apiClient from "../../../lib/axios";
import { SelectForm } from "../../../components/form/select";
import { InputForm } from "../../../components/form/Input";

export default function CreateCategory() {
  const fetcher = useFetcher();
  const [isOpen, setIsOpen] = React.useState(false);
  const busy = fetcher.state !== "idle";
  const success = fetcher.state === "loading";
  const [optionType, setOptionType] = useState([]);

  const onClose = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (optionType.length === 0) {
      (async () => {
        const res = await apiClient("api/categories/create");
        setOptionType(res.data.categoryType);
      })();
    }

    if (busy && success) {
      onClose();
    }
  }, [busy, success, onClose, optionType]);

  return (
    <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Create">
      <div className="flex flex-row-reverse justify-between items-center">
        <Button aria-label="Close modal" onClick={() => setIsOpen(false)}>
          &times;
        </Button>
        <h1 className="text-lg">Add new Category</h1>
      </div>
      <div>
        <fetcher.Form method="post">
          <InputForm
            type="text"
            placeholder="Category Name"
            name="name"
            id="name"
            label="Category Name"
            required
          />

          <InputForm
            type="text"
            placeholder="Category Description"
            name="description"
            id="description"
            label="Category Description"
            required
          />
          <SelectForm
            id="type"
            label="Category Type"
            name="type"
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
        </fetcher.Form>
      </div>
    </Modal>
  );
}
