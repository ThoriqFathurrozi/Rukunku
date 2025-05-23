import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const Label = forwardRef(function Label({ className, htmlFor, ...props }, ref) {
  const baseStyle =
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={cn(baseStyle, className)}
      {...props}
    />
  );
});

export { Label };
