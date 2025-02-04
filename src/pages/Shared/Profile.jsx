import { useQuery } from "@tanstack/react-query";
import AdminProfile from "../../components/Dashboard/Admin/AdminProfile";
import TeacherProfile from "../../components/Dashboard/Teacher.jsx/TeacherProfile";
import DashboardFooter from "../../components/shared/DashboardFooter";
import useAdmin from "../../hooks/useAdmin";
import useAuth from "../../hooks/useAuth";
import useTeacher from "../../hooks/useTeacher";
import useTitle from "../../hooks/useTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePayments from "../../hooks/usePayments";

const Profile = () => {
      useTitle("Profile");
      const { user } = useAuth();
      const { isAdmin } = useAdmin();
      const { isTeacher } = useTeacher();
      const axiosSecure = useAxiosSecure();
      const [payments] = usePayments();
      const userTotalEnroll = payments?.filter(p => p.email === user.email);

      if (isAdmin) return <AdminProfile />;
      if (isTeacher) return <TeacherProfile />;

      // Load User Submitted-Assignments only
      const { data: submittedAssignment } = useQuery({
            queryKey: ["submittedAssignment", user.email],
            queryFn: async () => {
                  const { data } = await axiosSecure.get('/submittedAssignments');
                  return data?.filter(d => d.email === user.email);
            }
      });

      return (
            <>
                  <section className="w-11/12 mx-auto py-10 min-h-screen">
                        <div className="flex flex-col xl:flex-row items-center justify-center gap-5">
                              {/* Header Section */}
                              <div className="bg-white rounded-lg p-6" >
                                    <div className="flex items-center space-x-6">
                                          {/* Profile Picture */}
                                          <div className="w-60 h-60 relative  rounded-2xl overflow-hidden before:content-[''] before:absolute before:-left-24 before:-top-24 before:w-[400px] before:h-[400px] before:bg-gradient-to-br before:from-slate-500 before:via-emerald-600 before:via-indigo-300 before:via-cyan-500 before:via-green-700 before:to-blue-600 before:animate-spin before:duration-500">
                                                <div className="relative w-full h-full rounded-2xl overflow-hidden p-1">
                                                      <img
                                                            src={user.photoURL}
                                                            alt="Profile"
                                                            className="bg-white object-cover w-full h-full rounded-xl overflow-hidden"
                                                      />
                                                </div>
                                          </div>
                                          {/* Welcome Message */}
                                          <div>
                                                <h1 className="text-2xl font-bold text-gray-800">
                                                      Welcome, {user.displayName}!
                                                </h1>
                                                <p className="text-gray-600">Let’s make a difference today.</p>
                                          </div>
                                    </div>
                              </div >

                              {/* About Section */}
                              <div className="max-w-xl xl:max-w-md bg-white shadow-md rounded-lg p-6" >
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">About You</h2>
                                    <div className="grid grid-cols-1 gap-1">
                                          <p>
                                                <strong>Name: </strong>
                                                <span>{user.displayName}</span>
                                          </p>
                                          <p>
                                                <strong>Email: </strong>
                                                <span>{user.email}</span>
                                          </p>
                                          <p>
                                                <strong>Role: </strong>
                                                <span>Student</span>
                                          </p>
                                          <p>
                                                <strong>Phone: </strong>
                                                <span>+8801925786324</span>
                                          </p>
                                          <p>
                                                <strong>Biography: </strong>
                                                <span>
                                                      "Eager to explore, grow, and contribute to the world of ideas and innovation."
                                                </span>
                                          </p>
                                    </div>
                              </div >
                        </div>
                        {/* Statistics Section */}
                        <div className="max-w-2xl xl:max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6" >
                              <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Statistics</h2>
                              <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center bg-blue-400 hover:bg-blue-400/70 rounded-md p-5">
                                          <h3 className="text-2xl font-bold text-slate-50">
                                                {userTotalEnroll?.length || 0}
                                          </h3>
                                          <p className="text-slate-800 font-medium">Total Enroll Class</p>
                                    </div>
                                    <div className="text-center bg-teal-500 hover:bg-teal-500/70 p-5 rounded-md">
                                          <h3 className="text-2xl font-bold text-slate-50">
                                                {submittedAssignment?.length || 0}
                                          </h3>
                                          <p className="text-slate-800 font-medium">Total Submitted Assignment</p>
                                    </div>
                              </div>
                        </div >
                  </section>
                  <DashboardFooter />
            </>
      )
}

export default Profile