import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const fetchData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data.result;
  } catch (error) {
    return null;
  }
};

export function useFetchStock(key, url) {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchData(url),
    staleTime: 60000,
  });
}