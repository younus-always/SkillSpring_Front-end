import { Link, useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import registerImg from "../../Lotties/register";
import { TiWarningOutline } from "react-icons/ti";
import Swal from "sweetalert2";
import logoImg from "../../assets/logo/freelancer-2.png";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { TbFidgetSpinner } from "react-icons/tb";
// Image host to imgbb
const image_hosting_key = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
      useTitle('Register page');
      const { signUp, updateUserProfile, googleLogin, logOut,loading } = useAuth();
      const axiosPublic = useAxiosPublic();
      const [showPass, setShowPass] = useState(false);
      const [imageInfo, setImageInfo] = useState({});
      const navigate = useNavigate();
      const location = useLocation();
      const { register, handleSubmit, reset, formState: { errors }, } = useForm();

      // image file upload onChange to host imgbb
      const handleImageSet = async e => {
            const imageFile = { image: e.target.files[0] };
            if (imageFile) {
                  const { data } = await axiosPublic.post(image_hosting_url, imageFile, {
                        headers: { "Content-Type": "multipart/form-data" },
                  });
                  const imageRes = data.data;
                  console.log(data.data)
                  const imageInfo = {
                        photo: imageRes.display_url,
                        size: imageRes.size,
                        width: imageRes.width,
                        height: imageRes.height
                  };
                  setImageInfo(imageInfo);
            }
      };

      // create a new user
      const onSubmit = (data) => {
            signUp(data.email, data.password)
                  .then(() => {
                        // Profile updated!
                        updateUserProfile(data.name, imageInfo.photo)
                              .then(() => {
                                    // save user to the database at a once time
                                    const userDetail = {
                                          name: data.name,
                                          email: data.email,
                                          image: imageInfo.photo
                                    };
                                    axiosPublic.post('/users', userDetail)
                                          .then(res => {
                                                if (res.data.insertedId) {
                                                      console.log('user data stored')
                                                }
                                          });
                                    reset() // reset the form
                                    logOut() // logout the user and navigate login page
                                    // success message
                                    Swal.fire({
                                          position: "top-end",
                                          icon: "success",
                                          title: "Registration successfull. Please login to access your account!",
                                          showConfirmButton: false,
                                          timer: 1500
                                    });
                                    navigate('/login')
                              })
                  })
      };

      // continue with google
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
                              navigate(location.state ? location.state : '/')
                        }, 2000);
                  })
      };


      return (
            <section className="w-11/12 md:w-10/12 mx-auto flex flex-col-reverse lg:items-center justify-center lg:flex-row pb-10 lg:py-10">
                  <div className="flex flex-col justify-center flex-1 h-fit w-full max-w-md mx-auto px-5 sm:px-6 py-8 lg:px-8 rounded shadow-xl">
                        <div>
                              <img className="mx-auto h-10 w-auto" src={logoImg} alt="Brand logo" />
                              <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create a new account</h2>
                        </div>

                        <div className="mt-5">
                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {/* name field */}
                                    <div>
                                          <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Name*</label>
                                          <div className="mt-2">
                                                <input type="text" name="name" id="name"
                                                      {...register("name", { required: true })}
                                                      placeholder="Enter your name"
                                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                                                {/* Errors Message */}
                                                {errors.name?.type === 'required' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />name is required</small>}
                                          </div>
                                    </div>
                                    {/* photo field */}
                                    <div>
                                          <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">Photo*</label>
                                          <div className="mt-2">
                                                <input type="file" id="photo" accept="image/*"
                                                      {...register("photo", { required: true })}
                                                      onChange={handleImageSet}
                                                      className="file-input w-full h-10 rounded-md bg-white text-base text-gray-600 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                                                {/* Errors Message */}
                                                {errors.photo?.type === 'required' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />photo is required</small>}
                                          </div>
                                    </div>
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
                                                      <input readOnly checked={showPass ? true : false} type="checkbox" className="checkbox checkbox-success w-4 h-4 [--chkfg:white]" />
                                                      <button type="button" onClick={() => setShowPass(!showPass)} className="font-semibold text-green-600 hover:text-green-500">
                                                            Show password
                                                      </button>
                                                </div>
                                          </div>
                                          <div className="mt-2">
                                                <input type={`${showPass ? 'text' : 'password'}`} name="password" id="password" autoComplete="current-password"
                                                      {...register("password", {
                                                            required: true,
                                                            minLength: 6,
                                                            maxLength: 12,
                                                            pattern: /(?=.*[A-Z])(?=.*[!@#$ &*])(?=.*[0-9])(?=.*[a-z])/
                                                      })}
                                                      placeholder="Enter your password"
                                                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6" />
                                                {/* Errors Message */}
                                                {errors.password?.type === 'required' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />password is required</small>}
                                                {errors.password?.type === 'minLength' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />password must be at leas 6 characters.</small>}
                                                {errors.password?.type === 'maxLength' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline />password cannot exceed 12 characters.</small>}
                                                {errors.password?.type === 'pattern' && <small className="text-red-600 font-bold pt-1 flex items-center gap-2 pl-2"><TiWarningOutline size={18} />
                                                      create a password with an uppercase letter, a lowercase letter, a number, and a special character like !@#$&*.</small>}
                                          </div>
                                    </div>
                                    {/* Register btn */}
                                    <div>
                                          <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                                                {loading ? <span className="animate-spin"><TbFidgetSpinner size={22} /></span> : 'Sign Up'}</button>
                                    </div>
                              </form>
                              <div className="divider">OR</div>
                              {/* Google login btn */}
                              <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-5 py-2 px-3 rounded-md outline outline-1 -outline-offset-1 outline-gray-300 hover:bg-gray-200"><FcGoogle size={20} /> <span className="text-sm font-semibold">Continue with Google</span></button>
                              <p className="mt-2 text-center text-sm/6 text-gray-500">
                                    <span>Already have an account? </span>
                                    <Link to='/login' className="font-semibold text-green-700 hover:text-green-600 hover:underline hover:underline-offset-1">Login</Link>
                              </p>
                        </div>
                  </div>
                  <div className="flex-1">
                        <Lottie animationData={registerImg}></Lottie>
                  </div>
            </section>
      )
}

export default SignUp