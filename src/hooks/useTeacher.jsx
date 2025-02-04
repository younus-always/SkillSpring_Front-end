import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useTeachers from "./useTeachers";

const useTeacher = () => {
      const { user } = useAuth();
      const [teachers, isLoading] = useTeachers();
      const axiosSecure = useAxiosSecure();
      const teacher = !isLoading ? teachers?.find(teacher => teacher?.email === user?.email && teacher?.role === 'teacher') : null;

      // Use React Query for fetching teacher details
      const { data: isTeacher, isLoading: teacherLoading } = useQuery({
            queryKey: ["isTeacher", teacher?.email],
            queryFn: async () => {
                  if (!teacher) return null;
                  const res = await axiosSecure.get(`/teachers/${teacher.email}`);
                  return res.data;
            }
      });
      return { isTeacher, teacherLoading }
}

export default useTeacher