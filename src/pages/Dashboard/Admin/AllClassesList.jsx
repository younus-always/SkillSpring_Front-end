import useClasses from "../../../hooks/useClasses";
import useTitle from "../../../hooks/useTitle";
import teacherLodingSpinner from "../../../assets/spinner/user-loading.gif";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SuccessModal from "../../../components/Modal/SuccesModal";
import { useState } from "react";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/shared/SectionTitle";
import DashboardFooter from "../../../components/shared/DashboardFooter";
import classImg from "../../../assets/icons/total-class.png";

const AllClassesList = () => {
      useTitle("All teacher class");
      const [classes, isLoading, refetch] = useClasses();
      const axiosSecure = useAxiosSecure();
      const [isOpen, setIsOpen] = useState(false);
      // Modal open close function
      function open() {
            setIsOpen(true)
      };
      function close() {
            setIsOpen(false)
      };
      // Approve the class
      const handleApprovedClass = async (id) => {
            try {
                  const { data } = await axiosSecure.patch(`/class/${id}`, { status: 'accepted' });
                  if (data.modifiedCount) {
                        refetch() // refetch content update without reload
                        open() // open success modal
                        setTimeout(() => {
                              close(); // auto close modal after 2 second 
                        }, 2500);
                  }
            } catch (error) {
                  console.log("approved class error", error)
            }
      };
      // Reject the class
      const handleRejectClass = (id) => {
            Swal.fire({
                  title: "Are you sure?",
                  text: `You wan't to reject this class!`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  cancelButtonText: "No, Don't Reject!",
                  confirmButtonText: "Yes, Reject!"
            }).then(async (result) => {
                  if (result.isConfirmed) {
                        try {
                              const { data } = await axiosSecure.patch(`/class/${id}`, { status: 'rejected' });
                              if (data.modifiedCount) {
                                    refetch() // refetch content update without reload
                                    Swal.fire({
                                          title: "Rejected!",
                                          text: `This class has been rejected by admin.`,
                                          icon: "success"
                                    });
                              }
                        } catch (error) {
                              console.log("reject class error:", error)
                        }
                  }
            })
      };
      // See class progress
      const handleProgressClass = c => {
            console.log(c)
      }


      return (
            <>
                  <section className="w-11/12 md:w-10/12 mx-auto pt-0 large:pt-4 pb-10 min-h-screen">
                        <SectionTitle title={"Comprehensive Class Management"} subTitle={"Approve, Reject, and Track Teacher's Classes in Real-Time for Effective Management"} />
                        <div className="flex items-center flex-wrap space-x-8 justify-center bg-gradient-to-br from-slate-900/80 via-slate-700/50 via-gray-500/80 to-slate-800/90 backdrop-blur-lg rounded p-5">
                              <h1 className="md:text-lg lg:text-xl font-bold text-gray-200">Total Teacher: {classes?.filter((classItem, index, self) => index === self.findIndex(item => item.email === classItem.email)).length}
                              </h1>
                              <h1 className="md:text-lg lg:text-xl font-bold text-gray-200">Approved Class: {classes?.filter(c => c.status === "accepted").length}</h1>
                              <h1 className="md:text-lg lg:text-xl font-bold text-gray-200">Reject Class: {classes?.filter(c => c.status === "rejected").length}</h1>
                        </div>
                        {/* Table */}
                        <div className="overflow-x-auto bg-base-100 shadow-lg rounded mt-6">
                              <table className="table">
                                    <thead>
                                          <tr>
                                                <th>Image</th>
                                                <th>Email</th>
                                                <th>Title</th>
                                                <th>Short Description</th>
                                                <th>Progress</th>
                                                <th>Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {isLoading ? (
                                                <tr>
                                                      <td colSpan="6" className="text-center p-4">
                                                            <img src={teacherLodingSpinner} alt="" className="w-10 mx-auto animate-spin" /></td>
                                                </tr>
                                          ) : (classes.length > 0 ?
                                                classes.map(c => <tr key={c._id} className="hover:bg-gray-200">
                                                      <td>
                                                            <img
                                                                  src={c.image}
                                                                  alt={`${c.title} 'photo'`}
                                                                  className="w-10 h-10 ring-1  rounded-full object-cover"
                                                            />
                                                      </td>
                                                      <td>{c.email}</td>
                                                      <td>{c.title}</td>
                                                      <td>{c.description.length > 40 ? `${c.description.slice(0, 40)}...` : c.description}</td>
                                                      <td>
                                                            <button type="button"
                                                                  onClick={() => handleProgressClass(c)}
                                                                  disabled={c.status === 'pending' || c.status === 'rejected'}
                                                                  className={`px-3 py-1.5 rounded text-white transition-all shadow ${c.status === 'rejected' || c.status === 'pending'
                                                                        ? 'cursor-not-allowed bg-gray-400 active:scale-100'
                                                                        : 'bg-sky-500 hover:bg-sky-600 active:scale-95'}`}>
                                                                  Progress
                                                            </button>
                                                      </td>
                                                      <td>
                                                            <div className="flex items-center gap-2">
                                                                  <button type="button"
                                                                        onClick={() => handleApprovedClass(c._id)}
                                                                        disabled={c.status === 'accepted' || c.status === 'rejected'}
                                                                        className={`px-3 py-1.5 rounded transition-all shadow ${c.status === 'accepted' || c.status === 'rejected'
                                                                              ? 'cursor-not-allowed bg-gray-400 text-white active:scale-100'
                                                                              : "bg-green-600 text-white hover:bg-green-500 active:scale-95 "
                                                                              }`}
                                                                  >
                                                                        Approved
                                                                  </button>
                                                                  <button type="button"
                                                                        onClick={() => handleRejectClass(c._id)}
                                                                        disabled={c.status === 'rejected'}
                                                                        className={`px-3 py-1.5 rounded shadow text-white transition-all ${c.status === 'rejected'
                                                                              ? 'cursor-not-allowed bg-gray-400 active:scale-100'
                                                                              : 'bg-red-600 hover:bg-red-500 active:scale-95'}`}>
                                                                        Reject
                                                                  </button>
                                                            </div>
                                                      </td>
                                                </tr>)
                                                : <tr>
                                                      <td colSpan="6" className="flex items-center justify-center gap-4 p-4">
                                                                  <img src={classImg} alt="" className="w-12 h-12" />
                                                            <span className="text-red-500 font-medium">No class found</span>
                                                      </td>
                                                </tr>)
                                          }
                                    </tbody>
                              </table>
                        </div>
                        {/* Modal */}
                        <SuccessModal isOpen={isOpen} close={close} message={"Successfully approved the class"} title={"Class approved success!"} />
                  </section>
                  <DashboardFooter />
            </>
      )
}

export default AllClassesList