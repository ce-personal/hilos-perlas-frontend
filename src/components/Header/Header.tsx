import React from "react";
import "./Header.scss";


function Header() {
    return (
        <header className="header">
            <nav className="container">
                <ul>
                    <li className="header-logo"> 
                        <img src="/assets/logo.svg" alt="Logo" />
                    </li>
                    
                    <li className="active">Features</li>
                    <li>Collections</li>
                    <li>Packaging</li>
                    <li>Services</li>
                </ul>

                <ul>
                    <li>Iniciar sesión</li>
                    <ul>
                        <button className="btn btn-primary btn-outline">Unete</button>
                    </ul>
                </ul>

                <button className="btn btn-primary btn-outline movil">Menu</button>
            </nav>

        </header>
    );
}

export default Header;