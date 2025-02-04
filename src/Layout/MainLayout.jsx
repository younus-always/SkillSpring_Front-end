import { Outlet, useLocation } from "react-router-dom"
import Navber from "../components/shared/Navber"
import Footer from "../components/shared/Footer"
import useAuth from "../hooks/useAuth"
import Loading from "../components/shared/Loading"

const MainLayout = () => {
      const { loading } = useAuth();
      const location = useLocation();
      const hideNavFooter = location.pathname === '/login' || location.pathname === '/register';

      if (!hideNavFooter) {
            if (loading) return <Loading />
      };

      return (
            <>
                  {hideNavFooter || <Navber />}
                  <main className="min-h-[calc(100vh-444px)]">
                        <Outlet />
                  </main>
                  {hideNavFooter || <Footer />}
            </>
      )
}

export default MainLayout