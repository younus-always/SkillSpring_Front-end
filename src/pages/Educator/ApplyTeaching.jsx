import { TiWarningOutline } from "react-icons/ti";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import RejectedRequest from "../../components/ApplyTeacher/RejectedRequest";
import ApprovedRequest from "../../components/ApplyTeacher/ApprovedRequest";
import { useQuery } from "@tanstack/react-query";
import PendingRequest from "../../components/ApplyTeacher/PendingRequest";
import useAdmin from "../../hooks/useAdmin";
import useTeacher from "../../hooks/useTeacher";
import AdminTeacher from "../../components/ApplyTeacher/AdminTeacher";

const ApplyTeaching = () => {
      useTitle('Teach on SkillSpring');
      const { user } = useAuth();
      const axiosSecure = useAxiosSecure();
      const { isAdmin } = useAdmin();
      const { isTeacher } = useTeacher();
      const [titleError, setTitleError] = useState(null);
      const [categoryError, setCategoryError] = useState(null);
      const [experienceError, setExperienceError] = useState(null);

      // Tanstack query
      const { data: teacherData, isLoading, refetch } = useQuery({
            queryKey: ['teacher', user.email],
            queryFn: async () => {
                  const res = await axiosSecure.get(`/teachers/${user.email}`);
                  return res.data;
            }
      });

      // teacher request submit
      const handleSubmit = async e => {
            e.preventDefault();
            const email = user.email;
            const photo = user.photoURL;
            const form = new FormData(e.target);
            const name = form.get('name');
            const title = form.get('title');
            const category = form.get('category');
            const experience = form.get('experience');
            const status = 'pending';

            // Checking all input & select field
            if (!title) {
                  return setTitleError('title is required')
            }
            if (!experience) {
                  return setExperienceError('experiece is required')
            }
            if (!category) {
                  return setCategoryError('category is required')
            }
            const teacherData = { name, email, photo, title, category, experience, status }

            try {
                  // check if the teacher already applied ( server-side validation )
                  const { data: existingTeacher } = await axiosSecure.get(`/teachers/${user.email}`);
                  if (existingTeacher) {
                        e.target.reset()
                        return toast.error('You have already applied for this teaching position.');
                  }
                  // submit teacher application data to database
                  const { data } = await axiosSecure.post('/teacher', teacherData);
                  if (data.insertedId) {
                        e.target.reset();
                        refetch();  // refetch content update without reload 
                        return toast.success("Your request has been submitted for review!");
                  }
            } catch (error) {
                  console.error("Error submitting teacher request:", error);
                  toast.error("An error occurred while submitting your request.");
            }
      };

      // teacher request again func
      const handleRequestAgain = async () => {
            const { data } = await axiosSecure.patch(`/teachers/${user.email}`, { status: 'pending' });
            if (data.modifiedCount) {
                  refetch();  // refetch content update without reload
                  return toast.success("Your request has been successfully resubmitted! We will review it once again.")
            };
      }

      // role admin
      if (isAdmin) {
            return <AdminTeacher admin={isAdmin} />
      };

      // status accepted & role teacher
      if (isTeacher) {
            return <ApprovedRequest teacherData={teacherData} />
      };

      // status pending
      if (teacherData?.status === 'pending') {
            return <PendingRequest />
      };
      // status rejected 
      if (user?.status === undefined && teacherData?.status === "rejected") {
            return <RejectedRequest handleRequestAgain={handleRequestAgain} />
      };

      // new apply
      // if (user.email !== teacherData?.email)
      return (
            <section className="w-11/12 md:w-10/12 mx-auto py-10">
                  <div className="bg-white shadow-xl max-w-xl mx-auto p-5">
                        <h3 className="text-center text-lg font-semibold mb-3">Apply to a Teacher</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {/* name */}
                                    <div>
                                          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name</label>
                                          <div className="mt-2">
                                                <input type="text" name="name" id="name" defaultValue={user.displayName}
                                                      className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-1 focus:-outline-offset-1 focus:outline-green-600 sm:text-sm/6" />
                                          </div>
                                    </div>
                                    {/* email */}
                                    <div>
                                          <label className="block text-sm/6 font-medium text-gray-900">Email</label>
                                          <div className="mt-2">
                                                <input readOnly type="text" value={user.email} name="email"
                                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 sm:text-sm" />
                                          </div>
                                    </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {/* photoURL */}
                                    <div>
                                          <label className="block text-sm/6 font-medium text-gray-900">Photo</label>
                                          <div className="mt-2">
                                                <input readOnly type="text" value={user.photoURL} name="photo"
                                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 sm:text-sm" />
                                          </div>
                                    </div>
                                    {/* title */}
                                    <div>
                                          <label htmlFor="title" className="block text-sm/6 font-medium text-gray-900">Title</label>
                                          <div className="mt-2">
                                                <input type="text" name="title" id="title"
                                                      placeholder="Title"
                                                      onChange={() => setTitleError(null)}
                                                      className="block w-full rounded-md bg-white px-3 py-1 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-1 focus:-outline-offset-1 focus:outline-green-600 sm:text-sm/6" />
                                                {/* Errors Message */}
                                                {titleError && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />{titleError}</small>}
                                          </div>
                                    </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-2">
                                    {/* experience label */}
                                    <div>
                                          <label htmlFor="experience" className="block text-sm/6 font-medium text-gray-900">Experience</label>
                                          <div className="mt-2">
                                                <select name="experience" id="experience" defaultValue="Select experience label"
                                                      onChange={() => setExperienceError(null)}
                                                      className="block w-full rounded-md bg-white py-1.5 px-3 text-base outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-1 focus:-outline-offset-1 focus:outline-green-600 sm:text-sm/6 *:text-black">
                                                      <option defaultValue="" disabled >Select experience label</option>
                                                      <option value="Beginner">Beginner</option>
                                                      <option value="Intermediate">Intermediate</option>
                                                      <option value="Expert">Expert</option>
                                                </select>
                                          </div>
                                          {/* Errors Message */}
                                          {experienceError && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />{experienceError}</small>}
                                    </div>
                                    {/* categories */}
                                    <div>
                                          <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">Category</label>
                                          <div className="mt-2">
                                                <select name="category" id="category" defaultValue="Select category"
                                                      onChange={() => setCategoryError(null)}
                                                      className="block w-full rounded-md bg-white py-1.5 px-3 text-base outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-1 focus:-outline-offset-1 focus:outline-green-600 sm:text-sm/6 *:text-black">
                                                      <option defaultValue="" disabled>Select category</option>
                                                      <option value="Web Development">Web Development</option>
                                                      <option value="App Development">App Development</option>
                                                      <option value="Digital Marketing">Digital Marketing</option>
                                                      <option value="UI/UX Design">Graphic Design & UI/UX</option>
                                                      <option value="Cybersecurity">Cybersecurity</option>
                                                      <option value="Game Development">Game Development</option>
                                                      <option value="Data Science & Analytics">Data Science & Analytics</option>
                                                      <option value="Photography & Videography">Photography & Videography</option>
                                                </select>
                                          </div>
                                          {/* Errors Message */}
                                          {categoryError && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />{categoryError}</small>}
                                    </div>
                              </div>
                              {/* submit btn */}
                              <button type="submit" disabled={user?.status === undefined && teacherData?.status === 'pending'}
                                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm
                                          ${user?.status === undefined && teacherData?.status === 'pending'
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-green-600 hover:bg-green-500'}`}>Submit for Review</button>
                        </form >
                  </div >
            </section>
      )
};

export default ApplyTeaching