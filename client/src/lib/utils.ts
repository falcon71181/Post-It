import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDate(date: Date) {
    const formatedDate = format(date, 'do MMM yyyy');
    return formatedDate;
}

export function getSec(date: Date) {
    const formatedDate = format(date, 'kk:mm');
    return formatedDate;
}
