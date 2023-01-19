import React from "react";
import Header from "../../../../components/Header/Header";
import "./Dashboard.scss";

import { Button } from "@mui/material";
import { goToElement } from "../../../../utils/service/GoToPage";

class HomeDashboard extends React.Component {
    render(): React.ReactNode {
        return (
            <main className="dashboard">
                <Header />


                <div className="container dashboard-row">
                    <div className="col text-seccion">
                        <h1 className="dashboard-title">El límite lo pones tú</h1>
                    
                        <p className="dashboard-description">Hilos y perlas te da la bienvenida a la tienda virtual, esperamos conozcas nuestros productos y nos des el gusto de atenderte seria un placer para nosotros. </p>
                    
                    
                        <Button data-ref="best-colletion" onClick={(a) => goToElement(a)} variant="contained" className="dashboard-button btn btn-primary">
                            ¡Ordena ya!
                        </Button>
                        {/* <button className="dashboard-button btn btn-primary">¡Ordena ya!</button> */}
                    </div>

                    <div className="col image-seccion">
                        {/* <img src="/assets/dashboard/image-1.svg" alt="Imagen principal" /> */}
                        <img src="/assets/dashboard/image-1.png" alt="Imagen principal" />

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