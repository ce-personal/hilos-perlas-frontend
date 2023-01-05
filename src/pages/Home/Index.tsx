import React from "react";
import Footer from "../../components/Footer/Footer";
import BestColletion from "./components/BestColletion/BestColletion";
import HomeDashboard from "./components/Dashboard/Dashboard";
import Inspiration from "./components/Inspiration/Inspiration";
import Manufacture from "./components/Manufacture/Manufacture";
import Product from "./components/Product/Product";


class HomeIndex extends React.Component {
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <HomeDashboard />
                <BestColletion />

                <Manufacture />
                <Product />

                <Inspiration />
                <Footer />
            </React.Fragment>
        )
    }
}

export default HomeIndex;