import useAdmin from "../../../hooks/useAdmin";
import { Link } from "react-router-dom";
import analytics from "../../../assets/icons/analytics.png";
import course from "../../../assets/icons/course.png";
import conference from "../../../assets/icons/conference.png";
import settings from "../../../assets/icons/settings.png";
import collaboration from '../../../assets/images/collaboration.png';

const AdminProfile = () => {
      const { isAdmin } = useAdmin();
      const { name, email, image } = isAdmin || {};

      return (
            <section className="bg-gray-50 py-10">
                  <div className="w-11/12 mx-auto text-center space-y-6 px-4 py-6 bg-white shadow-lg rounded-lg">
                        {/* Hero Banner */}
                        <div className="relative">
                              <img
                                    src={collaboration}
                                    alt="Admin Banner"
                                    className="w-full h-64 object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 rounded-lg">
                                    <h1 className="text-3xl font-bold text-white">
                                          Welcome to the Leadership Hub
                                    </h1>
                                    <p className="text-gray-200 text-sm mt-2">
                                          Empowering you to lead the way!
                                    </p>
                              </div>
                        </div>

                        {/* Admin Info */}
                        <div className="flex flex-col items-center mt-6">
                              <img
                                    src={image}
                                    alt="Admin Profile"
                                    className="w-20 h-20 rounded-full ring-4 ring-gray-200"
                              />
                              <h2 className="text-xl font-bold text-gray-800 mt-4">{name || "Admin"}</h2>
                              <span>{email}</span>
                              <p className="text-gray-600">
                                    Your journey as a leader starts here. Let's make an impact together!
                              </p>
                        </div>

                        {/* Features and Actions */}
                        <div className="mt-8 grid gap-6 sm:grid-cols-2">
                              {/* Manage Courses */}
                              <button
                                    className="flex flex-col items-center bg-blue-50 p-4 rounded-lg shadow-md hover:bg-blue-100 transition"
                              >
                                    <img
                                          src={course}
                                          alt="Manage Courses"
                                          className="w-16"
                                    />
                                    <h3 className="mt-2 text-lg font-semibold text-blue-700">
                                          Manage Courses
                                    </h3>
                                    <p className="text-sm text-gray-500 text-center">
                                          Oversee and update your course catalog to inspire learners globally.
                                    </p>
                              </button>

                              {/* View Analytics */}
                              <button
                                    className="flex flex-col items-center bg-green-50 p-4 rounded-lg shadow-md hover:bg-green-100 transition"
                              >
                                    <img
                                          src={analytics}
                                          alt="Analytics"
                                          className="w-16"
                                    />
                                    <h3 className="mt-2 text-lg font-semibold text-green-700">
                                          View Analytics
                                    </h3>
                                    <p className="text-sm text-gray-500 text-center">
                                          Track engagement, performance, and learner satisfaction.
                                    </p>
                              </button>

                              {/* Community Engagement */}
                              <button
                                    className="flex flex-col items-center bg-yellow-50 p-4 rounded-lg shadow-md hover:bg-yellow-100 transition"
                              >
                                    <img
                                          src={conference}
                                          alt="Community Engagement"
                                          className="w-16"
                                    />
                                    <h3 className="mt-2 text-lg font-semibold text-yellow-700">
                                          Community Engagement
                                    </h3>
                                    <p className="text-sm text-gray-500 text-center">
                                          Connect with fellow admins and teachers to share ideas and insights.
                                    </p>
                              </button>

                              {/* Admin Settings */}
                              <button
                                    className="flex flex-col items-center bg-red-50 p-4 rounded-lg shadow-md hover:bg-red-100 transition"
                              >
                                    <img
                                          src={settings}
                                          alt="Admin Settings"
                                          className="w-16"
                                    />
                                    <h3 className="mt-2 text-lg font-semibold text-red-700">
                                          Admin Settings
                                    </h3>
                                    <p className="text-sm text-gray-500 text-center">
                                          Customize your admin profile and platform preferences.
                                    </p>
                              </button>
                        </div>

                        {/* Motivational Call-to-Action */}
                        <div className="mt-10">
                              <h3 className="text-lg font-semibold text-gray-800">
                                    Ready to Make a Difference?
                              </h3>
                              <p className="text-gray-600 mt-2">
                                    Explore your tools and start shaping the future of education!
                              </p>
                        </div>
                  </div>
            </section>
      );
}

export default AdminProfile