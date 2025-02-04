import Lottie from "lottie-react";
import useTitle from "../../hooks/useTitle";
import login from "../../Lotties/login";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { TiWarningOutline } from "react-icons/ti";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import logoImg from "../../assets/logo/freelancer-2.png";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../components/shared/Loading";
import { TbFidgetSpinner } from "react-icons/tb";

const SingIn = () => {
      useTitle('Login Page');
      const { signIn, googleLogin, loading } = useAuth();
      const axiosPublic = useAxiosPublic();
      const [showPass, setShowPass] = useState(false);
      const navigate = useNavigate();
      const location = useLocation();
      const { register, handleSubmit, reset, formState: { errors }, } = useForm();

      // login user account
      const onSubmit = (data) => {
            signIn(data.email, data.password)
                  .then(res => {
                        reset()
                        toast.success(`Welcome, ${res.user.displayName}! You've successfully login.`)
                        setTimeout(() => {
                              navigate(location?.state ? location.state : '/')
                        }, 2000);
                  }).catch(err => toast.error('Invalid email or password. Please try again.'))
      };

      // login with google
      const handleGoogleLogin = () => {
            googleLogin()
                  .then(res => {
                        // save user to the database
                        const userDetail = {
                              name: res.user.displayName,
                              email: res.user.email,
                              image: res.user.photoURL
                        };
                        axiosPublic.post(`/users`, userDetail)
                              .then(res => {
                                    if (res.data.insertedId) {
                                          console.log({ message: "user detail stored" })
                                    }
                              })
                        // success message
                        toast.success(`Welcome, ${res.user.displayName}! You've successfully signed in with Google.`)
                        setTimeout(() => {
                              navigate(location?.state ? location.state : '/')
                        }, 2000);
                  })
      };

      return (
            <section className="w-11/12 md:w-10/12 mx-auto flex flex-col-reverse lg:items-center justify-center lg:flex-row pb-10 lg:py-8 xl:py-0">
                  <div className="flex flex-col justify-center flex-1 h-fit max-w-md mx-auto w-full px-5 sm:px-6 py-8 lg:px-8 rounded shadow-xl">
                        <div>
                              <img className="mx-auto h-10 w-auto" src={logoImg} alt="Brand logo" />
                              <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Login to your account</h2>
                        </div>

                        <div className="mt-5">
                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {/* email field */}
                                    <div>
                                          <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email*</label>
                                          <div className="mt-2">
                                                <input type="email" name="email" id="email" autoComplete="email"
                                                      {...register("email", { required: true })}
                                                      placeholder="Enter your email"
                                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                                                {/* Errors Message */}
                                                {errors.email?.type === 'required' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />email is required</small>}
                                          </div>
                                    </div>
                                    {/* password field */}
                                    <div>
                                          <div className="flex items-center justify-between">
                                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password*</label>
                                                <div className="text-sm flex items-center gap-1">
                                                      <input readOnly checked={showPass ? true : false} type="checkbox"
                                                            className="checkbox checkbox-success w-4 h-4 [--chkfg:white]" />
                                                      <button type="button" onClick={() => setShowPass(!showPass)} className="font-semibold text-green-600 hover:text-green-500">Show password</button>
                                                </div>
                                          </div>
                                          <div className="mt-2">
                                                <input type={`${showPass ? 'text' : 'password'}`} name="password" id="password" autoComplete="current-password"
                                                      {...register("password", { required: true, })}
                                                      placeholder="Enter your password"
                                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                                                {/* Errors Message */}
                                                {errors.password?.type === 'required' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />password is required</small>}
                                          </div>
                                    </div>
                                    {/* Sign in btn */}
                                    <div>
                                          <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                                {loading ? <span className="animate-spin"><TbFidgetSpinner size={22} /></span>: 'Sign in'}
                                          </button>
                                    </div>
                              </form>
                              <div className="divider">OR</div>
                              {/* Google login btn */}
                              <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-5 py-2 px-3 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-200"><FcGoogle size={20} /> <span className="text-sm font-semibold">Sign in with Google</span></button>
                              <p className="mt-2 text-center text-sm/6 text-gray-500">
                                    <span>Don&apos;t have an account? </span>
                                    <Link to='/register' className="font-semibold text-green-700 hover:text-green-600 hover:underline hover:underline-offset-1">Create account</Link>
                              </p>
                        </div>
                  </div>
                  <div className="flex-1">
                        <Lottie animationData={login}></Lottie>
                  </div>
            </section>
      )
}

export default SingIn