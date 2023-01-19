import { Button } from "@mui/material";
import { goToElement } from "../../utils/service/GoToPage";
import "./Header.scss";

function Header() {
    return (
        <header className="header">
            <nav className="container">
                <ul>
                    <li className="header-logo"> 
                        <img src="/assets/Logo.png" alt="Logo" />
                    </li>
                    
                    <li>
                        <Button onClick={(e) => goToElement(e)} data-ref="best-colletion" variant="text" color="inherit"> Mejor colección </Button>
                    </li>

                    <li>
                        <Button onClick={(e) => goToElement(e)} data-ref="main-product" variant="text" color="inherit"> Mas vendido </Button>
                    </li>
                    <li>
                        <Button onClick={(e) => goToElement(e)} data-ref="our-product" variant="text" color="inherit"> Nuestros productos </Button>
                    </li>
                    <li>
                        <Button onClick={(e) => goToElement(e)} data-ref="about" variant="text" color="inherit"> Sobre nosotros </Button>
                    </li>
                </ul>

                <ul>
                    <li>
                        <Button className="btn-log-in"> Iniciar sesión </Button>
                    </li>
                    <ul>
                        <Button variant="outlined" className="btn">Unete</Button>
                        {/* <button className="btn btn-primary btn-outline">Unete</button> */}
                    </ul>
                </ul>

                <Button variant="outlined" className="btn movil">Unete</Button>

            </nav>

        </header>
    );
}

export default Header;