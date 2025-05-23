import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";

const Password = React.forwardRef(function Password(
  { className, id, error, register, ...props },
  ref
) {
  const [show, setShow] = useState(false);

  const baseWrapper = "relative w-full";

  const inputStyle = cn(
    error ? "border-red-500 focus:ring-red-500" : "border-input",
    className
  );

  const toggleStyle =
    "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500 cursor-pointer";

  return (
    <div className={baseWrapper}>
      <Input
        id={id}
        type={show ? "text" : "password"}
        className={inputStyle}
        ref={ref}
        {...(register || {})}
        {...props}
      />

      <span className={toggleStyle} onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
      </span>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});

Password.displayName = "Password";

export { Password };
