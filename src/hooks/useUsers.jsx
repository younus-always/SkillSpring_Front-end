import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsers = () => {
      const axiosSecure = useAxiosSecure();

      // Fetch users from server using tanstack query
      const { data: users, isLoading, refetch } = useQuery({
            queryKey: ['users'],
            queryFn: async () => {
                  const res = await axiosSecure.get(`/users`);
                  return res.data;
            }
      });
      return [users, isLoading, refetch]
}

export default useUsers