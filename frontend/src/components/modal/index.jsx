import React, { useEffect } from "react";
import { Button } from "../ui/button";

import "./style.css";

export function Modal({ isOpen, onChangeOpen, children, TrigerName }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onChangeOpen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onChangeOpen]);

  // Close if clicking on backdrop
  const onBackdropClick = (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      onChangeOpen();
    }
  };

  return (
    <div>
      <div className="trigger-create">
        <Button onClick={() => onChangeOpen()}>{TrigerName}</Button>
      </div>

      {isOpen && (
        <div
          className="modal-backdrop"
          onClick={onBackdropClick}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-content">{children}</div>
        </div>
      )}
    </div>
  );
}
