import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import ErrorPage from "../pages/Dashboard/Common/ErrorPage";
import HomePage from "../pages/Dashboard/Common/HomePage";
import AddScholarship from "../pages/Dashboard/Moderator/AddScholarship";
import AllScholarship from "../pages/Dashboard/Common/AllScholarship";

const router = createBrowserRouter([
    // home routes
    {
        path: "/",
        element: <MainLayout></MainLayout>,
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children: [
            {
                path: '/dashboard',
                element: <HomePage></HomePage>,
            },
            {
                path: '/dashboard/add-scholarship',
                element: <AddScholarship></AddScholarship>,
            }
        ]
    },
    {
        path: '/all-scholarship',
        element: <AllScholarship></AllScholarship>
    },
    {
        path: '*',
        element: <ErrorPage></ErrorPage>,
    }
]);

export default router;