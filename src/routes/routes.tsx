import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import HomeIndex from "../pages/Home/Index";

class RouteView extends React.Component {
    routes = createBrowserRouter([
        {
            element: <HomeIndex />,
            path: "/"
        }
    ]);

    render(): React.ReactNode {
        return (
            <RouterProvider router={this.routes} />
        )
    }
}

export default RouteView;