import { formatDistanceToNow } from "date-fns";


export const getTimeAgo = (postedDate: string | null | undefined): string => {
  if (!postedDate || postedDate.trim() === "") {
    return "Invalid date";
  }

  const date = new Date(postedDate);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return `${formatDistanceToNow(date, { addSuffix: true })}`;
};


export const formatAmount = (amount: number | string) =>
  `₦${Number(amount)?.toLocaleString()}`;



export function convertDate(dateString: string | null) {
  if (!dateString) return "";
  const p = dateString.split(/\D/g);
  return [p[0], p[1], p[2]].join("-");
}

export function getTimeFromDate(dateString: string | null): string {
  if (!dateString) return "";

  // Parse the date string and create a Date object
  const date = new Date(dateString);

  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Determine am/pm and adjust hours for 12-hour format
  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

  return `${hours}:${minutes}${period}`;
}
