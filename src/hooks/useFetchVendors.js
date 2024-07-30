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

export function useFetchVendors(key, url) {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchData(url),
    staleTime: 60000,
  });
}

// export const FetchVendorDetails = async (vendor_id) => {
//   try {
//     const { data } = useFetchVendors('detailed_vendor', `/detailed_vendor_information/${vendor_id}`);

//     console.log(data);

//   } catch (error) {
//     setError(error);
//   }
// };
