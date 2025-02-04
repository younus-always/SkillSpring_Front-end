import { Navigate } from "react-router-dom";
import Loading from "../components/shared/Loading";
import useTeacher from "../hooks/useTeacher"

const TeacherRoute = ({ children }) => {
      const { isTeacher, teacherLoading } = useTeacher();
      if (teacherLoading) return <Loading />
      if (isTeacher) return children
      return <Navigate to="/" />
}

export default TeacherRoute