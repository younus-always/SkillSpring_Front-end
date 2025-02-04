import { Link } from "react-router-dom";
import teacherImg from "../../assets/images/teacher.jpg";
import { motion } from "motion/react";

const BecomeATeacher = () => {
      return (
            <section className="bg-inspire_teacher bg-cover bg-fixed">
                  <div className="bg-gray-800/90 text-white py-14">
                        <div className="w-11/12 md:w-10/12 mx-auto flex flex-col md:flex-row md:items-center">
                              {/* <!-- Left Section --> */}
                              <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                          duration: 2.8,
                                          delay: 0.5,
                                          ease: [0, 0.71, 0.2, 1.01],
                                    }}
                                    className="md:w-1/2">
                                    <img src={teacherImg} alt="Teacher Inspiring Students" className="w-11/12 md:w-full xl:w-11/12 mx-auto md:mx-0 rounded-lg shadow-lg" />
                              </motion.div>
                              {/* <!-- Right Section --> */}
                              <div className="md:w-1/2 md:ml-10 text-center mt-10 md:mt-0 md:text-left">
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-4">Share Your Knowledge, Shape the Future</h2>
                                    <p className="mb-5">Join a thriving community of passionate educators and make a difference in the lives of students worldwide.</p>
                                    <ul className="mb-5 list-disc w-fit mx-auto md:mx-0 text-start pl-5">
                                          <li>Reach Global Students</li>
                                          <li>Flexible Schedule</li>
                                          <li>Attractive Earnings</li>
                                          <li>Resources and Support</li>
                                    </ul>
                                    <Link to="/apply-teaching" className="btn px-4 py-1.5 bg-slate-600 text-white border-transparent hover:bg-slate-600/70 rounded hover:border-slate-600 shadow-lg hover:scale-110 active:scale-95 transition-all">
                                          Become a Teacher
                                    </Link>
                              </div>
                        </div>
                  </div>
            </section>

      )
}

export default BecomeATeacher