import clsx from "clsx";
import { isValid, parse, format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(number) {
    return "Rp " + number.toLocaleString("id-ID");
}

export function formatDate(dateString) {
    if (!dateString) return "";
    // Try parsing with the expected main format first
    let parsedDate = parse(dateString, "yyyy-MM-dd HH:mm:ss", new Date());

    // If invalid, fallback to native Date parsing
    if (!isValid(parsedDate)) {
        parsedDate = new Date(dateString);
    }

    if (isNaN(parsedDate)) return "Invalid Date";
    return format(parsedDate, "MMM d, yyyy");
}