import React from "react";
import { cn } from "../../lib/utils";

const Button = React.forwardRef(function Button(
  { className, type = "button", ...props },
  ref
) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
  const defaultStyle =
    "bg-blue-500 text-white shadow hover:bg-blue-400/90 h-9 px-4 py-2";

  return (
    <button
      className={cn(baseStyle, defaultStyle, className)}
      ref={ref}
      type={type}
      {...props}
    />
  );
});

Button.displayName = "Button";

export { Button };
