import { useLocation, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/shared/Loading";
import DashboardFooter from "../../../components/shared/DashboardFooter";
import useClasses from "../../../hooks/useClasses";
import useTitle from "../../../hooks/useTitle";
import SectionTitle from "../../../components/shared/SectionTitle";
import { FaPlus } from "react-icons/fa6";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { TiWarningOutline } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";


const ClassDetails = () => {
      useTitle("Class details");
      const axiosSecure = useAxiosSecure();
      const location = useLocation();
      const { detailsClass } = location.state || {};
      const [isOpen, setIsOpen] = useState(false);
      const [startDate, setStartDate] = useState(new Date());
      const [deadlineError, setDeadlineError] = useState(false);
      const { register, handleSubmit, reset, formState: { errors } } = useForm();


      // Assignment class fetch by Tanstack Query
      const { data: assignmentData, isLoading, refetch } = useQuery({
            queryKey: ["assignmentData"],
            queryFn: async () => {
                  const res = await axiosSecure.get('/assignments');
                  const specificAssignment = res.data?.filter(ass => ass.classId == detailsClass._id);
                  return specificAssignment;
            }
      });
      // Subimmted Assignment class fetch by Tanstack Query
      const { data: submittedAss } = useQuery({
            queryKey: ["submittedAss"],
            queryFn: async () => {
                  const { data } = await axiosSecure.get('/submittedAssignments');
                  const specificSubmitAssignment = data?.filter(submit => submit.submission_id === detailsClass._id);
                  return specificSubmitAssignment;
            }
      });

      // Modal open and close function
      const open = () => setIsOpen(true);
      const close = () => setIsOpen(false);
      // Assignment created function
      const onSubmit = async (data) => {
            try {
                  if (startDate > new Date()) setDeadlineError(false);
                  if (startDate <= new Date()) return setDeadlineError(true);
                  const assignment_details = {
                        classId: detailsClass._id,
                        title: data.title,
                        deadline: startDate.toLocaleDateString(),
                        description: data.description
                  };
                  const assRes = await axiosSecure.post('/assignment', assignment_details);
                  if (assRes.data.insertedId) {
                        refetch(); // update assignment count on real-time
                        reset(); // reset the form
                        close(); //close the modal
                        setStartDate(new Date());
                        toast.success("Assignment Created Successfully!", { position: "bottom-right" });
                  }
            } catch (error) {
                  console.log("Assignment submission error : ", error)
            }
      };

      if (isLoading) return <Loading />

      return (
            <>
                  <section className="w-11/12 mx-auto large:pt-4 pb-10 min-h-screen">
                        <SectionTitle title={"Class Analytics"} subTitle={"Stay updated with the latest enrollment and assignment statistics."} />
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 large:gap-5">
                              {/* class progress section */}
                              <div className="w-full lg:w-11/12 mx-auto xl:w-full xl:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                                    {/* Total enrollment card */}
                                    <div className="w-72 h-40 grid place-items-center md:w-auto mx-auto shadow-xl rounded-md p-6 text-center bg-cyan-800/90 text-white">
                                          <div>
                                                <p>{detailsClass?.enroll || 0}</p>
                                                <h3 className="font-medium text-lg">Total Enrollment</h3>
                                          </div>
                                    </div>
                                    {/* Total assignment card */}
                                    <div className="w-72 h-40 grid place-items-center md:w-auto mx-auto shadow-xl rounded-md p-6 text-center text-white bg-slate-600/70">
                                          <div>
                                                <p>{assignmentData?.length || 0}</p>
                                                <h3 className="font-medium text-lg">Total Assignment</h3>
                                          </div>
                                    </div>
                                    {/* Total assignment submission */}
                                    <div className="w-72 h-40 grid place-items-center md:w-auto mx-auto shadow-xl rounded-md p-6 text-center bg-green-600/80 text-white">
                                          <div>
                                                <p>{submittedAss?.length || 0}</p>
                                                <h3 className="font-medium text-lg">Total Assignment <br /> Submission</h3>
                                          </div>
                                    </div>
                              </div>
                              {/* class assignment section */}
                              <div className="xl:col-span-1 space-y-2">
                                    <div className="text-center">
                                          <h2 className="text-lg sm:text-xl font-semibold">Create new assignment</h2>
                                          <p className="text-gray-600">Easily add new assignments and set deadlinew for students.</p>
                                    </div>
                                    {/* create assignment button */}
                                    <button type="button" onClick={open} className="flex items-center gap-4 mx-auto py-2 px-7 rounded-3xl bg-green-600 text-white">
                                          <FaPlus size={22} />
                                          <span>Create</span>
                                    </button>
                              </div>
                        </div>
                  </section>
                  {/* Modal for create assignment form */}
                  <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
                              <div className="flex min-h-full items-center justify-center p-4">
                                    <DialogPanel
                                          transition
                                          className="w-full max-w-md mt-32 large:mt-0 rounded-xl bg-white/80 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                    >
                                          <DialogTitle as="h3" className="text-base/7 font-semibold text-slate-700 text-center">
                                                Fill the form
                                          </DialogTitle>
                                          <p className="mt-2 text-sm/6 text-slate-800 text-center">
                                                Modify and improve your class information to ensure it’s up-to-date and relevant for your students.
                                          </p>
                                          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                                {/*assignment title */}
                                                <div>
                                                      <label htmlFor="title" className="text-sm/6 font-medium text-gray-900">Title</label>
                                                      <div className="mt-2">
                                                            <input type="text" name="title" id="title"
                                                                  {...register("title", {
                                                                        required: true,
                                                                        pattern: /^[a-zA-Z\s]+$/
                                                                  })}
                                                                  placeholder="Assignment title"
                                                                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                                                            {/* Error msg */}
                                                            {errors.title?.type === "required" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Title is required.</small>}
                                                            {errors.title?.type === "pattern" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Invalid title.</small>}
                                                      </div>
                                                </div>
                                                {/* Deadline */}
                                                <div className="relative">
                                                      <label htmlFor="deadline" className="text-sm/6 font-medium text-gray-900">Deadline</label>
                                                      <div className="mt-2 relative">
                                                            <DatePicker
                                                                  showIcon
                                                                  toggleCalendarOnIconClick
                                                                  selected={startDate}
                                                                  onChange={(date) => setStartDate(date)}
                                                                  id="deadline"
                                                                  className="block w-[400px] space-x-4 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" />
                                                            {/* Error msg */}
                                                            {deadlineError && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Deadline must be a future date.</small>}
                                                      </div>
                                                </div>
                                                {/* description */}
                                                <div>
                                                      <label htmlFor="description" className="text-sm/6 font-medium text-green-900">Description</label>
                                                      <div className="mt-2">
                                                            <textarea name="description" id="description"
                                                                  {...register("description", {
                                                                        required: true
                                                                  })}
                                                                  placeholder="Assignment description..."
                                                                  className="block w-full h-32 max-h-44 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-2 outline-gray-300 placeholder:text-gray-400 focus:outline-green-500 sm:text-sm/6" />
                                                            {/* Error msg */}
                                                            {errors.description?.type === "required" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Description is required.</small>}
                                                      </div>
                                                </div>
                                                {/* Add assignment btn */}
                                                <div>
                                                      <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Add Assignment</button>
                                                </div>
                                          </form>
                                    </DialogPanel>
                              </div>
                        </div>
                  </Dialog>
                  <DashboardFooter />
            </>
      )
}

export default ClassDetails