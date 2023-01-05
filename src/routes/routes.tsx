import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";


import HomeIndex from "../pages/Home/Index";




function RouteView() {
    const routes = createBrowserRouter([
        {
            element: <HomeIndex />,
            path: "/"
        },
        // {
        //     element: <DashboardLayout />,
        //     path: "/Admin",
        //     children: [
        //         // { element: <Navigate to="/Admin" />, index: true },
        //         { path: 'app', element: <DashboardAppPage /> },
        //         { path: 'user', element: <UserPage /> },
        //         { path: 'products', element: <ProductsPage /> },
        //         { path: 'blog', element: <BlogPage /> },
        //     ],
        // }
    ]);

    return (
        <GoogleOAuthProvider clientId="325023130727-09031jf2g6p959lf47srnb2kgserk6an.apps.googleusercontent.com">
            <RouterProvider router={routes} />
        </GoogleOAuthProvider>
    )
} 

export default RouteView;