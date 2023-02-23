import { ThemeProvider } from "@emotion/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AccountLogin from "../pages/Account/Login";
import AccountRegister from "../pages/Account/Register/Register";


import HomeIndex from "../pages/Home/Index";
import { theme } from "../theme";
import AccountProfile from "../pages/Account/Profile";
import OrderGenerateOrder from "../pages/Order/GenerateOrder/GenerateOrder";
import FinishOrder from "../pages/Order/Finish/Finish";
import MyOrders from "../pages/Order/MyOrders/MyOrders";
import OrderDetails from "../pages/Order/Details";
import ProductDetail from "../pages/Product/Detail";
import ProductCustomizer from "../pages/Product/Customizer/Index";



function RouteView() {
    const routes = createBrowserRouter([
        {
            element: <HomeIndex />,
            path: "/"
        },
        
        {
            element: <AccountLogin />,
            path: "/Account/Login"
        },
        {
            element: <AccountRegister />,
            path: "/Account/Register"
        },
        {
            element: <AccountProfile />,
            path: "/Account/Profile"
        },
        
        

        {
            element: <OrderGenerateOrder />,
            path: "/Order/GenerateOrder"
        },
        {
            element: <FinishOrder />,
            path: "/Order/Finish"
        },
        {
            element: <MyOrders />,
            path: "/Order/MyOrders"
        },
        {
            element: <OrderDetails />,
            path: "/Order/Details"
        },




        {
            element: <ProductDetail />,
            path: "/Product/Details"
        },
        {
            element: <ProductCustomizer />,
            path: "/Product/Customizer"
        }
    ]);

    return (
        <GoogleOAuthProvider clientId="325023130727-09031jf2g6p959lf47srnb2kgserk6an.apps.googleusercontent.com">
            <ThemeProvider theme={theme}>
                <RouterProvider router={routes} />
            </ThemeProvider>
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