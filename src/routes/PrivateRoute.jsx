import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth"
import Loading from "../components/shared/Loading";

const PrivateRoute = ({ children }) => {
      const { user, loading } = useAuth();
      const location = useLocation();

      if (loading) return <Loading />
      if (user) return children

      return <Navigate state={location.pathname} to='/login'/>

}

export default PrivateRoute