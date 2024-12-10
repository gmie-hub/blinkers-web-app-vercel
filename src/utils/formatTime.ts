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