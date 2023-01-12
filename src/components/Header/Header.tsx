import React from "react";
import "./Header.scss";


function Header() {
    return (
        <header className="header">
            <nav className="container">
                <ul>
                    <li className="header-logo"> 
                        <img src="/assets/Logo.png" alt="Logo" />
                    </li>
                    
                    <li className="active">Mas vendidos</li>
                    <li>Mejor colección</li>
                    <li>Nuestros productos</li>
                    <li>Sobre nosotros</li>
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