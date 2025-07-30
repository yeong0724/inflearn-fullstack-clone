import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";
import _ from "lodash-es";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const errorToast = (error: unknown) => {
  const message =
    typeof error === "string" ? error : _.get(error, "message", "");

  toast.error(message, {
    style: {
      background: "#ef4444", // 더 진한 빨간색
      color: "white",
      border: "1px solid #dc2626",
    },
  });
};
