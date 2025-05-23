import React from "react";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";

const SelectForm = React.forwardRef(function SelectForm(
  {
    className,
    id,
    name,
    onChangeSelect,
    selectPlaceholder = "Select an option",
    options = [],
    label,
    register,
    error,
    errorMessage,
    defaultValue,
    value,
    ...props
  },
  ref
) {
  const errorStyle = "border-red-500 focus-visible:ring-red-500";

  // Normalize options: support [{label, value}] or [string]
  const normalizedOptions = options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  );

  return (
    <div className="flex flex-col w-full py-2">
      {label && <Label htmlFor={id || name}>{label}</Label>}
      <select
        id={id || name}
        name={name}
        ref={ref}
        className={cn(
          "w-full border mt-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500",
          error && errorStyle,
          className
        )}
        onChange={onChangeSelect}
        defaultValue={defaultValue}
        value={value}
        {...(register || {})}
        {...props}
      >
        <option value="">{selectPlaceholder}</option>
        {normalizedOptions.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {errorMessage || "This field is required."}
        </p>
      )}
    </div>
  );
});

SelectForm.displayName = "SelectForm";

export { SelectForm };
