import React from "react";
import HomeDashboard from "./components/Dashboard/Dashboard";


class HomeIndex extends React.Component {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <HomeDashboard />
            </React.Fragment>
        )
    }
}

export default HomeIndex;