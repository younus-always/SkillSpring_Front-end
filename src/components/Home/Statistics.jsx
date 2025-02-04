import useClasses from "../../hooks/useClasses";
import usePayments from "../../hooks/usePayments";
import useUsers from "../../hooks/useUsers";
import SectionTitle from "../shared/SectionTitle";
import analytics from "../../assets/images/web-analytics.png";

const Statistics = () => {
      const [classes] = useClasses();
      const [users] = useUsers();
      const [payments] = usePayments();
      // accepted classes
      const totalClasses = classes?.filter(c => c?.status === "accepted");
      // total enroll student filter by email address
      const enrollStudent = payments?.filter((item, idx, self) => idx === self.findIndex((p) => p.email === item.email));


      return (
            <section className="pt-10 pb-0">
                  <SectionTitle title={"Website At a Glance"} subTitle={"Explore our stats and see the impact we’re making together!"} />
                  <div className="bg-green-50/70 py-10">
                        <div className="w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                              {/* Stats Card */}
                              <div className="space-y-6">
                                    <h2 className="text-2xl text-center font-bold text-slate-600/80">Website Statistics</h2>
                                    <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                                          <div className="bg-users_icon bg-no-repeat bg-center max-w-sm mx-auto w-full rounded-md shadow-xl text-center overflow-hidden">
                                                <div data-aos="fade-right" className="bg-slate-800/70 text-gray-200 p-6">
                                                      <p className="font-medium text-lg">{users?.length || 0}</p>
                                                      <h3 className="font-semibold capitalize text-xl">total users</h3>
                                                </div>
                                          </div>
                                          <div className="bg-class_icon bg-no-repeat bg-center max-w-sm mx-auto w-full rounded-md shadow-xl text-center overflow-hidden">
                                                <div data-aos="fade-left" className="bg-teal-800/70 text-gray-200 p-6">
                                                      <p className="font-medium text-lg">{totalClasses?.length || 0}</p>
                                                      <h3 className="font-semibold capitalize text-xl">total class</h3>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="bg-enrollment_icon bg-no-repeat bg-center max-w-sm mx-auto rounded-md shadow-xl text-center overflow-hidden">
                                          <div data-aos="fade-up-right" className="bg-gray-800/65 text-gray-200 p-6">
                                                <p className="font-medium text-lg">{enrollStudent?.length || 0}</p>
                                                <h3 className="font-semibold capitalize text-xl">total student enrollment</h3>
                                          </div>
                                    </div>
                              </div>

                              {/* Image Section */}
                              <div className="relative">
                                    <img
                                          src={analytics}
                                          alt="Website Statistics"
                                          className="w-full h-full object-cover"
                                    />
                              </div>
                        </div>
                  </div>
            </section>
      )
}

export default Statistics