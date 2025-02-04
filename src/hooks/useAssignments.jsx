import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAssignments = () => {
      const axiosSecure = useAxiosSecure();

      // Fetch All Assignment from server using tanstack query
      const { data: assignments, isLoading, refetch } = useQuery({
            queryKey: ["assignments"],
            queryFn: async () => {
                  const { data } = await axiosSecure.get('/assignments');
                  return data;
            }
      });
      return [assignments, isLoading, refetch];
}

export default useAssignments