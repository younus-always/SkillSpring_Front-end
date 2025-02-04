import Lottie from "lottie-react";
import notFoundImg from "../../Lotties/notFound";
import { Link, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";

const Error = () => {
      useTitle('Page not found');
      const navigate = useNavigate();

      return (
            <div className="h-screen w-full flex items-center justify-center relative">
                  <Lottie animationData={notFoundImg} className="max-w-3xl mx-auto" />
                  <div className="absolute top-3/4 left-1.5/2 flex items-center gap-4">
                        <Link to='/' className="bg-[rgb(0,193,162)] text-slate-800 font-semibold py-2 px-4 rounded-md hover:scale-95 transition-all text-sm">Back to Home</Link>
                        <button onClick={() => navigate(-1)} className="bg-[rgb(0,193,162)] text-slate-800 font-semibold py-2 px-4 rounded-md hover:scale-95 transition-all text-sm">Go Back</button>
                  </div>
            </div>
      )
}

export default Error