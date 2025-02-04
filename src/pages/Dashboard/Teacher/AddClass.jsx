import { useForm } from "react-hook-form";
import useTeacher from "../../../hooks/useTeacher";
import { TiWarningOutline } from "react-icons/ti";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import SuccessModal from '../../../components/Modal/SuccesModal';
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Button, Dialog, DialogPanel } from "@headlessui/react";
import SectionTitle from "../../../components/shared/SectionTitle";
import DashboardFooter from "../../../components/shared/DashboardFooter";
import previewLoading from "../../../assets/spinner/loading.gif";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
// Image host to imgbb
const image_hosting_key = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddClass = () => {
      useTitle("Add class");
      const { isTeacher } = useTeacher();
      const axiosSecure = useAxiosSecure();
      const axiosPublic = useAxiosPublic();
      const navigate = useNavigate();
      const [isOpen, setIsOpen] = useState(false);
      const [isPreview, setIsPreview] = useState(false);
      const [imageInfo, setImageInfo] = useState({});
      const [previewImgLoading, setImgLoading] = useState(false);
      const { name, email } = isTeacher || {};
      const { register, handleSubmit, reset, formState: { errors } } = useForm();


      // Modal open function
      const open = () => setIsOpen(true);
      // Modal close function
      const close = () => setIsOpen(false);

      // File input image onchange post to imgbb
      const handleImageChange = async (e) => {
            try {
                  setImgLoading(true)
                  const imageFile = { image: e.target.files[0] };
                  console.log(imageFile)
                  if (imageFile) {
                        const { data } = await axiosPublic.post(image_hosting_url, imageFile, {
                              headers: { "content-type": "multipart/form-data" },
                        });
                        const imageRes = data.data;
                        const imageInfo = {
                              photo: imageRes.display_url,
                              size: imageRes.size,
                              width: imageRes.width,
                              height: imageRes.height,
                              timeStamp: imageRes.time,
                        };
                        setImageInfo(imageInfo);
                  };
            } catch (error) {
                  console.log("image hosting on imgbb caughing error : ", error)
            } finally {
                  setImgLoading(false);
            }
      };

      // image size formatting
      const formatSize = () => {
            if (imageInfo.size < 1024) return imageInfo.size + "B";

            let kb = imageInfo.size / 1024;
            if (kb < 1024) return kb.toFixed(2) + " KB";

            let mb = kb / 1024;
            if (mb < 1024) return mb.toFixed(2) + " MB";

            let gb = mb / 1024;
            if (gb < 1024) return gb.toFixed(2) + " GB";
      };

      const handlePreviewImage = () => {
            setIsPreview(true)
      }

      // submit the class 
      const onSubmit = async (data) => {
            try {
                  const classInfo = {
                        name: name,
                        email: email,
                        title: data.title,
                        image: imageInfo.photo,
                        price: data.price,
                        description: data.description,
                        status: "pending",
                  };
                  // send class info to server
                  const res = await axiosSecure.post("/classes", classInfo);
                  if (res.data.insertedId) {
                        reset(); // Reset the form
                        open(); // open the modal

                        // Delay navigation and modal is visible
                        setTimeout(() => {
                              navigate("/dashboard/teacher/my-class"); // Redirect after delay
                        }, 200);

                        // Close the modal after 2.5 seconds
                        setTimeout(() => {
                              close();
                        }, 3000); // Ensure a longer delay for modal visibility
                  }
            } catch (error) {
                  console.error("Error submitting class:", error);
            }
      };


      return (
            <>
                  <section className="w-11/12 mx-auto pb-10 relative -z-0 min-h-screen">
                        <SectionTitle title={"Share Your Knowledge with Engaging Classes"} subTitle={"Manage and Showcase Your Classes to Inspire Learners Worldwide"} />
                        <div className="max-w-md mx-auto p-6 shadow-lg rounded-md">
                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {/* name */}
                                    <div>
                                          <label className="text-sm/6 font-medium text-gray-900">Name</label>
                                          <div className="mt-2">
                                                <input type="text" readOnly defaultValue={name}
                                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6" />
                                          </div>
                                    </div>
                                    {/* email */}
                                    <div>
                                          <label className="text-sm/6 font-medium text-gray-900">Email</label>
                                          <div className="mt-2">
                                                <input type="email" readOnly defaultValue={email}
                                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6" />
                                          </div>
                                    </div>
                                    {/* title */}
                                    <div>
                                          <label htmlFor="title" className="text-sm/6 font-medium text-gray-900">Title</label>
                                          <div className="mt-2">
                                                <input type="text" name="title" id="title"
                                                      {...register("title", {
                                                            required: true,
                                                            pattern: /^[a-zA-Z0-9\s:;,]+$/
                                                      })}
                                                      placeholder="Title"
                                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                                                {/* Errors Message */}
                                                {errors.title?.type === 'required' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Title is required</small>}
                                                {errors.title?.type === "pattern" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Invalid title.</small>}
                                          </div>
                                    </div>
                                    {/* image */}
                                    <div>
                                          <label htmlFor="photo" className="text-sm/6 font-medium text-gray-900">Photo</label>
                                          <div className="mt-2">
                                                <input type="file" id="photo" accept="image/*"
                                                      {...register("photo", { required: true })}
                                                      onChange={handleImageChange}
                                                      className="file-input h-8 rounded-md w-full outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-1 focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" />
                                                {/* Error message */}
                                                {errors.photo?.type === "required" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Photo is required</small>}
                                          </div>
                                    </div>
                                    {/* image preview */}
                                    {
                                          previewImgLoading
                                                ? (<div>
                                                      <img src={previewLoading} alt="" className="w-8 h-8" />
                                                </div>)
                                                : (<div className={`${!imageInfo.photo && !imageInfo.size && 'hidden'} flex items-center justify-between gap-2`}>
                                                      <p><span className="font-medium">Size : </span><span>{formatSize()}</span></p>
                                                      <button type="button" onClick={handlePreviewImage} className="flex items-center gap-2 px-2 py-1 rounded text-white bg-gradient-to-tr from-stone-500 to-green-500 hover:from-stone-600 hover:to-green-600 transition-all text-sm">
                                                            <FaEye />
                                                            <span>Preview</span>
                                                      </button>
                                                </div>)
                                    }
                                    {/* price */}
                                    <div>
                                          <label htmlFor="price" className="text-sm/6 font-medium text-gray-900">Price</label>
                                          <div className="mt-2">
                                                <input type="number" name="price" id="price"
                                                      {...register("price", {
                                                            required: true,
                                                            min: 50
                                                      })}
                                                      placeholder="Price"
                                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-green-500 sm:text-sm/6" />
                                                {/* Errors Message */}
                                                {errors.price?.type === 'required' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Price is required</small>}
                                                {errors.price?.type === 'min' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Minimum price at least $50</small>}
                                          </div>
                                    </div>
                                    {/* description */}
                                    <div>
                                          <label htmlFor="description" className="text-sm/6 font-medium text-green-900">Description</label>
                                          <div className="mt-2">
                                                <textarea name="description" id="description"
                                                      {...register("description", {
                                                            required: true,
                                                            minLength: 60
                                                      })}
                                                      placeholder="write description here..."
                                                      className="block w-full h-32 max-h-44 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1  -outline-offset-2 outline-gray-300 placeholder:text-gray-400 focus:outline-green-500 sm:text-sm/6" />
                                                {/* Errors msg */}
                                                {errors.description?.type === "required" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Description is required.</small>}
                                                {errors.description?.type === "minLength" && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />Write description must be 60 characters long.</small>}
                                          </div>
                                    </div>
                                    {/* Add class btn */}
                                    <div>
                                          <button type="submit" className="w-full rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 active:scale-95 transition-all">Submit Class</button>
                                    </div>
                              </form>
                        </div >
                        {/* Image preview modal */}
                        <Dialog open={isPreview} as="div" className="z-20 focus:outline-none" onClose={() => { }}>
                              <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
                                    <div className="flex min-h-full pt-32 pb-8 large:py-8 items-center justify-center p-4 relative bg-black/10 backdrop-blur">
                                          <DialogPanel
                                                transition
                                                className="large:max-w-4xl large:-mr-[5%] large:ml-[10%] rounded-md bg-white/70 shadow-md text-slate-50 p-5 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                          >
                                                <div className="rounded-md w-full">
                                                      < img src={imageInfo.photo} alt="" className="rounded-md w-full" />
                                                </div>
                                                <div className="absolute top-0 right-0">
                                                      <Button
                                                            className="inline-flex items-center gap-2 rounded-full bg-red-500 p-1 text-sm/6 font-semibold text-white shadow focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                                            onClick={() => setIsPreview(false)}
                                                      >
                                                            <IoClose size={16} />
                                                      </Button>
                                                </div>
                                          </DialogPanel>
                                    </div>
                              </div>
                        </Dialog>

                        {/* Modal success msg */}
                        < SuccessModal title={"Success!"} message={"Your class was added successfully."} isOpen={isOpen} close={close} />
                  </section >
                  <DashboardFooter />
            </>
      )
}

export default AddClass