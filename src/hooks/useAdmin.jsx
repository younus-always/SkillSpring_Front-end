import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure";
import useUsers from "./useUsers";

const useAdmin = () => {
      const { user } = useAuth();
      const [users, isLoading] = useUsers();
      const axiosSecure = useAxiosSecure();
      const admin = !isLoading ? users?.find(admin => admin?.email === user?.email && admin?.role === 'admin') : null;


      // Tanstack query fetch user is admin
      const { data: isAdmin, isLoading:adminLoading } = useQuery({
            queryKey: ['isAdmin', admin?.email],
            queryFn: async () => {
                  if (!admin) return null;
                  const res = await axiosSecure.get(`/users/${admin.email}`);
                  return res.data;
            }
      })
      return { isAdmin, adminLoading }
};

export default useAdmin