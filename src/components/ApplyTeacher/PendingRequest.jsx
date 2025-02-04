import Lottie from "lottie-react";
import pendingImg from "../../Lotties/pending";

const PendingRequest = () => {
      return (
            <section className="bg-white py-10">
                  <div className="w-11/12 md:w-10/12 mx-auto text-center space-y-6 px-2">
                        <div className="w-24 mx-auto">
                              <Lottie animationData={pendingImg} />
                        </div>
                        <h1 className="text-2xl font-bold text-green-600">
                              Your Application is Under Review
                        </h1>
                        <p className="text-gray-700">
                              Thank you for applying to become a teacher on SkillSpring! Your application is currently being reviewed by our team. We'll notify you via email once a decision has been made.
                        </p>

                        {/* Next Steps */}
                        <div className="text-gray-600 text-sm">
                              <p>
                                    While you wait, here are some things you can do:
                              </p>
                              <ul className="list-disc list-inside space-y-1 mt-2">
                                    <li>Prepare course materials or outlines.</li>
                                    <li>Explore our platform to familiarize yourself with its features.</li>
                                    <li>Check out the <span className="text-blue-600 hover:underline cursor-pointer">Teacher Guide</span> for tips on creating engaging courses.</li>
                              </ul>
                        </div>

                        {/* Contact */}
                        <p className="text-sm text-gray-500">
                              If you have any questions, feel free to <span className="text-blue-600 hover:underline cursor-pointer">contact us</span>.
                        </p>
                  </div>
            </section>
      );
};

export default PendingRequest