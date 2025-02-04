import DashboardFooter from "../../../components/shared/DashboardFooter";
import useTitle from "../../../hooks/useTitle";
import userLoadingSpinner from "../../../assets/spinner/loading.gif";
import { useNavigate } from "react-router-dom";
import usePayments from "../../../hooks/usePayments";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../components/shared/SectionTitle";

const MyEnrollClass = () => {
      useTitle("Enroll classes");
      const { user } = useAuth();
      const [payments, isLoading] = usePayments();
      const navigate = useNavigate();
      const userEnrollClass = payments?.filter(p => p.email === user.email);
      //== navigate each class assignment page & pass the class-id using location.state == 
      const handleNavigateAssignmentClass = (_id, enrollClass) => {
            navigate(`/dashboard/student/my-enroll-class/${_id}`, { state: { enrollClass: enrollClass } });
      };


      return (
            <>
                  <section className="w-11/12 mx-auto pb-10 min-h-screen">
                        <SectionTitle title={"Your Enrolled Classes"} subTitle={"Keep track of your learning progress with the classes you've already joined. Dive back in and continue your journey to success!"} />
                        {/* Table */}
                        <div className="overflow-x-auto max-w-5xl mx-auto shadow-lg rounded mt-6">
                              <table className="table">
                                    <thead>
                                          <tr>
                                                <th>Image</th>
                                                <th>Teacher</th>
                                                <th>Title</th>
                                                <th>Transaction Id</th>
                                                <th>Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {isLoading ? (<tr>
                                                <td colSpan="4" className="text-center p-4">
                                                      <img src={userLoadingSpinner} alt="" className="w-10 mx-auto animate-spin" />
                                                </td>
                                          </tr>) : userEnrollClass?.length > 0 ? (
                                                userEnrollClass.map((enroll) =>
                                                      <tr key={enroll._id} className="hover:bg-gray-200">
                                                            <td>
                                                                  <img
                                                                        src={enroll.image}
                                                                        alt="user photo"
                                                                        className="w-10 h-10 rounded-full object-cover"
                                                                  />
                                                            </td>
                                                            <td>{enroll.teacher}</td>
                                                            <td>{enroll.title}</td>
                                                            <td>{enroll.transaction_id}</td>
                                                            <td>
                                                                  <button type="button"
                                                                        onClick={() => handleNavigateAssignmentClass(enroll._id, enroll)}
                                                                        className="px-4 py-2 rounded transition-all bg-green-600 text-white hover:bg-green-500 active:scale-95">
                                                                        Continue
                                                                  </button>
                                                            </td>
                                                      </tr>
                                                )
                                          ) : (
                                                <tr>
                                                      <td colSpan="4" className="flex items-center justify-center gap-4 p-4">
                                                            <img src="" alt="" />
                                                            <span className="text-red-500 font-medium">
                                                                  You don't have enroll any class.</span>
                                                      </td>
                                                </tr>
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  </section>
                  <DashboardFooter />
            </>
      )
}

export default MyEnrollClass