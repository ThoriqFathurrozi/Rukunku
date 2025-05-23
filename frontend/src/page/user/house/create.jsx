import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { Modal } from "../../../components/modal";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { InputForm } from "../../../components/form/Input";

export function Create() {
  const fetcher = useFetcher();
  const busy = fetcher.state !== "idle";
  let success = fetcher.state === "loading";

  const [isOpen, setIsOpen] = useState(false);

  const onClose = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (busy && success) {
      onClose();
    }
  }, [onClose, busy, success]);

  return (
    <Modal isOpen={isOpen} onChangeOpen={onClose} TrigerName="Create">
      <div className="flex flex-row-reverse justify-between items-center">
        <Button aria-label="Close modal" onClick={() => setIsOpen(false)}>
          &times;
        </Button>
        <h1 className="text-lg">Add new house</h1>
      </div>
      <div>
        <fetcher.Form method="post">
          <InputForm
            id="number"
            type="text"
            name="number"
            label="House Number"
            placeholder="House Number"
          />
          <InputForm
            id="address"
            type="text"
            name="address"
            placeholder="House Address"
          />
          <br />
          <Button type="submit">{busy ? "Saving..." : "Save"}</Button>
        </fetcher.Form>
      </div>
    </Modal>
  );
}
