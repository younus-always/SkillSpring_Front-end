import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../shared/SectionTitle";


const FeaturedClass = () => {
      const axiosSecure = useAxiosSecure();
      const navigate = useNavigate();
      // Load highest enrollment classes
      const { data: featuredClass } = useQuery({
            queryKey: ["featuredClass"],
            queryFn: async () => {
                  const { data } = await axiosSecure.get('/featuredClass');
                  return data;
            }
      });
      // Enroll Now navigate to details page for pay button
      const handleEnroll = (f) => navigate(`/class/${f._id}`);

      return (
            <section className=" w-10/12 mx-auto py-10">
                  <SectionTitle title={"Top Classes to Boost Your Skills"} subTitle={"Explore our most sought-after classes and find the perfect match to achieve your goals."} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
                        {/* card */}
                        {featuredClass?.map(f => <div key={f._id} className="card rounded-lg bg-base-100 max-w-md mx-auto shadow-xl group">
                              <figure className="h-64 mx-4 mt-5 sm:mx-5 rounded-md overflow-hidden">
                                    <img
                                          src={f.image}
                                          alt={`${f.title} 'photo'`}
                                          className="w-full h-full object-cover rounded-md overflow-hidden group-hover:scale-105 transition-all" />
                              </figure>
                              <div className="card-body p-4 sm:p-6">
                                    <div>
                                          <h2 className="card-title gap-6 mb-2">{f.title}</h2>
                                          <h4><strong>Name : </strong><span className="font-medium">{f.name}</span></h4>
                                          <h4><strong>Price : </strong><span className="font-medium">${f.price}</span></h4>
                                          <h4><strong>Total enroll : </strong><span className="font-medium">{f?.enroll || 0}</span></h4>
                                    </div>
                                    <p>{f.description?.length >= 60 ? `${f.description.slice(0, 60)}...` : f.description}</p>
                                    <div className="space-y-2">
                                          <button type="button"
                                                onClick={() => handleEnroll(f)}
                                                aria-label={`Enroll in ${f.title}`}
                                                className="block w-full text-center font-medium text-white bg-green-600 rounded-md py-2 px-3 hover:bg-green-500 active:scale-95 transition-all">
                                                Enroll Now
                                          </button>
                                    </div>
                              </div>
                        </div>)}
                  </div>
            </section>
      )
}

export default FeaturedClass