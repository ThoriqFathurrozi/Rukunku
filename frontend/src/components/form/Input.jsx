import React from "react";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const InputForm = React.forwardRef(function InputForm(
  {
    className,
    id,
    type = "text",
    label,
    register,
    error,
    errorMessage,
    ...props
  },
  ref
) {
  const errorStyle = "border-red-500 focus-visible:ring-red-500";
  return (
    <div className="flex flex-col w-full py-2 gap-1">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        ref={ref}
        className={cn("mt-1", error && errorStyle, className)}
        {...(register || {})}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {errorMessage || "This field is required."}
        </p>
      )}
    </div>
  );
});

InputForm.displayName = "InputForm";

export { InputForm };
