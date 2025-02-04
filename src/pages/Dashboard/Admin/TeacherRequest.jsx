import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useTeachers from "../../../hooks/useTeachers";
import teacherLodingSpinner from "../../../assets/spinner/user-loading.gif";
import useTitle from "../../../hooks/useTitle";
import teacher from "../../../assets/icons/teacher.gif";
import SectionTitle from "../../../components/shared/SectionTitle";
import DashboardFooter from "../../../components/shared/DashboardFooter";

const TeacherRequest = () => {
  useTitle('All requested teacher');
  const axiosSecure = useAxiosSecure();
  const [teachers, isLoading, refetch] = useTeachers();

  // accept teacher request 
  const handleApprovedRequest = async (teacher) => {
    const res = await axiosSecure.patch(`/teachers/${teacher.email}`, { status: 'accepted', role: 'teacher' });
    if (res.data.modifiedCount) {
      refetch(); // refetch content update without reload
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Congratulations, ${teacher.name}! You are now officially a teacher!`,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  // reject teacher request
  const handleRejectRequest = (teacher) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You wan't to reject ${teacher.name} request!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, Don't Reject!",
      confirmButtonText: "Yes, Reject!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/teachers/${teacher.email}`, { status: 'rejected' });
        if (res.data.modifiedCount) {
          refetch(); // refetch content update without reload
          Swal.fire({
            title: "Rejected!",
            text: `${teacher.name} request has been rejected.`,
            icon: "success"
          });
        }
      }
    });
  }

  return (
    <>
      <section className="w-11/12 md:w-10/12 mx-auto pt-0 large:pt-4 pb-10 min-h-screen">
        <SectionTitle title={"Teacher Requests Management"} subTitle={"Evaluate and Manage Teacher Requests with Approve or Reject Actions"}/>
        <div>
          <h1 className="text-lg lg:text-2xl font-bold mb-4">Total Teacher Request: {teachers?.length}</h1>
          {/* Table */}
          <div className="overflow-x-auto shadow-lg rounded mt-6">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="text-center p-4">
                      <img src={teacherLodingSpinner} alt="" className="w-10 mx-auto animate-spin" />
                    </td>
                  </tr>
                ) : teachers.length > 0 ? (
                  teachers.map(teacher =>
                    <tr key={teacher._id} className="hover:bg-gray-200">
                      <td>
                        <img
                          src={teacher.photo}
                          alt="photo"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td>{teacher.name}</td>
                      <td>{teacher.title}</td>
                      <td>{teacher.category}</td>
                      <td>{teacher.experience}</td>
                      <td>{teacher.status}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          {/* approved btn */}
                          <button type="button"
                            onClick={() => handleApprovedRequest(teacher)}
                            disabled={teacher.status === 'accepted' || teacher.status === 'rejected'}
                            className={`px-4 py-2 rounded transition-all ${teacher.status === 'accepted' || teacher.status === 'rejected'
                              ? 'cursor-not-allowed bg-gray-400 text-white active:scale-100'
                              : "bg-green-600 text-white hover:bg-green-500 active:scale-95 "
                              }`}
                          >Approved</button>
                          {/* reject btn */}
                          <button type="button"
                            onClick={() => handleRejectRequest(teacher)}
                            disabled={teacher.status === 'rejected'}
                            className={`px-3 py-2 rounded text-white transition-all ${teacher.status === 'rejected'
                              ? 'cursor-not-allowed bg-gray-400 active:scale-100'
                              : 'bg-red-600 hover:bg-red-500 active:scale-95'}`}>Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))
                  : (
                    <tr>
                      <td colSpan="4" className="flex items-center justify-center gap-4 p-4">
                        <img src={teacher} alt="" className="w-12 h-12" />
                        <span className="text-red-500 font-medium">No teacher found.</span>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </section >
      <DashboardFooter/>
    </>
  )
}

export default TeacherRequest