import { useNavigate, useParams } from "react-router-dom"
import useTitle from "../../hooks/useTitle";
import useClasses from "../../hooks/useClasses";
import DashboardFooter from "../../components/shared/DashboardFooter";
import usePayments from "../../hooks/usePayments";
import useAuth from "../../hooks/useAuth";

const ClassEnrollDetails = () => {
      useTitle("Enroll class details");
      const { user } = useAuth();
      const { id } = useParams();
      const navigate = useNavigate();
      const [classes] = useClasses();
      const [payments] = usePayments();
      const enrollClass = classes?.find(c => c._id === id);
      const { _id, name, email, title, image, price, description, enroll } = enrollClass || {};
      const isPayment = payments?.find(pay => pay.class_id === _id && pay.email === user.email);

      const handleNavigate = () => {
            if (isPayment) return;
            navigate('/payment', { state: { id: _id } });
      };


      return (
            <>
                  <section className="w-11/12 mx-auto py-10">
                        <div className="max-w-screen-lg mx-auto h-96 bg-white shadow-md border rounded-md grid md:grid-cols-2 place-items-center gap-3">
                              <div className="flex-1 h-full p-5 overflow-hidden">
                                    <img src={image} alt="" className="rounded-md w-full h-full" />
                              </div>
                              <div className="flex-1 h-full p-5 flex flex-col justify-between">
                                    <div>
                                          <p><strong>Title : </strong><span>{title}</span></p>
                                          <p><strong>Teacher : </strong><span>{name}</span></p>
                                          <p><strong>Price : </strong><span>${price}</span></p>
                                          <p><strong>Total Enroll : </strong><span>{enroll || 0}</span></p>
                                          <p><strong>Contact Email : </strong><span>{email}</span></p>
                                    </div>
                                    <p><strong>Description : </strong><span className="block">{description}</span></p>
                                    <button onClick={handleNavigate}
                                          className={`py-1.5 px-5 font-medium rounded-md text-white ${isPayment ? 'bg-gray-400 active:scale-100 cursor-not-allowed' : 'bg-green-500 active:scale-95 hover:bg-green-600/90 focus:ring-1 focus:ring-green-500 transition-all'}`}>
                                          Pay Now
                                    </button>
                              </div>
                        </div>
                  </section >
            </>
      )
}

export default ClassEnrollDetails