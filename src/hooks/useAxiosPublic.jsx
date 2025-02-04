import axios from "axios";

const axiosPublic = axios.create({
      baseURL: "https://skill-spring-server.vercel.app"
});

const useAxiosPublic = () => {
      return axiosPublic
}

export default useAxiosPublic