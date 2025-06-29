import crypto from "crypto";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

dayjs.extend(advancedFormat);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(str: string) {
  const dateObj = dayjs(str);
  return dateObj.format("Do MMM YYYY");
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
