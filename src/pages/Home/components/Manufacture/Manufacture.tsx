import React from "react";
import "./Manufacture.scss";

class Manufacture extends React.Component {
    render(): React.ReactNode {
        return (
            <main className="manufacture container">
                <div className="manufacture-description">
                    <h2>Our manufacture</h2>
                    <p>watches have proved themselves from the start in the most extreme conditions imaginable – from the depths of the deepest oceans to the summits of the highest mountains.</p>

                    <button className="btn btn-primary">Learn more</button>
                </div>


                <div className="manufacture-image">
                    <img src="/assets/gen/manufacture.png" alt="" />

                    <div className="decoration">
                        <div className="option"></div>
                        <div className="option"></div>
                        <div className="option"></div>
                    </div>
                </div>

            </main>
        )
    }
}

export default Manufacture;