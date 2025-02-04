import { useNavigate } from "react-router-dom";
import Loading from "../../components/shared/Loading";
import useTitle from "../../hooks/useTitle";
import findClass from "../../assets/icons/find-a-class.png";
import { IoClose } from "react-icons/io5";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import searchSpinner from "../../assets/spinner/loading.gif";
import SectionTitle from "../../components/shared/SectionTitle";

const AllClasses = () => {
      useTitle('All class list');
      const navigate = useNavigate();
      const axiosPublic = useAxiosPublic();
      const [searchText, setSearchText] = useState("");

      // Fetch users from server using tanstack query
      const { data: acceptedClasses, isLoading: searchLoading, refetch } = useQuery({
            queryKey: ['classData', searchText],
            queryFn: async () => {
                  const res = await axiosPublic.get(`/classes?search=${searchText}`);
                  return res.data?.filter(d => d?.status === "accepted");
            }
      });
      // Enroll Now navigate to details page for pay button
      const handleEnroll = (c) => navigate(`/class/${c._id}`);

      return (
            <section className="w-11/12 xl:w-10/12 mx-auto pt-5 pb-10">
                  <SectionTitle title="Explore All Classes" subTitle="Discover a wide range of courses and find the perfect one to boost your skills and knowledge. Enroll today and start learning!" />
                  {/* Search input */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-0 items-end">
                        {/* input */}
                        <div className="sm:col-span-3 md:col-span-4 lg:col-span-4 grid grid-cols-6 gap-3 lg:gap-0">
                              <div className="relative col-span-5">
                                    <div className="flex items-center gap-2 mb-2">
                                          <label htmlFor="search" className="block w-fit font-medium text-gray-600">Find Your Perfect Class :</label>
                                          <p className="font-medium">{acceptedClasses?.length}</p>
                                    </div>
                                    <input type="text" id="search" placeholder="Type a class title or teacher's name"
                                          onChange={(e) => setSearchText(e.target.value)}
                                          value={searchText}
                                          className="w-full py-1.5 px-3 pr-12 rounded-md border-2 border-gray-300 outline-none focus:border-green-400 overflow-hidden placeholder:text-sm text-gray-700" />
                                    {/* reset input value btn */}
                                    <button type="button" onClick={() => setSearchText("")}
                                          className="absolute right-[1.5px] mt-[1.5px] bg-gray-200 rounded-md py-2 px-3 transition outline-none group">
                                          <IoClose className="text-xl group-hover:scale-110 transition-all" />
                                    </button>
                              </div>
                              <div className="col-span-1 flex items-end justify-center">
                                    {searchLoading && <img src={searchSpinner} alt="" />}
                              </div>
                        </div>
                  </div>

                  {acceptedClasses?.length > 0
                        // card container div
                        ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
                              {/* card */}
                              {acceptedClasses?.map(c => <div key={c._id} className="card rounded-lg bg-base-100 max-w-md mx-auto shadow-xl group">
                                    <figure className="h-64 mx-4 mt-5 sm:mx-5 rounded-md overflow-hidden">
                                          <img
                                                src={c.image}
                                                alt={`${c.title} 'photo'`}
                                                className="w-full h-full object-cover rounded-md overflow-hidden group-hover:scale-105 transition-all" />
                                    </figure>
                                    <div className="card-body p-4 sm:p-6">
                                          <div>
                                                <h2 className="card-title gap-6 mb-2">{c.title}</h2>
                                                <h4><strong>Name : </strong><span className="font-medium">{c.name}</span></h4>
                                                <h4><strong>Price : </strong><span className="font-medium">${c.price}</span></h4>
                                                <h4><strong>Total enroll : </strong><span className="font-medium">{c?.enroll || 0}</span></h4>
                                          </div>
                                          <p>{c.description?.length >= 60 ? `${c.description.slice(0, 60)}...` : c.description}</p>
                                          <div className="space-y-2">
                                                <button type="button"
                                                      onClick={() => handleEnroll(c)}
                                                      aria-label={`Enroll in ${c.title}`}
                                                      className="block w-full text-center font-medium text-white bg-green-600 rounded-md py-2 px-3 hover:bg-green-500 active:scale-95 transition-all">
                                                      Enroll Now
                                                </button>
                                          </div>
                                    </div>
                              </div>)}
                        </div>)
                        : (<div className="flex items-center justify-center gap-4 pt-6">
                              <img src={findClass} alt="" className="w-16" />
                              <p className="text-red-500 text-lg font-semibold">No class found</p>
                        </div>)
                  }
            </section >
      )
}

export default AllClasses