import useTeacher from "../../../hooks/useTeacher";
import useClasses from "../../../hooks/useClasses";
import DashboardFooter from "../../shared/DashboardFooter";

const TeacherProfile = () => {
      const { isTeacher } = useTeacher();
      const { name, email, photo, role } = isTeacher;
      const [classes] = useClasses();

      return (
            <>
            <section className="w-11/12 mx-auto py-10">
                  <div className="flex flex-col xl:flex-row items-center justify-center gap-5">
                        {/* Header Section */}
                        <div className=" bg-white rounded-lg p-6" >
                              <div className="flex items-center space-x-6">
                                    {/* Profile Picture */}
                                    <div className="w-60 h-60 relative  rounded-2xl overflow-hidden before:content-[''] before:absolute before:-left-24 before:-top-24 before:w-[400px] before:h-[400px] before:bg-gradient-to-br before:from-slate-500 before:via-emerald-600 before:via-indigo-300 before:via-cyan-500 before:via-green-700 before:to-blue-600 before:animate-spin before:duration-500">
                                          <div className="relative w-full h-full rounded-2xl overflow-hidden p-1">
                                                <img
                                                      src={photo}
                                                      alt="Profile"
                                                      className="bg-white object-cover w-full h-full rounded-xl overflow-hidden"
                                                />
                                          </div>
                                    </div>
                                    {/* Welcome Message */}
                                    <div>
                                          <h1 className="text-2xl font-bold text-gray-800">
                                                Welcome, {name}!
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
                                          <span>{name}</span>
                                    </p>
                                    <p>
                                          <strong>Email: </strong>
                                          <span>{email}</span>
                                    </p>
                                    <p>
                                          <strong>Role: </strong>
                                          <span>{role}</span>
                                    </p>
                                    <p>
                                          <strong>Title: </strong>
                                          <span>{isTeacher?.title}</span>
                                    </p>
                                    <p>
                                          <strong>Phone: </strong>
                                          <span>+8801925786324</span>
                                    </p>
                                    <p>
                                          <strong>Biography: </strong>
                                          <span>
                                                "An enthusiastic learner and contributor to the community."
                                          </span>
                                    </p>
                              </div>
                        </div >
                  </div>
                  {/* Statistics Section */}
                  <div className="max-w-2xl xl:max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6" >
                        <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Statistics</h2>
                        <div className="grid grid-cols-2 gap-4">
                              <div className="text-center bg-blue-300 hover:bg-blue-400 rounded-md p-5">
                                    <h3 className="text-2xl font-bold text-slate-50">
                                          {classes?.filter(c => c.email === email).length || 0}
                                    </h3>
                                    <p className="text-slate-800 font-medium">Class Created</p>
                              </div>
                              <div className="text-center bg-teal-400 hover:bg-teal-500 p-5 rounded-md">
                                    <h3 className="text-2xl font-bold text-slate-50">
                                          {classes?.filter(c => c.email === email && c?.status === "pending").length || 0}
                                    </h3>
                                    <p className="text-slate-800 font-medium">Pending Class</p>
                              </div>
                              <div className="text-center bg-teal-400 hover:bg-teal-500 p-5 rounded-md">
                                    <h3 className="text-2xl font-bold text-slate-50">
                                          {classes?.filter(c => c.email === email && c?.status === "accepted").length || 0}
                                    </h3>
                                    <p className="text-slate-800 font-medium">Approved Class</p>
                              </div>
                              <div className="text-center bg-emerald-300 hover:bg-emerald-400 p-5 rounded-md">
                                    <h3 className="text-2xl font-bold text-slate-50">
                                          {isTeacher?.studentsEnrolled || 0}
                                    </h3>
                                    <p className="text-slate-800 font-medium">Students Enrolled</p>
                              </div>
                        </div>
                  </div >
                  {/* Achievements Section */}
                  <div className="max-w-2xl xl:max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6" >
                        <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Achievements</h2>
                        <div className="grid grid-cols-2 gap-4">
                              <div className="bg-green-100 rounded-lg p-4">
                                    <h4 className="text-green-600 font-semibold">Top Educator</h4>
                                    <p className="text-gray-600">Earned for consistent high ratings</p>
                              </div>
                              <div className="bg-green-100 rounded-lg p-4">
                                    <h4 className="text-green-600 font-semibold">5-Star Instructor</h4>
                                    <p className="text-gray-600">Rated highly by students</p>
                              </div>
                        </div>
                  </div >
            </section>
            <DashboardFooter/>
            </>
      )

}

export default TeacherProfile