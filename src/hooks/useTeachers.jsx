import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTeachers = () => {
      const axiosSecure = useAxiosSecure();
      // Tanstack query fetching
      const { data: teachers, isLoading, refetch } = useQuery({
            queryKey: ['teachers',],
            queryFn: async () => {
                  const res = await axiosSecure.get(`/teachers`);
                  return res.data;
            }
      });
      return [teachers, isLoading, refetch]
}

export default useTeachers