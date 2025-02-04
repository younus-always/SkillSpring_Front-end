import Lottie from "lottie-react";
import rejectedImg from "../../Lotties/rejected";

const RejectedRequest = ({ handleRequestAgain }) => {

      return (
            <section className="bg-red-100 py-10">
                  <div className="w-11/12 md:w-10/12 mx-auto text-center">
                        <div className="w-24 mx-auto">
                              <Lottie animationData={rejectedImg} />
                        </div>
                        <h2 className="text-xl font-bold">Your Application Has Been Rejected</h2>
                        <p className="text-gray-700 mt-2">
                              Unfortunately, your application to become a teacher has been rejected. Please review your application and try again later.
                        </p>
                        <div className="mt-4">
                              <button type="button"
                                    onClick={handleRequestAgain}
                                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500"
                              >
                                    Request Again
                              </button>
                        </div>
                        <div className="mt-2">
                              <button className="bg-slate-700 text-white px-6 py-2 rounded hover:bg-slate-600"
                              >
                                    Contact Support
                              </button>
                        </div>
                  </div>
            </section>
      );
}

export default RejectedRequest