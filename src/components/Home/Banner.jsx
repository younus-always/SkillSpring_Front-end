import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import banner1 from "../../assets/banner/banner-1.jpg";
import banner2 from "../../assets/banner/banner-2.jpg";
import banner3 from "../../assets/banner/banner-3.jpg";
import banner4 from "../../assets/banner/banner-4.jpg";
import { Link } from 'react-router-dom';

const Banner = () => {
      const progressCircle = useRef(null);
      const progressContent = useRef(null);
      const onAutoplayTimeLeft = (s, time, progress) => {
            progressCircle.current.style.setProperty('--progress', 1 - progress);
            progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
      };
      return (
            <div className='lg:w-11/12 mx-auto'>
                  <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                              delay: 2500,
                              disableOnInteraction: false,
                        }}
                        pagination={{
                              clickable: true,
                              dynamicBullets: true,
                        }}
                        modules={[Autoplay]}
                        onAutoplayTimeLeft={onAutoplayTimeLeft}
                        className='max-h-[630px] w-full'
                  >
                        <SwiperSlide>
                              <div>
                                    <div className='h-full flex items-center'>
                                          <div className='relative h-full w-full'>
                                                <img src={banner1} alt="" />
                                                <div className='absolute top-0 left-0 w-full h-full bg-black/60'>
                                                      <div className='text-white max-w-xl mx-auto space-y-4 mt-40'>
                                                            <h2 className='text-2xl md:text-3xl large:text-4xl lg:text-5xl font-semibold'>Discover the Skills to Transform Your Future</h2>
                                                            <p className='text-emerald-50 font-normal text-lg'>Explore courses designed by industry experts and take the next step in your learning journey.</p>
                                                            <Link to="/classlist" className='block w-fit mx-auto py-1.5 px-3 rounded-md border-2 border-green-500 hover:bg-green-500 active:scale-95 transition-all text-base font-medium'>Start Learning Today</Link>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </SwiperSlide>
                        <SwiperSlide className='h-full w-full'>
                              <div className='bg-red-500 h-full'>
                                    <div className='h-full flex items-center bg-green-300'>
                                          <div className='relative h-full w-full bg-yellow-300'>
                                                <img src={banner2} alt="" className='h-full w-full bg-red-500' />
                                                <div className='absolute top-0 left-0 w-full h-full bg-black/60'>
                                                      <div className='text-white max-w-xl mx-auto space-y-4 mt-40'>
                                                            <h2 className='text-2xl md:text-3xl large:text-4xl lg:text-5xl font-semibold'>Your Learning, Your Schedule</h2>
                                                            <p className='text-emerald-50 font-normal text-lg'>Access courses on any device, at your own pace. Flexibility meets knowledge.</p>
                                                            <Link to="/classlist" className='block w-fit mx-auto py-1.5 px-3 rounded-md border-2 border-green-500 hover:bg-green-500 active:scale-95 transition-all text-base font-medium'>Browse Courses</Link>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </SwiperSlide>
                        <SwiperSlide>
                              <div>
                                    <div className='h-full flex items-center'>
                                          <div className='relative h-full w-full'>
                                                <img src={banner3} alt="" />
                                                <div className='absolute top-0 left-0 w-full h-full bg-black/60'>
                                                      <div className='text-white max-w-xl mx-auto space-y-4 mt-40'>
                                                            <h2 className='text-2xl md:text-3xl large:text-4xl lg:text-5xl font-semibold'>Learn From the Best</h2>
                                                            <p className='text-emerald-50 font-normal text-lg'>Our instructors bring practical experience and deep expertise to every lesson.</p>
                                                            <button className='block w-fit mx-auto py-1.5 px-3 rounded-md border-2 border-green-500 hover:bg-green-500 active:scale-95 transition-all text-base font-medium'>Meet Our Instructors</button>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </SwiperSlide>
                        <SwiperSlide>
                              <div>
                                    <div className='h-full flex items-center'>
                                          <div className='relative h-full w-full'>
                                                <img src={banner4} alt="" />
                                                <div className='absolute top-0 left-0 w-full h-full bg-black/60'>
                                                      <div className='text-white max-w-xl mx-auto space-y-4 mt-40'>
                                                            <h2 className='text-2xl md:text-3xl large:text-4xl lg:text-5xl font-semibold'>Upskill Without Breaking the Bank</h2>
                                                            <p className='text-emerald-50 font-normal text-lg'>Gain valuable knowledge with budget-friendly courses designed to fit your needs.</p>
                                                            <Link to="/classlist" className='block w-fit mx-auto py-1.5 px-3 rounded-md border-2 border-transparent hover:border-green-500 bg-green-500 hover:bg-transparent active:scale-95 transition-all text-base font-medium'>View Affordable Courses</Link>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </SwiperSlide>

                        <div className="autoplay-progress" slot="container-end">
                              <svg viewBox="0 0 48 48" ref={progressCircle}>
                                    <circle cx="24" cy="24" r="20"></circle>
                              </svg>
                              <span ref={progressContent}></span>
                        </div>
                  </Swiper>
            </div>
      )
}

export default Banner