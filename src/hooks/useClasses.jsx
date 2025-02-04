import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useClasses = () => {
      const axiosSecure = useAxiosSecure();
      // Fetch all class to server by Tanstack query 
      const { data: classes, isLoading, refetch } = useQuery({
            queryKey: ["classes"],
            queryFn: async () => {
                  const { data } = await axiosSecure.get('/classes');
                  return data;
            }
      });
      return [classes, isLoading, refetch];
}

export default useClasses