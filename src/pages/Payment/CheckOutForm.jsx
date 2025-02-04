import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useClasses from "../../hooks/useClasses";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ id }) => {
      const { user } = useAuth();
      const stripe = useStripe();
      const elements = useElements();
      const axiosSecure = useAxiosSecure();
      const navigate = useNavigate();
      const [errorMessage, setErrorMessage] = useState("");
      const [clientSecret, setClientSecret] = useState("");
      const [classes] = useClasses();
      const enrollClass = classes?.find(c => c._id === id);
      const { _id, name, image, title, price } = enrollClass || {};

      // post class price to server
      useEffect(() => {
            axiosSecure.post('/create-payment-intent', { price: price })
                  .then(res => {
                        console.log(res.data.clientSecret);
                        setClientSecret(res.data.clientSecret)
                  })
      }, [axiosSecure, price])

      // Payment submit function
      const handleSubmit = async (e) => {
            e.preventDefault();

            if (!stripe || !elements) {
                  return;
            };
            const card = elements.getElement(CardElement);
            if (card == null) {
                  return;
            };
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                  type: "card",
                  card
            });
            if (error) {
                  setErrorMessage(error.message);
                  console.log("payment error", error)
            } else {
                  setErrorMessage("");
                  console.log("payment method ", paymentMethod)
            };

            // Confirm payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                  payment_method: {
                        card: card,
                        billing_details: {
                              name: user.displayName,
                              email: user.email
                        }
                  }
            });

            if (confirmError) {
                  setErrorMessage(confirmError.message)
                  console.log("confirm error", confirmError)
            } else {
                  console.log("paymentIntent success", paymentIntent)
                  if (paymentIntent.status === "succeeded") {
                        const paymentInfo = {
                              transaction_id: paymentIntent.id,
                              class_id: _id,
                              name: user.displayName,
                              email: user.email,
                              teacher: name,
                              title: title,
                              image: image,
                              date: new Date() //use moment js
                        };
                        // save payment information to database
                        const { data } = await axiosSecure.post('/payments', paymentInfo);
                        if (data.insertedId) {
                              toast.success(`Payment successfull. Your transaction-id ${paymentIntent.id}`, { duration: 3000 });
                              navigate('/dashboard/student/my-enroll-class');
                        }
                        axiosSecure.patch(`/class-enroll/${_id}`)
                              .then(res => {
                                    console.log(res.data)
                                    if (res.data.modifiedCount) {
                                    }
                              })
                  }
            }
      };


      return (
            <section className="bg-payment_bg bg-no-repeat bg-cover bg-center h-[500px]">
                  <div className="bg-gradient-to-tr from-black/60 via-gray-600/90 via-black/80 to-slate-800 h-full">
                        <div className="py-12">
                              <div className="text-white py-8 text-center">
                                    <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl mb-2">Secure Payment Portal</h2>
                                    <p>Complete your payment safely and seamlessly to unlock access to your selected class.</p>
                              </div>
                              <form onSubmit={handleSubmit} className="bg-white shadow-xl p-6 max-w-md mx-auto rounded-md">
                                    <CardElement
                                          options={{
                                                style: {
                                                      base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                      },
                                                      invalid: {
                                                            color: '#9e2146',
                                                      },
                                                },
                                          }}
                                          className="placeholder:text-gray-600"
                                    />
                                    <button type="submit" disabled={!stripe || !clientSecret} className="bg-green-600 hover:bg-green-500 active:scale-95 transition-all font-medium py-1 px-3 rounded-md mt-3 text-white text-sm">
                                          Confirm Payment
                                    </button>
                                    {
                                          errorMessage && <p className="text-red-500 font-medium pt-2">{errorMessage}</p>
                                    }
                              </form>
                        </div >
                  </div>
            </section>
      )
}

export default CheckOutForm