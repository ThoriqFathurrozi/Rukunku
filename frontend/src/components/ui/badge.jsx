import React from "react";
import { generateTextColorFromString } from "../../lib/generateBgText";
import { cn } from "../../lib/utils";

export default function Badge({ color, isDark, text }) {
  // If no color/isDark provided, generate from text
  const { color: generatedColor, isDark: generatedIsDark } =
    generateTextColorFromString(text);

  const finalColor = color || generatedColor;
  const finalIsDark = typeof isDark === "boolean" ? isDark : generatedIsDark;

  return (
    <div
      style={{ backgroundColor: finalColor }}
      className="px-2 py-1 rounded-lg mt-2 text-center w-fit"
    >
      <p
        className={cn(
          "text-sm font-semibold",
          finalIsDark ? "text-white" : "text-black"
        )}
      >
        {text}
      </p>
    </div>
  );
}

Badge.displayName = "Badge";

export { Badge };
