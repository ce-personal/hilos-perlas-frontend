import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";


import HomeIndex from "../pages/Home/Index";




function RouteView() {
    const routes = createBrowserRouter([
        {
            element: <HomeIndex />,
            path: "/"
        }
    ]);

    return (
        <GoogleOAuthProvider clientId="325023130727-09031jf2g6p959lf47srnb2kgserk6an.apps.googleusercontent.com">
            <RouterProvider router={routes} />
        </GoogleOAuthProvider>
    )
} 

export default RouteView;




// import { Navigate, useRoutes } from 'react-router-dom';
// // layouts
// import DashboardLayout from '../pages/Admin/layouts/dashboard';
// import SimpleLayout from '../pages/Admin/layouts/simple';
// //
// import BlogPage from '../pages/Admin/pages/BlogPage';
// import UserPage from '../pages/Admin/pages/UserPage';
// import LoginPage from '../pages/Admin/pages/LoginPage';
// import Page404 from '../pages/Admin/pages/Page404';
// import ProductsPage from '../pages/Admin/pages/ProductsPage';
// import DashboardAppPage from '../pages/Admin/pages/DashboardAppPage';
// import HomeIndex from '../pages/Home/Index';

// // ----------------------------------------------------------------------

// export default function Router() {
//   const routes = useRoutes([
//     {
//         element: <HomeIndex />,
//         path: "/",
//     },

//     {
//       path: '/Admin',
//       element: <DashboardLayout />,
//       children: [
//         { path: 'app', element: <DashboardAppPage /> },
//         { path: 'user', element: <UserPage /> },
//         { path: 'products', element: <ProductsPage /> },
//         { path: 'blog', element: <BlogPage /> },
//       ],
//     },
//     {
//       path: 'login',
//       element: <LoginPage />,
//     },
//     {
//       element: <SimpleLayout />,
//       children: [
//         { path: '404', element: <Page404 /> },
//         // { path: '*', element: <Navigate to="/404" /> },
//       ],
//     },
//     // {
//     //   path: '**',
//     //   element: <Navigate to="/404" replace />,
//     // },
//   ]);

//   return routes;
// }