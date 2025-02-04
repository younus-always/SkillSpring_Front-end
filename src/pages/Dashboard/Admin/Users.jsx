import { useState } from "react";
import userLoadingSpinner from "../../../assets/spinner/loading.gif";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { BiSearchAlt } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useTitle from "../../../hooks/useTitle";
import user from '../../../assets/icons/user.png';
import SectionTitle from "../../../components/shared/SectionTitle";
import DashboardFooter from "../../../components/shared/DashboardFooter";

const Users = () => {
      useTitle("All user");
      const [searchQuery, setSearchQuery] = useState("");
      const axiosSecure = useAxiosSecure();

      // Fetch users from server using tanstack query
      const { data: users, isLoading, refetch } = useQuery({
            queryKey: ['users', searchQuery],
            queryFn: async () => {
                  const res = await axiosSecure.get(`/users?search=${searchQuery}`);
                  return res.data;
            }
      });

      // making a user admin
      const handleMakeAdmin = async (user) => {
            try {
                  const { data } = await axiosSecure.patch(`/users/make-admin/${user.email}`);
                  if (data.modifiedCount) {
                        refetch(); // refetch update content without reloading
                        // success message
                        Swal.fire({
                              position: "top-end",
                              icon: "success",
                              title: `${user.name} is an Admin Now`,
                              showConfirmButton: false,
                              timer: 1500
                        });
                  }
            } catch (error) {
                  console.error("Error making user admin:", error);
            }
      };

      return (
            <>
                  <section className="w-11/12 mx-auto pt-4 large:pt-0 pb-10 min-h-screen">
                        <SectionTitle title={"Manage All Users"} subTitle={"Search, View, and Assign Admin Roles with Ease"} />
                        <div className="grid grid-cols-1 sm:grid-cols-7 gap-3 sm:gap-0 items-center bg-gradient-to-br from-slate-900/80 via-slate-700/50 via-gray-500/80 to-slate-800/90 backdrop-blur-lg rounded p-5">
                              <h1 className="col-span-3 lg:col-span-4 md:text-lg lg:text-xl font-bold text-gray-200">Total Users: {users?.length}</h1>
                              {/* Search Input */}
                              <div className="col-span-4 lg:col-span-3 relative">
                                    <input type="text" id="search"
                                          placeholder="Search by name or email"
                                          value={searchQuery}
                                          onChange={(e) => { setSearchQuery(e.target.value) }}
                                          className="py-1.5 pl-12 px-3 placeholder:text-sm/6 placeholder:text-gray-200 text-sm border border-gray-300 rounded w-full focus:outline outline-1 focus:outline-offset-1 focus:outline-gray-300 shadow bg-transparent text-gray-200"
                                    />
                                    <label htmlFor="search" className="absolute top-0 left-0 bg-gray-300 rounded-l text-center py-1.5 px-2">
                                          <BiSearchAlt size={21} />
                                    </label>
                              </div>
                        </div>
                        {/* Table */}
                        <div className="overflow-x-auto shadow-lg rounded mt-6">
                              <table className="table">
                                    <thead>
                                          <tr>
                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {isLoading ? (<tr>
                                                <td colSpan="4" className="text-center p-4">
                                                      <img src={userLoadingSpinner} alt="" className="w-10 mx-auto animate-spin" />
                                                </td>
                                          </tr>) : users?.length > 0 ? (
                                                users.map((user) =>
                                                      <tr key={user._id} className="hover:bg-gray-200">
                                                            <td>
                                                                  <img
                                                                        src={user.image}
                                                                        alt="user photo"
                                                                        className="w-10 h-10 rounded-full object-cover"
                                                                  />
                                                            </td>
                                                            <td>{user.name}</td>
                                                            <td>{user.email}</td>
                                                            <td>
                                                                  <button
                                                                        onClick={() => handleMakeAdmin(user)}
                                                                        disabled={user.role === 'admin'}
                                                                        className={`px-4 py-2 rounded transition-all ${user.role
                                                                              ? "bg-transparent active:scale-100"
                                                                              : "bg-green-600 text-white hover:bg-green-500 active:scale-95"
                                                                              }`}
                                                                  >{user.role ? 'Admin' : 'Make Admin'}</button>
                                                            </td>
                                                      </tr>
                                                )
                                          ) : (
                                                <tr>
                                                      <td colSpan="4" className="flex items-center justify-center gap-4 p-4">
                                                            <img src={user} alt="" className="w-12 h-12" />
                                                            <span className="text-red-500 font-medium">No user found.</span>
                                                      </td>
                                                </tr>
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  </section>
                  <DashboardFooter />
            </>
      );
};

export default Users;
