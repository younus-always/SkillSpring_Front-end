import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import useTeacher from "../hooks/useTeacher";
import Loading from "../components/shared/Loading";
import logoImg from "../assets/logo/logo.png";

const DashboardLayout = () => {
      const { user, loading } = useAuth();
      const { isAdmin } = useAdmin();
      const { isTeacher } = useTeacher();

      const adminLinks = <>
            <li className="large:w-full">
                  <NavLink to='/dashboard/admin' end
                        className={({ isActive }) => `${isActive && "bg-green-600"} block py-1.5 px-2 rounded bg-gray-500 hover:bg-green-600 transition-all`}
                  >Profile</NavLink>
            </li>
            <li className="large:w-full">
                  <NavLink to='admin/all-users'
                        className={({ isActive }) => `${isActive && "bg-green-600"} block py-1.5 px-2 rounded bg-gray-500 hover:bg-green-600 transition-all`}
                  >All Users</NavLink>
            </li>
            <li className="large:w-full">
                  <NavLink to='admin/teacher-request'
                        className={({ isActive }) => `${isActive && "bg-green-600"} block py-1.5 px-2 rounded bg-gray-500 hover:bg-green-600 transition-all`}
                  >Teacher Request</NavLink>
            </li>
            <li className="large:w-full">
                  <NavLink to='admin/all-classList'
                        className={({ isActive }) => `${isActive && "bg-green-600"} block py-1.5 px-2 rounded bg-gray-500 hover:bg-green-600 transition-all`}
                  >All Class</NavLink>
            </li>
      </>

      const teacherLinks = <>
            <li className="large:w-full">
                  <NavLink to="/dashboard/teacher" end
                        className={({ isActive }) => `${isActive && "bg-green-600"} block py-1.5 px-2 rounded bg-gray-500 hover:bg-green-600 transition-all`}
                  >Profile</NavLink></li>
            <li className="large:w-full">
                  <NavLink to="teacher/my-class"
                        className={({ isActive }) => `${isActive && "bg-green-600"} block py-1.5 px-2 rounded bg-gray-500 hover:bg-green-600 transition-all`}>My Class</NavLink>
            </li>
            <li className="large:w-full">
                  <NavLink to="teacher/add-class"
                        className={({ isActive }) => `${isActive && "bg-green-600"} block py-1.5 px-2 rounded bg-gray-500 hover:bg-green-600 transition-all`}
                  >Add Class</NavLink></li>
      </>

      const studentLinks = <>
            <li className="large:w-full">
                  <NavLink to='/dashboard/student' end
                        className={({ isActive }) => `${isActive && "bg-green-600"} block py-1.5 px-2 rounded bg-gray-500 hover:bg-green-600 transition-all`}
                  >Profile</NavLink>
            </li>
            <li className="large:w-full">
                  <NavLink to='student/my-enroll-class'
                        className={({ isActive }) => `${isActive && "bg-green-600"} block py-1.5 px-2 rounded bg-gray-500 hover:bg-green-600 transition-all`}
                  >My Enroll Class</NavLink>
            </li>
      </>

      if (loading) return <Loading />

      return (
            <>
                  <section className="flex flex-col large:flex-row w-full h-screen overflow-hidden">
                        {/* navigation sidebar */}
                        <nav className="w-full large:w-48 py-5 large:p-4 bg-slate-700 text-white z-50">
                              <div className="flex items-center justify-center large:justify-normal gap-6 large:mt-3">
                                    <h2 className="text-xl font-bold">Skill<span>Spring</span></h2>
                                    <Link to='/' className="large:hidden py-1.5 px-3 bg-gray-500 hover:bg-green-600 transition-all rounded text-sm">Home</Link>
                              </div>
                              <div className="mt-4 large:mt-6 flex large:flex-col items-center justify-center large:justify-start large:items-start">
                                    <ul className="w-full flex items-center justify-center gap-3 large:flex-col large:items-start large:gap-0 font-medium large:space-y-2 text-sm large:text-base">
                                          {isAdmin ? adminLinks : isTeacher ? teacherLinks : studentLinks}
                                    </ul>
                                    <div className="hidden large:block w-full border-t border-dashed pt-4 mt-6"><Link to='/' className="py-1.5 px-2 block bg-gray-500 hover:bg-green-600 transition-all rounded">Home</Link></div>
                              </div>
                        </nav>
                        {/* content sidebar */}
                        <main className="overflow-y-visible overflow-x-hidden">
                              <section className="large:w-[calc(100vw-192px)] mx-auto">
                                    <Outlet />
                              </section>
                        </main>
                  </section >
            </>
      )
}

export default DashboardLayout