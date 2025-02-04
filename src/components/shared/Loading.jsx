import Lottie from "lottie-react";
import loaderImg from "../../Lotties/loader";

const Loading = () => {
      return (
            <div className="absolute top-0 left-0 w-full h-screen bg-white">
                  <Lottie animationData={loaderImg} className="w-52 mx-auto h-screen" />
            </div>
      )
}

export default Loading