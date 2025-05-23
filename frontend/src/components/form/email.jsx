import React from "react";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";

const Email = React.forwardRef(function Email(
  { className, id, type = "email", register, error, errorMessage, ...props },
  ref
) {
  const errorStyle = "border-red-500 focus-visible:ring-red-500";
  return (
    <div className="flex flex-col w-full">
      <Input
        id={id}
        type={type}
        ref={ref}
        autocomplete
        className={cn(error && errorStyle, className)}
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

Email.displayName = "Email";

export { Email };
