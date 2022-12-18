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
                    <li>Log In</li>
                    <ul>
                        <button className="btn btn-primary btn-outline">Sing Up</button>
                    </ul>
                </ul>
            </nav>
        </header>
    );
}

export default Header;