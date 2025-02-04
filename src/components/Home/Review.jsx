import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../shared/SectionTitle";
import ratingImg from "../../assets/icons/rating.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Review = () => {
      const axiosSecure = useAxiosSecure();

      // Reviews data load from server by Tanstack Query
      const { data: reviews } = useQuery({
            queryKey: ["reviews"],
            queryFn: async () => {
                  const { data } = await axiosSecure.get('/reviews');
                  return data;
            }
      });

      const renderStar = (rating) => {
            let ratingCount = [];
            for (let i = 1; i <= 5; i++) {
                  if (i <= rating) {
                        ratingCount.push(<img src={ratingImg} alt="" className="" />)
                  }
            };
            return ratingCount;
      };


      return (
            <section className="w-11/12 mx-auto py-8">
                  <SectionTitle title={"What Our Users Say"} subTitle={"Your feedback drives our growth! See what our users love about their experience on our platform."} />

                  <div className="lg:w-10/12 mx-auto">
                        <Swiper
                              spaceBetween={30}
                              centeredSlides={true}
                              autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                              }}
                              pagination={{
                                    clickable: true,
                                    dynamicBullets: true,
                              }}
                              navigation={true}
                              modules={[Autoplay, Pagination, Navigation]}>
                              {
                                    reviews?.map(review => <SwiperSlide key={review._id}>
                                          <div className="min-h-60 max-w-xl mx-auto p-5 shadow-green-300/75 shadow-xl rounded-lg my-8 flex flex-col justify-between relative">
                                                <div className="absolute top-0 left-[30%] w-8 h-8 ml-12 flex items-center gap-2">
                                                      {
                                                            renderStar(review.rating)
                                                      }
                                                </div>
                                                <p className="text-center px-3 mt-8">{review.message?.length >= 150 ? `${review.message.slice(0, 150)}...` : review.message}</p>
                                                <div className="flex items-center justify-center gap-4 mt-2">
                                                      <div className="w-16 h-16 overflow-hidden rounded-full ring-2">
                                                            <img src={review.image} alt="" className="object-cover overflow-hidden rounded-full" />
                                                      </div>
                                                      <div className="text-start">
                                                            <h3 className="font-medium">{review.name}</h3>
                                                            <p className="text-sm"><span className="text-sm font-medium">Class :</span> {review.class_title}</p>
                                                      </div>
                                                </div>
                                          </div>
                                    </SwiperSlide>)
                              }
                        </Swiper>
                  </div>
            </section>
      )
}

export default Review