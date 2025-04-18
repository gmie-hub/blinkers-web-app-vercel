// hooks/useJobDetails.ts
import { useQuery } from "@tanstack/react-query";
import { getAllCms } from "../../request";

export const useCms = () => {
  return useQuery({
    queryKey: ["get-cms", ],
    queryFn: () => getAllCms(),
    retry: 0,
    refetchOnWindowFocus: false,
  });
};
