import useAxiosSecure from "../../../hooks/useAxiosSecure"
import Loading from "../../../components/shared/Loading";
import { Dialog, DialogPanel, DialogTitle, } from "@headlessui/react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useClasses from "../../../hooks/useClasses";
import useTitle from "../../../hooks/useTitle";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteSweep } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import SectionTitle from "../../../components/shared/SectionTitle";
import DashboardFooter from "../../../components/shared/DashboardFooter";
import useTeacher from "../../../hooks/useTeacher";
import findClass from "../../../assets/icons/find-a-class.png";

const MyClass = () => {
      useTitle("My classes");
      const axiosSecure = useAxiosSecure();
      const navigate = useNavigate();
      const { isTeacher } = useTeacher();
      const [classes, isLoading, refetch] = useClasses();
      const [isOpen, setIsOpen] = useState(false);
      const [classData, setClassData] = useState({});
      const { register, handleSubmit, reset, formState: { errors } } = useForm();
      const { _id, name, email, title, image, price, description } = classData;
      const myClasses = classes?.filter(c => c.email === isTeacher.email);

      // Modal open function
      const open = () => setIsOpen(true)
      // Modal close function
      const close = () => setIsOpen(false)

      // Open a modal for update class and class data store
      const handleUpdateBtn = (singleClass) => {
            setClassData(singleClass); // prev class data store a state variable
            open(); // open modal
      };

      // Update function
      const onSubmit = async (data) => {

            const updateClass = {
                  name,
                  email,
                  title: data.title,
                  price: data.price,
                  description: data.description,
                  status: 'pending'
            };
            try {
                  const updatedRes = await axiosSecure.put(`/classes/${_id}`, updateClass);
                  if (updatedRes.data.modifiedCount) {
                        reset(); // reset the form
                        // success msg
                        Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: "Your class details has been updated",
                              showConfirmButton: false,
                              timer: 1500
                        });
                        refetch(); // refetch content update without reload
                        close(); // close the modal
                  };
            } catch (error) {
                  console.log("class update error", error)
            }
      };

      // Delete function
      const handleDeleteClass = (singleClass) => {
            Swal.fire({
                  title: "Are you sure?",
                  text: `You wan't to delete this class!`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Delete"
            }).then(async (result) => {
                  if (result.isConfirmed) {
                        const { data } = await axiosSecure.delete(`/classes/${singleClass._id}`);
                        if (data.deletedCount) {
                              refetch(); // refetch content update without reload
                              Swal.fire({
                                    title: "Deleted!",
                                    text: `Class deleted successfully.`,
                                    icon: "success"
                              });
                        }
                  }
            });
      };
      // Class details function
      const handleDetailClass = (singleClass) => {
            navigate(`/dashboard/teacher/my-class/${singleClass._id}`, { state: { detailsClass: singleClass } })
      };

      if (isLoading) return <Loading />

      return (
            <>
                  <section className="w-11/12 mx-auto py-8 min-h-screen">
                        <SectionTitle title={"Classes You've Created!"} subTitle={"Manage and track all the classes you've added to the platform. Review their status, enrollments, and details in one place."} />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gradient-to-br from-slate-900/80 via-blue-200 via-green-200 to-slate-800/90 backdrop-blur-lg rounded p-4 mb-6 text-gray-700">
                              {/* Total Class Count  */}
                              <h2 className="font-semibold sm:text-base md:text-lg">Total class : {myClasses.length}</h2>
                              <h2 className="font-semibold sm:text-base md:text-lg">Approved class : {myClasses?.filter(c => c.status === "accepted").length}</h2>
                              <h2 className="font-semibold sm:text-base md:text-lg">Pending class : {myClasses?.filter(c => c.status === "pending").length}</h2>
                              <h2 className="font-semibold sm:text-base md:text-lg">Rejected class : {myClasses?.filter(c => c.status === "rejected").length}</h2>
                        </div>

                        {/* Card container */}
                        <div className="grid grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 gap-7 md:gap-5">
                              {myClasses.length > 0 ?
                                    myClasses.map(c =>
                                          <div key={c._id} className="card rounded-lg bg-base-100 max-w-md mx-auto shadow-xl group">
                                                <figure className="h-64 mx-4 mt-5 sm:mx-5 rounded-md overflow-hidden">
                                                      <img
                                                            src={c.image}
                                                            alt={`${c.title} 'photo'`}
                                                            className="w-full h-full object-cover rounded-md overflow-hidden group-hover:scale-105 transition-all" />
                                                </figure>
                                                <div className="card-body p-4 sm:p-6">
                                                      <div>
                                                            {/* title and status */}
                                                            <h2 className="card-title gap-6 mb-3">
                                                                  {c.title}
                                                                  <div
                                                                        className={`badge text-white font-medium ${c.status === "accepted" ? 'badge-success' : c.status === "rejected" ? 'badge-error' : 'badge-secondary'}`}>{c.status}</div>
                                                            </h2>
                                                            {/* name */}
                                                            <h4><strong>Name : </strong><span className="font-medium">{c.name}</span></h4>
                                                            {/* email */}
                                                            <h4><strong>Email : </strong><span className="font-medium">{c.email}</span></h4>
                                                            {/* price */}
                                                            <h4><strong>Price : </strong><span className="font-medium">${c.price}</span></h4>

                                                      </div>
                                                      {/* description */}
                                                      <p>{c.description?.length >= 80 ? `${c.description.slice(0, 80)}...` : c.description}</p>
                                                      {/* buttons */}
                                                      <div className="space-y-2">
                                                            <div className="grid grid-cols-2 gap-3">
                                                                  <button type="button" onClick={() => handleUpdateBtn(c)}
                                                                        data-tooltip-id="my-tooltip" data-tooltip-content="Update"
                                                                        data-tooltip-delay-show={300}
                                                                        className="flex items-center justify-center
                                                            bg-gray-200 hover:bg-gray-300 text-amber-500 rounded-md py-1.5 px-3 active:scale-95 transition-all">
                                                                        <AiFillEdit size={22} />
                                                                  </button>
                                                                  {/* delete btn */}
                                                                  <button type="button" onClick={() => handleDeleteClass(c)}
                                                                        data-tooltip-id="my-tooltip" data-tooltip-content="Delete"
                                                                        data-tooltip-delay-show={300}
                                                                        className="flex items-center justify-center bg-gray-200 py-1.5 px-3 rounded-md hover:bg-gray-300 text-red-500 active:scale-95 transition-all">
                                                                        <MdDeleteSweep size={22} />
                                                                  </button>
                                                            </div>
                                                            {/* details btn */}
                                                            <button type="button" onClick={() => handleDetailClass(c)}
                                                                  disabled={c.status === 'pending' || c.status === "rejected"}
                                                                  className={`${c.status === "pending" || c.status === "rejected" ? 'bg-gray-400 active:scale-100 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 active:scale-95 transition-all'} block w-full text-center text-white rounded-md py-2 px-3`}>
                                                                  See Details
                                                            </button>
                                                      </div>
                                                </div>
                                          </div>
                                    )
                                    : <div className="col-span-full flex items-center justify-center gap-4">
                                          <img src={findClass} alt="" className="w-12" />
                                          <p className="font-medium text-red-500">No class created yet</p>
                                    </div>
                              }
                        </div>

                        {/* Modal for update class*/}
                        <Dialog Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                              <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/30 backdrop-blur-sm">
                                    <div className="flex min-h-full items-center justify-center p-4">
                                          <DialogPanel
                                                transition
                                                className="w-full max-w-md mt-32 large:mt-0 rounded-xl bg-white/80 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                          >
                                                <DialogTitle as="h3" className="text-base/7 font-semibold text-slate-700 text-center">
                                                      Update Class Details
                                                </DialogTitle>
                                                <p className="mt-2 text-sm/6 text-slate-800 text-center">
                                                      Modify and improve your class information to ensure it’s up-to-date and relevant for your students.
                                                </p>
                                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
                                                      {/* name */}
                                                      <div>
                                                            <label className="text-sm/6 font-medium text-gray-900">Name</label>
                                                            <div className="mt-2">
                                                                  <input type="text" name="name" readOnly defaultValue={name}
                                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6" />
                                                            </div>
                                                      </div>
                                                      {/* email */}
                                                      <div>
                                                            <label className="text-sm/6 font-medium text-gray-900">Email</label>
                                                            <div className="mt-2">
                                                                  <input type="email" name="email" readOnly defaultValue={email}
                                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6" />
                                                            </div>
                                                      </div>
                                                      {/* title */}
                                                      <div>
                                                            <label htmlFor="title" className="text-sm/6 font-medium text-gray-900">Title</label>
                                                            <div className="mt-2">
                                                                  <input type="text" name="title" id="title" defaultValue={title}
                                                                        {...register("title", {
                                                                              required: true,
                                                                              pattern: /^[a-zA-Z0-9\s:;,]+$/
                                                                        })}
                                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                                                                  {/* Error msg */}
                                                                  {errors.title?.type === "required" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Title is required.</small>}
                                                                  {errors.title?.type === "pattern" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Invalid title.</small>}
                                                            </div>
                                                      </div>
                                                      {/* price */}
                                                      <div>
                                                            <label htmlFor="price" className="text-sm/6 font-medium text-gray-900">Price</label>
                                                            <div className="mt-2">
                                                                  <input type="number" name="price" id="price" defaultValue={price}
                                                                        {...register("price", {
                                                                              required: true,
                                                                              min: 80,
                                                                              pattern: /^(?![+-]|0\d|\d*[\+\-]\d*)\d+$/
                                                                        })}
                                                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" />
                                                                  {/* Error msg */}
                                                                  {errors.price?.type === "required" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Price is required</small>}
                                                                  {errors.price?.type === "min" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Price must be at least $80</small>}
                                                                  {errors.price?.type === "pattern" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Invalid price amount.</small>}

                                                            </div>
                                                      </div>
                                                      {/* description */}
                                                      <div>
                                                            <label htmlFor="description" className="text-sm/6 font-medium text-green-900">Description</label>
                                                            <div className="mt-2">
                                                                  <textarea name="description" id="description" defaultValue={description}
                                                                        {...register("description", {
                                                                              required: true,
                                                                              minLength: 60
                                                                        })}
                                                                        className="block w-full h-32 max-h-44 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-2 outline-gray-300 placeholder:text-gray-400 focus:outline-green-500 sm:text-sm/6" />
                                                                  {/* Error msg */}
                                                                  {errors.description?.type === "required" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Description is required.</small>}
                                                                  {errors.description?.type === "minLength" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Write description must be 60 characters long.</small>}
                                                            </div>
                                                      </div>
                                                      {/* Add class btn */}
                                                      <div>
                                                            <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 active:scale-95 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Add Class</button>
                                                      </div>
                                                </form>
                                          </DialogPanel>
                                    </div>
                              </div>
                        </Dialog>
                        <Tooltip id="my-tooltip" />
                  </section>
                  <DashboardFooter />
            </>
      )
}

export default MyClass