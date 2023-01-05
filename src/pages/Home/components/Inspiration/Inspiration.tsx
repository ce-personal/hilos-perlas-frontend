import React from "react";
import "./Inspiration.scss";

class Inspiration extends React.Component {
    render(): React.ReactNode {
        return (
            <main className="container inspiration">
                <div className="inspiration-text">
                    <h1 className="title">Making every moment of your life perfect</h1>
                    <p>watches have proved themselves from the start in the most extreme conditions imaginable – from the depths of the deepest oceans to the summits of the highest mountains, </p>


                    <button className="btn btn-primary"> Learn more </button>
                </div>
                
                <div className="inspiration-image">
                    <img src="/assets/inspiration/inspiration.png" alt="Imagen de inspiracion" />
                </div>
            </main>
        )
    }
}

export default Inspiration;