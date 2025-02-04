import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
      baseURL: "https://skill-spring-server.vercel.app",
      withCredentials: true
});

const useAxiosSecure = () => {
      const { logOut } = useAuth();
      const navigate = useNavigate();

      useEffect(() => {
            axiosSecure.interceptors.response.use(response => {
                  return response;
            }, error => {
                  if (error.status === 401 || error.status === 403) {
                        logOut();
                        navigate("/login")
                  }
                  return Promise.reject(error)
            })
      }, [])
      return axiosSecure;
}

export default useAxiosSecure