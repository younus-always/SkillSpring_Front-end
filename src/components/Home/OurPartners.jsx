import SectionTitle from "../shared/SectionTitle";
import sololearn from "../../assets/images/sololearn.jpeg";
import coursera from "../../assets/images/coursera.png";
import w3School from "../../assets/images/w3-school.png";
import udemy from "../../assets/images/udemy.png";
import codeAwares from "../../assets/images/codewares.jpeg";
import freeCodeCamp from "../../assets/images/freecodcamp.png";
import skillShare from "../../assets/images/skillShare.png";
import khanAcademy from "../../assets/images/khan-academy.png";
import Slider from "react-infinite-logo-slider";

const OurPartners = () => {
      return (
            <section className="w-10/12 mx-auto py-10 ">
                  <SectionTitle title={"Our Trusted Partners"} subTitle={"Collaborating for Success and Innovation. We are proud to work with industry leaders and innovators to bring the best to our users."} />
                        <Slider
                              duration={16}
                              pauseOnHover={false}
                        >
                              <Slider.Slide>
                                    <img src={coursera} alt="" className="w-20 md:w-24" />
                              </Slider.Slide>
                              <Slider.Slide>
                                    <img src={skillShare} alt="" className="w-20 md:w-24" />
                              </Slider.Slide>
                              <Slider.Slide>
                                    <img src={w3School} alt="" className="w-20 md:w-24" />
                              </Slider.Slide>
                              <Slider.Slide>
                                    <img src={freeCodeCamp} alt="" className="w-20 md:w-24" />
                              </Slider.Slide>
                              <Slider.Slide>
                                    <img src={khanAcademy} alt="" className="w-20 md:w-24" />
                              </Slider.Slide>
                              <Slider.Slide>
                                    <img src={codeAwares} alt="" className="w-20 md:w-24" />
                              </Slider.Slide>
                              <Slider.Slide>
                                    <img src={sololearn} alt="" className="w-20 md:w-24" />
                              </Slider.Slide>
                              <Slider.Slide>
                                    <img src={udemy} alt="" className="w-20 md:w-24" />
                              </Slider.Slide>
                        </Slider>
            </section >
      )
}

export default OurPartners