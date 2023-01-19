import { Button } from "@mui/material";
import React from "react";
import "./Manufacture.scss";

class Manufacture extends React.Component {
    render(): React.ReactNode {
        return (
            <main className="manufacture container">
                <div className="manufacture-description">
                    <h2>Nuestra Fabricación</h2>
                    <p>Nuestra labor al momento de elaborar cada uno de las prendas es hacerlo con amor y pasión de forma que quede impregnado esa esencia que usted le quiere dar a su producto.</p>


                    <Button variant="contained"> Leer más </Button>
                    {/* <button className="btn btn-primary">Leer más</button> */}
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