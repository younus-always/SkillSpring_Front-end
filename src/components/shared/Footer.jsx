import { BsEnvelope } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram, FiPhoneCall } from "react-icons/fi";
import { SlSocialFacebook, SlSocialLinkedin } from "react-icons/sl";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo/logo.png";

const Footer = () => {
      return (
            <footer>
                  <div className="bg-green-50 py-14">
                        <div className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                              <div className="w-11/12 mx-auto md:mx-0 space-y-4 md:space-y-5">
                                    <Link to='/' className="flex gap-2">
                                          <img src={logoImg} alt="Logo" className="w-12" />
                                          <h2 className="text-2xl font-semibold">Skill<span>Spring</span></h2>
                                    </Link>
                                    <div>
                                          <div className="space-y-2">
                                                <h4 className="text-xl font-semibold">Banani</h4>
                                                <p className="text-green-600">Dhaka, Bangladesh (BD).</p>
                                          </div>
                                          <div className="space-y-2 mt-4">
                                                <a
                                                      href='mailto:address@gmail.com'
                                                      className="flex items-center gap-3 hover:text-green-600 transition-all w-fit">
                                                      <BsEnvelope size={20} className="text-green-600" />address@gmail.com
                                                </a>
                                                <a
                                                      href="tel:+8801723456789"
                                                      className="flex items-center gap-3 hover:text-green-600 transition-all w-fit"
                                                >
                                                      <FiPhoneCall size={20} className="text-green-600" />
                                                      +880 1723-456789
                                                </a>

                                          </div>
                                          {/* Social icons */}
                                          <div className="flex items-center gap-4 mt-4">
                                                <a href='https://www.facebook.com' target='_blank' rel="noopener noreferrer">
                                                      <SlSocialFacebook size={20} /></a>
                                                <a href='https://www.twitter.com' target='blank' rel="noopener noreferrer">
                                                      <FaXTwitter size={20} /></a>
                                                <a href='https://www.instagram.com' target='_blank' rel="noopener noreferrer">
                                                      <FiInstagram size={20} /></a>
                                                <a href='https://www.linkedin.com' target='_blank' rel="noopener noreferrer">
                                                      <SlSocialLinkedin size={20} /></a>
                                          </div>
                                    </div>
                              </div>
                              <div className="w-11/12 mx-auto md:mx-0 space-y-4 md:space-y-5">
                                    <h3 className="text-2xl font-semibold">Category</h3>
                                    <ul className="space-y-2">
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">Graphic Design</li>
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">UI/UX Design</li>
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">Creative Writing</li>
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">Film & Video</li>
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">Business Analytics</li>
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">Marketing</li>
                                    </ul>
                              </div>
                              <div className="w-11/12 mx-auto md:mx-0 space-y-4 md:space-y-5">
                                    <h3 className="text-2xl font-semibold">Quick Links</h3>
                                    <ul className="space-y-2">
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">Privacy Policy</li>
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">Discussion</li>
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">Terms & Conditions</li>
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">Customer Support</li>
                                          <li className="hover:text-green-500 transition-all w-fit cursor-pointer">Course FAQ's</li>
                                    </ul>
                              </div>

                              <div className="w-11/12 mx-auto md:mx-0 space-y-4 md:space-y-5">
                                    <h3 className="text-2xl font-semibold">Subscribe</h3>
                                    <div className="flex flex-col space-y-3">
                                          <p>Lorem Ipsum has been them an industry printer took a galley make book.</p>
                                          <input type="email" placeholder="Email here" className="max-w-72 bg-white p-3 focus:outline-none rounded-md border shadow-sm" />
                                          <button type="button" className="py-2 px-4 w-fit rounded-md bg-green-600 text-slate-50 font-semibold text-sm/6 placeholder:text-sm hover:bg-green-500 active:scale-95 transition-all">Subscribe Now</button>
                                    </div>
                              </div>
                        </div>
                  </div>
                  {/* footer bottom */}
                  <div className="bg-slate-800 text-slate-50">
                        <div className="w-11/12 md:w-10/12 mx-auto flex items-center justify-between flex-wrap gap-3 py-5">
                              <ul className="flex items-center gap-2">
                                    <li><a className="hover:text-green-600 hover:cursor-pointer transition-all">Terms of Service</a></li>
                                    <span className="space-x-2">*</span>
                                    <li><a className="hover:text-green-600 hover:cursor-pointer transition-all">Privacy Policy</a></li>
                                    <span className="space-x-2">*</span>
                                    <li><a className="hover:text-green-600 hover:cursor-pointer transition-all">Security</a></li>
                              </ul>
                              <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Built with ❤️ by <Link to='/' className="text-green-500 font-semibold">SkillSpring</Link>. All Rights Reserved.</p>
                        </div>
                  </div>
            </footer>
      )
}

export default Footer