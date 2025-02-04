import userLoadingSpinner from "../../../assets/spinner/loading.gif";
import useTitle from "../../../hooks/useTitle";
import DashboardFooter from "../../../components/shared/DashboardFooter";
import useAssignments from "../../../hooks/useAssignments";
import { useLocation } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { TiWarningOutline } from "react-icons/ti";
import SectionTitle from "../../../components/shared/SectionTitle";

const EnrollAssignment = () => {
      useTitle("Available assignment");
      const { user } = useAuth();
      const axiosSecure = useAxiosSecure();
      const location = useLocation();
      const { enrollClass } = location.state;
      const [isOpen, setIsOpen] = useState(false);
      const [ratings, setRatings] = useState(0);
      const [ratingError, setRatingError] = useState("");
      const [feedbackError, setFeedbackError] = useState("");
      const [assignments, isLoading, refetch] = useAssignments();
      const { title, class_id } = enrollClass || {};
      const enrolledAssignment = assignments?.filter(assignment => assignment.classId === class_id);

      // Load submitted-assignments by Tanstack Query
      const { data: submitted, refetch: submitRefetch } = useQuery({
            queryKey: ["submitted"],
            queryFn: async () => {
                  const { data } = await axiosSecure.get('/submittedAssignments');
                  return data;
            }
      });

      // Modal open & close function
      const open = () => setIsOpen(true);
      const close = () => setIsOpen(false);

      // Submit feedback function
      const handleFedback = async (e) => {
            e.preventDefault();
            const message = e.target.message.value.trim();
            // Check if the user has selected a rating
            if (ratings === 0) return setRatingError("Please provide a rating!");
            setRatingError("");
            // Check if the message is empty
            if (!message) return setFeedbackError('Description is required!');

            const feedbackData = {
                  name: user.displayName,
                  image: user.photoURL,
                  class_title: title,
                  rating: ratings,
                  message: message
            };
            const { data } = await axiosSecure.post('/reviews', feedbackData);
            if (data.insertedId) {
                  close(); //close the feedback modal immediatly
                  e.target.reset();  // Reset the form
                  setFeedbackError("");
                  setRatings(0);
                  toast.success("Your Feedback Submitted Successfully!");
            };
      };

      // Submit Assignment function
      const handleSubmitAssignment = async (ass) => {
            // If already submit assignment
            // if (submitted?.find(s => s.submission_id === ass.classId)) {
            //       return toast.error("You have already submitted this assignment.");
            // };

            const submission = {
                  name: user.displayName,
                  email: user.email,
                  submission_id: ass.classId
            };
            // save submission info to database
            const { data } = await axiosSecure.post('/submittedAssignments', submission);
            if (data.insertedId) {
                  submitRefetch();
                  toast.success("Assignment submitted done successfully!");
            };
            // patch submission count 
            const submissionRes = await axiosSecure.patch(`/assignment/${ass._id}`);
            if (submissionRes.data.modifiedCount) {
                  refetch();
            }
      };


      return (
            <>
                  <section className="w-11/12 mx-auto pb-10 min-h-screen">
                        <SectionTitle title={"Class Assignments & Feedback"} subTitle={"Submit your assignments and provide valuable feedback for your enrolled classes. Your input helps us improve your learning experience!"} />
                        <div className="max-w-5xl mx-auto">
                              <div className="flex items-center gap-4">
                                    <h3 className="text-xl font-medium capitalize">teaching evalution report : </h3>
                                    <button type="button"
                                          onClick={enrolledAssignment?.length > 0 && open}
                                          className={`py-1.5 px-5 rounded-xl font-medium border text-sm ${enrolledAssignment?.length <= 0 ? 'text-white border-gray-400 bg-gray-400 cursor-not-allowed active:scale-100' : 'border-green-600 text-slate-800 hover:text-white hover:bg-green-600 shadow-md active:scale-95 transition-all'}`}>TER</button>
                              </div>
                              {/* Table */}
                              <div className="overflow-x-auto shadow-lg rounded mt-6">
                                    <table className="table">
                                          <thead>
                                                <tr>
                                                      <th>Title</th>
                                                      <th>Description</th>
                                                      <th>Deadline</th>
                                                      <th>Submission</th>
                                                      <th>Action</th>
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {isLoading ? (<tr>
                                                      <td colSpan="5" className="text-center p-4">
                                                            <img src={userLoadingSpinner} alt="" className="w-10 mx-auto animate-spin" />
                                                      </td>
                                                </tr>)
                                                      : enrolledAssignment?.length > 0 ? (
                                                            enrolledAssignment.map((ass) =>
                                                                  <tr key={ass._id} className="hover:bg-gray-200">
                                                                        <td>{ass.title}</td>
                                                                        <td>{ass.description}</td>
                                                                        <td>{ass.deadline}</td>
                                                                        <td>{ass?.submission || 0}</td>
                                                                        <td>
                                                                              <button
                                                                                    onClick={() => handleSubmitAssignment(ass)}
                                                                                    className="px-4 py-2 rounded transition-all bg-green-600 text-white hover:bg-green-500 active:scale-95">
                                                                                    Submit
                                                                              </button>
                                                                        </td>
                                                                  </tr>
                                                            )
                                                      ) : (
                                                            <tr>
                                                                  <td colSpan="5" className="flex items-center justify-center text-center gap-4 p-4">
                                                                        <img src="" alt="" />
                                                                        <span className="text-red-500 font-medium">No assignment found.</span>
                                                                  </td>
                                                            </tr>
                                                      )}
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                        {/* Feedback Modal */}
                        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                              <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center bg-black/15 backdrop-blur p-4">
                                          <DialogPanel
                                                transition
                                                className="w-full max-w-md rounded-xl bg-white/90 text-slate-800 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                                          >
                                                <DialogTitle as="h3" className="text-base/7 font-medium">
                                                      Rate Your Class Experience
                                                </DialogTitle>
                                                <p className="mt-2 text-sm/6 text-slate-800/60">
                                                      Your feedback helps us improve and deliver the best learning experience for everyone!
                                                </p>
                                                <form onSubmit={handleFedback}>
                                                      <div className="mt-4">
                                                            <label className="w-fit block">Select Ratings ::</label>
                                                            <ReactStars
                                                                  count={5}
                                                                  onChange={(newRating) => setRatings(newRating)}
                                                                  size={28}
                                                                  activeColor="#ffd700"
                                                            />
                                                            {ratingError && <small className="text-red-600 font-bold pt-1 flex items-center gap-2"><TiWarningOutline />{ratingError}</small>}
                                                      </div>
                                                      <div className="mt-4">
                                                            <label htmlFor="message" className="mb-2 w-fit block">Description ::</label>
                                                            <textarea name="message" id="message"
                                                                  placeholder="Write your feedback..."
                                                                  className="w-full min-h-44 max-h-44 text-gray-500 p-2 rounded-md focus:outline-none border border-green-700/80 focus:outline-offset-2 focus:outline-green-500"></textarea>
                                                            {feedbackError && <small className="text-red-600 font-bold pt-1 flex items-center gap-2"><TiWarningOutline />{feedbackError}</small>}
                                                      </div>
                                                      <div className="mt-4">
                                                            <Button type="submit"
                                                                  className="inline-flex items-center gap-2 
                                                                  text-white rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                                            >
                                                                  Submit Feedback
                                                            </Button>
                                                      </div>
                                                </form>
                                          </DialogPanel>
                                    </div>
                              </div>
                        </Dialog>

                  </section>
                  <DashboardFooter />
            </>
      )
}

export default EnrollAssignment