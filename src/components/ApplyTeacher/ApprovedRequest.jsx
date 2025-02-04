import { Link } from "react-router-dom";
import congrats from "../../assets/images/fireworks_16431848.gif";

const ApprovedRequest = ({ teacherData }) => {
      const { name, photo } = teacherData || {};

      return (
            <section className="bg-white py-10">
                  <div className="w-11/12 md:w-10/12 mx-auto text-center space-y-6 p-2">
                        {/* Celebration Icon */}
                        <div className="text-green-600">
                              <img src={congrats} alt="" className="w-28 mx-auto" />
                        </div>
                        {/* Success Heading */}
                        <h1 className="text-2xl font-bold text-green-600">
                              Congratulations, You Are Now a Teacher!
                        </h1>
                        {/* Subheading */}
                        <p className="text-gray-700">
                              Welcome to the SkillSpring teaching community, {name}.
                              Start sharing your expertise with learners worldwide.
                        </p>
                        {/* Buttons */}
                        <div className="flex flex-col items-center mx-auto space-y-4 md:space-y-0 w-fit md:flex-row md:space-x-4">
                              <button className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-500 active:scale-95 transition-all">
                                    Create Your First Course
                              </button>
                              <Link to='/dashboard/teacher' className="bg-slate-700 text-white px-6 py-2 rounded shadow hover:bg-slate-600 active:scale-95 transition-all">
                                    View Your Dashboard
                              </Link>
                        </div>

                        {/* User Information */}
                        <div className="mt-4">
                              <img
                                    src={photo}
                                    alt="Profile photo"
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto ring-2 ring-green-600"
                              />
                              <p className="text-gray-800 sm:text-lg mt-2">{name}</p>
                        </div>
                  </div>
            </section>
      )
}

export default ApprovedRequest