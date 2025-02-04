import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePayments = () => {
      const axiosSecure = useAxiosSecure();

      // Fetch Enroll details from server using tanstack query
      const { data: payments, isLoading,refetch } = useQuery({
            queryKey: ["payments"],
            queryFn: async () => {
                  const { data } = await axiosSecure.get('/payments');
                  return data;
            }
      });
      return [payments, isLoading,refetch];
}

export default usePayments