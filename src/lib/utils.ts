import crypto from "crypto";
import dayjs from "dayjs";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(str: string) {
  const dateObj = dayjs(str);
  return dateObj.format("MMM D @ HH:mm");
}

/**
 *
 * @param str
 * @returns
 */
export function checksum(str: string) {
  const hash = crypto.createHash("sha256").update(str);
  return hash.digest("hex");
}
