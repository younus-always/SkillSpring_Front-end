import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import logoImg from "../../assets/logo/logo.png";
import { RiMenu2Fill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { useEffect } from "react";
import useAdmin from "../../hooks/useAdmin";
import useTeacher from "../../hooks/useTeacher";

const Navber = () => {
      const { user, logOut } = useAuth();
      const [isOpenProfile, setIsOpenProfile] = useState(false);
      const [isOpenMenu, setIsOpenMenu] = useState(false);
      const { isAdmin } = useAdmin();
      const { isTeacher } = useTeacher();

      useEffect(() => {
            const hanldResize = () => {
                  if (window.innerWidth >= 768) {
                        return setIsOpenMenu(false); // Automatically close menu on 'md' breakpoint
                  }
            };
            // Add event listener
            window.addEventListener('resize', hanldResize);
            // Cleanup event listener or component unmount
            return () => window.removeEventListener('resize', hanldResize);
      }, [])

      const menuList = <>
            <li className="font-semibold hover:text-green-500 transition-all"><NavLink to='/'>Home</NavLink></li>
            <li className="font-semibold hover:text-green-500 transition-all"><NavLink to='/classlist'>All Class</NavLink></li>
            <li className="font-semibold hover:text-green-500 transition-all"><NavLink to='/apply-teaching'>Teach on SkillSpring</NavLink></li>
      </>

      const mobileMenuList = <>
            <li><NavLink to='/' className="font-semibold text-green-600 hover:text-slate-50 rounded-md py-2 hover:bg-green-600 border border-green-600 hover:border-transparent active:scale-95 transition-all block">Home</NavLink></li>
            <li><NavLink to='/classlist' className="font-semibold text-green-600 hover:text-slate-50 rounded-md py-2 hover:bg-green-600 border border-green-600 hover:border-transparent active:scale-95 transition-all block">All Class</NavLink></li>
            <li><NavLink to='/apply-teaching' className="font-semibold text-green-600 hover:text-slate-50 rounded-md py-2 hover:bg-green-600 border border-green-600 hover:border-transparent active:scale-95 transition-all block">Teach on SkillSpring</NavLink></li>
      </>

      return (
            <header className="bg-slate-700 sticky top-0 z-40">
                  <nav className="w-11/12 md:w-10/12 mx-auto flex items-center justify-between text-slate-50 py-5">
                        {/* Logo and Name */}
                        <Link to='/' className="flex items-center gap-2">

                              <img src={logoImg} alt="Logo" className="w-10" />
                              <h2 className="text-2xl font-bold">Skill<span>Spring</span></h2>
                        </Link>
                        <div className="flex items-center gap-10">
                              <ul className="hidden md:flex items-center gap-4">
                                    {menuList}
                              </ul>
                              {/* profile icon or login button */}
                              <div className="flex items-center gap-4">
                                    {user ? <button onClick={() => setIsOpenProfile(!isOpenProfile)} className="w-10 h-10 rounded-full overflow-hidden ring-2 active:scale-95 transition-all">
                                          <img src={user.photoURL} className="rounded-full w-full h-full object-cover" alt="profile picture" />
                                    </button>
                                          : <Link to='/login' className="text-sm font-semibold py-2 px-5 rounded-md bg-green-600 hover:bg-green-500 active:scale-95 transition-all">Login</Link>
                                    }
                                    {/* mobile toggle menu icon */}
                                    <button type="button" onClick={() => setIsOpenMenu(() => !isOpenMenu)}
                                          className={`md:hidden flex items-center justify-center bg-green-600 rounded-full w-10 h-10 ring-2 ring-green-600 hover:bg-green-500 active:scale-95 transition-all`}>
                                          {isOpenMenu ? <CgClose size={22} /> : <RiMenu2Fill size={22} />}</button>
                              </div>
                        </div>
                  </nav>
                  {/* Profile modal */}
                  {isOpenProfile && <div onClick={() => setIsOpenProfile(!isOpenProfile)} className="w-full h-svh absolute bg-slate-800/10 backdrop-blur-sm">
                        <div className="absolute right-4 w-80 mx-auto rounded-md bg-gray-400 p-4"
                        >
                              <h3 className="text-base font-medium text-white">
                                    {user.displayName}
                              </h3>
                              <p className="mt-1 text-sm text-white">
                                    {user.email}
                              </p>
                              <div className="mt-4 w-full flex flex-col space-y-2">
                                    <NavLink to={isAdmin ? '/dashboard/admin' : isTeacher ? '/dashboard/teacher' : '/dashboard/student'} className="font-semibold text-center py-1.5 px-3 rounded-md w-full bg-slate-600 text-slate-50 hover:bg-slate-700 active:scale-95 transition-all">Dashboard</NavLink>
                                    {/* log out button */}
                                    <button type="button" onClick={() => logOut()} className="rounded-md bg-slate-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 hover:bg-slate-600 active:scale-95 transition-all"
                                    >Log out</button>
                              </div>
                        </div>
                  </div>}
                  {/* mobile menu */}
                  {
                        isOpenMenu && <div onClick={() => setIsOpenMenu(false)} className="w-full h-screen absolute bg-slate-800/20 backdrop-blur-sm">
                              <ul className="absolute left-4 space-y-2 bg-white text-center shadow-md rounded-md p-4 w-80">
                                    {mobileMenuList}
                              </ul>
                        </div>
                  }
            </header >
      )
}

export default Navber