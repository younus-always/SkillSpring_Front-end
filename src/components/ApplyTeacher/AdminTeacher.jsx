import { Link } from "react-router-dom";
import congrats from "../../assets/images/congrats2.gif";

const AdminTeacher = ({ admin }) => {
      const { name, image } = admin || {};
      return (
            <section className="bg-white py-10">
                  <div className="w-11/12 md:w-10/12 mx-auto text-center space-y-6 p-2">
                        {/* Celebration Icon */}
                        <div className="text-green-600">
                              <img src={congrats} alt="" className="w-28 mx-auto" />
                        </div>
                        {/* Success Heading */}
                        <h1 className="text-2xl font-bold text-green-600">
                              Congratulations, You Are Select As a Admin!
                        </h1>
                        {/* Subheading */}
                        <p className="text-gray-700">
                              Welcome to the SkillSpring admin community, {name}.
                              Start sharing your expertise with learners worldwide.
                        </p>

                        <div className="flex flex-col  sm:flex-row items-center justify-center gap-6 sm:gap-8 mx-auto">
                              {/* User Information */}
                              <div>
                                    <img
                                          src={image}
                                          alt="Profile photo"
                                          className="w-16 h-16 rounded-full mx-auto ring-2 ring-green-600"
                                    />
                                    <p className="text-gray-800 lg mt-2">{name}</p>
                              </div>
                              {/* Buttons */}
                              <div className="flex flex-col space-y-3 w-fit">
                                    <Link to='/dashboard/admin' className="bg-slate-700 text-white px-6 py-2 rounded shadow hover:bg-slate-600 active:scale-95 transition-all">
                                          View Your Profile
                                    </Link>
                                    <button className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-500 active:scale-95 transition-all">
                                          Contact Our Community
                                    </button>
                              </div>
                        </div>
                  </div>
            </section>
      )
}

export default AdminTeacher