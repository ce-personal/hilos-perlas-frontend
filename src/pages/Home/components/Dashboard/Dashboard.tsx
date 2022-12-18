import React from "react";
import Header from "../../../../components/Header/Header";
import "./Dashboard.scss";

class HomeDashboard extends React.Component {
    render(): React.ReactNode {
        return (
            <main className="dashboard">
                <Header />


                <div className="container dashboard-row">
                    <div className="col text-seccion">
                        <h1 className="dashboard-title">The right time for life</h1>
                    
                        <p className="dashboard-description">Watches have proved themselves from the start in the most extreme conditions imaginable – from the depths of the deepest oceans to the summits of the highest mountains, </p>
                    
                    
                        <button className="dashboard-button btn btn-primary">Order Now</button>
                    </div>

                    <div className="col image-seccion">
                        <img src="/assets/dashboard/image-1.svg" alt="Imagen principal" />
                        {/* <img src="/assets/dashboard/joyas-personalizadas.png" alt="Imagen principal" /> */}

                        <div className="decoration">
                            <div className="option"></div>
                            <div className="option"></div>
                            <div className="option"></div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default HomeDashboard;