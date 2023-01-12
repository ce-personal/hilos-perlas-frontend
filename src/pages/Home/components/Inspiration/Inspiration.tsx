import React from "react";
import "./Inspiration.scss";

class Inspiration extends React.Component {
    render(): React.ReactNode {
        return (
            <main className="container inspiration">
                <div className="inspiration-text">
                    <h1 className="title">Haciendo cada momento de tu vida perfecta</h1>
                    <p>Qué mejor manera de hacer los momentos perfectos que regalando un detalle hermoso hecho a la medida y perfección que usted desea. Con productos de calidad  y al mejor precios. </p>


                    <button className="btn btn-primary"> Leer más </button>
                </div>
                
                <div className="inspiration-image">
                    <img src="/assets/inspiration/inspiration.png" alt="Imagen de inspiracion" />
                </div>
            </main>
        )
    }
}

export default Inspiration;