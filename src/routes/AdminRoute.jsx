import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin"
import Loading from "../components/shared/Loading";

const AdminRoute = ({ children }) => {
      const { isAdmin, adminLoading } = useAdmin();

      if (adminLoading) return <Loading />
      if (isAdmin) return children
      return <Navigate to='/' />
}

export default AdminRoute