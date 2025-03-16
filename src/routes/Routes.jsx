import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const router = createBrowserRouter([
    // home routes
    {
        path: "/",
        element: <MainLayout></MainLayout>,
    },
]);

export default router;