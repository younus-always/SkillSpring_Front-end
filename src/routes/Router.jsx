import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import SingIn from "../pages/Login/SingIn";
import SignUp from "../pages/Register/SignUp";
import AllClasses from "../pages/ClassesList/AllClasses";
import Error from "../pages/ErrorPage/Error";
import PrivateRoute from "./PrivateRoute";
import ApplyTeaching from "../pages/Educator/ApplyTeaching";
import DashboardLayout from "../Layout/DashboardLayout";
import MyEnrollClass from "../pages/Dashboard/Student/MyEnrollClass";
import Profile from "../pages/Shared/Profile";
import Users from "../pages/Dashboard/Admin/Users";
import TeacherRequest from "../pages/Dashboard/Admin/TeacherRequest";
import AllClassesList from "../pages/Dashboard/Admin/AllClassesList";
import MyClass from "../pages/Dashboard/Teacher/MyClass";
import AddClass from "../pages/Dashboard/Teacher/AddClass";
import ClassDetails from "../pages/Dashboard/Teacher/ClassDetails";
import ClassEnrollDetails from "../pages/ClassesList/ClassEnrollDetails";
import Payment from "../pages/Payment/Payment";
import EnrollAssignment from "../pages/Dashboard/Student/EnrollAssignment";
import AdminRoute from "./AdminRoute";
import TeacherRoute from "./TeacherRoute";

export const router = createBrowserRouter([
      {
            path: '/',
            errorElement: <Error />,
            element: <MainLayout />,
            children: [
                  {
                        path: '/',
                        element: <Home />
                  },
                  {
                        path: 'classlist',
                        element: <AllClasses />
                  },
                  {
                        path: 'class/:id',
                        element: <PrivateRoute><ClassEnrollDetails /></PrivateRoute>,
                        loader: ({ params }) => fetch(`https://skill-spring-server.vercel.app/classes/${params.id}`)
                  },
                  {
                        path: 'payment',
                        element: <PrivateRoute><Payment /></PrivateRoute>
                  },
                  {
                        path: 'apply-teaching',
                        element: <PrivateRoute><ApplyTeaching /></PrivateRoute>
                  },
                  {
                        path: 'login',
                        element: <SingIn />
                  },
                  {
                        path: 'register',
                        element: <SignUp />
                  }
            ]
      },

      // dashboard all routes
      {
            path: '/dashboard',
            element: <DashboardLayout />,
            errorElement: <Error />,
            children: [
                  // admin routes
                  {
                        path: 'admin',
                        children: [
                              {
                                    index: true,
                                    element: <PrivateRoute><AdminRoute>
                                          <Profile />
                                    </AdminRoute></PrivateRoute>
                              },
                              {
                                    path: 'all-users',
                                    element: <PrivateRoute><AdminRoute>
                                          <Users />
                                    </AdminRoute></PrivateRoute>
                              },
                              {
                                    path: 'teacher-request',
                                    element: <PrivateRoute><AdminRoute>
                                          <TeacherRequest />
                                    </AdminRoute></PrivateRoute>
                              },
                              {
                                    path: 'all-classList',
                                    element: <PrivateRoute><AdminRoute>
                                          <AllClassesList />
                                    </AdminRoute></PrivateRoute>
                              },
                        ]
                  },
                  // teacher routes
                  {
                        path: 'teacher',
                        children: [
                              {
                                    index: true,
                                    element: <PrivateRoute><TeacherRoute>
                                          <Profile />
                                    </TeacherRoute></PrivateRoute>
                              },
                              {
                                    path: 'my-class',
                                    element: <PrivateRoute><TeacherRoute>
                                          <MyClass />
                                    </TeacherRoute></PrivateRoute>
                              },
                              {
                                    path: 'my-class/:id',
                                    element: <PrivateRoute><TeacherRoute>
                                          <ClassDetails />
                                    </TeacherRoute></PrivateRoute>
                              },
                              {
                                    path: 'add-class',
                                    element: <PrivateRoute><TeacherRoute>
                                          <AddClass />
                                    </TeacherRoute></PrivateRoute>
                              }
                        ]
                  },
                  // student routes
                  {
                        path: 'student',
                        children: [
                              {
                                    index: true,
                                    element: <Profile />
                              },
                              {
                                    path: 'my-enroll-class',
                                    element: <MyEnrollClass />
                              },
                              {
                                    path: 'my-enroll-class/:id',
                                    element: <EnrollAssignment />
                              }
                        ]
                  },
            ]
      }
]);