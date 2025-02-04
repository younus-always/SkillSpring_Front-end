import { BsEnvelope } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FiInstagram, FiPhoneCall } from "react-icons/fi";
import { SlSocialFacebook, SlSocialLinkedin } from "react-icons/sl";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo/logo.png";

const DashboardFooter = () => {
      return (
            <footer>
                  <div className="bg-green-50 py-3">
                        <div className="w-11/12 md:w-10/12 mx-auto grid place-items-center">
                              <Link to='/' className="flex items-center gap-2">
                                    <img src={logoImg} alt="Logo" className="w-10" />
                                    <h2 className="text-2xl font-semibold">Skill<span>Spring</span></h2>
                              </Link>
                              <div>

                              </div>
                        </div>
                  </div>
                  <div className="bg-slate-800 text-slate-50">
                        <div className="w-11/12 md:w-10/12 mx-auto flex items-center justify-between flex-wrap gap-3 py-4">
                              <div className="flex items-center gap-4">
                                    <a href='https://www.facebook.com' target='blank' rel="noopener noreferrer"><SlSocialFacebook size={18} /></a>
                                    <a href='https://www.twitter.com' target='blank' rel="noopener noreferrer"><FaXTwitter size={18} /></a>
                                    <a href='https://www.instagram.com' target='blank' rel="noopener noreferrer"><FiInstagram size={18} /></a>
                                    <a href='https://www.linkedin.com' target='blank' rel="noopener noreferrer"><SlSocialLinkedin size={18} /></a>
                              </div>
                              <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Built with ❤️ by <Link to='/' className="text-green-500 font-semibold">SkillSpring</Link>. All Rights Reserved.</p>
                        </div>
                  </div>
            </footer>
      )
}

export default DashboardFooter