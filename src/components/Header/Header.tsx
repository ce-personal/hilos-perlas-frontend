import { Avatar, Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Paper } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IPropHeader, IStateHeader } from "../../utils/interface/components/IHeader";
import { goToElement } from "../../utils/service/GoToPage";
import "./Header.scss";


class Header extends React.Component<IPropHeader, IStateHeader> {
    menuList = [
        {
            path: "/Product/Customizer",
            text: "Pide a tu gusto",
            ref: ""
        },
        {
            path: "/",
            text: "Mejor colección",
            ref: "best-colletion"
        },
        {
            path: "/",
            text: "Mas vendido",
            ref: "main-product"
        },
        {
            path: "/",
            text: "Nuestros productos",
            ref: "our-product"
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            menu: {
                open: false,
                anchorEl: null
            }
        }

        this.toggleMenuUser = this.toggleMenuUser.bind(this);
    }
    
    componentDidMount(): void {
        document.body.style.backgroundColor = 'transparent';
        
        this.setState({
            user: JSON.parse(localStorage.getItem("user"))
        })
    }

    toggleMenuUser() {
        this.setState({ menu: { open: !this.state.menu.open, anchorEl: document.querySelector(".anchor-user-menu") } });
    }

    logout() {
        window.localStorage.removeItem("user");
        window.location.reload();
    }

    render(): React.ReactNode {

        return (
            <React.Fragment>
                <header className="header">
                    <nav className="container">
                        <ul>
                            <li className="header-logo">
                                <Link to={"/"}>
                                    {
                                        this.props.isDashboard 
                                            ? 
                                                <img src="/assets/Logo.png" alt="Logo" />
                                            :
                                                <img src="/assets/Logo-text.png" alt="Logo" />

                                    }
                                </Link>
                            </li>

                            {
                                this.menuList.map((a) => (
                                    <li key={a.ref}>
                                        <Link to={a.path}>
                                            <Button onClick={(e) => goToElement(e)} data-ref={a.ref} variant="text" color="inherit"> {a.text} </Button>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>

                        <ul>
                            {
                                this.state.user == null
                                    ?
                                    <React.Fragment>
                                        <li>
                                            <Link to="/Account/Login">
                                                <Button className="btn-log-in"> Iniciar sesión </Button>
                                            </Link>
                                        </li>
                                        <ul>
                                            <Link to="/Account/Register">
                                                <Button variant="outlined" className="btn">Unete</Button>
                                            </Link>
                                        </ul>
                                    </React.Fragment>
                                    :
                                    <div className="container-menu-user">
                                        <Avatar className="anchor-user-menu" onClick={this.toggleMenuUser} src={this.state.user.fileString || "/assets/gen/user-default.png"} />
                                    </div>

                            }
                        </ul>
                        
                        {
                            this.state.user == null 
                            ?   (<Link className="movil" to="/Account/Register">
                                    <Button variant="outlined" className="btn">Unete</Button>
                                </Link>)
                            :   (<div className="container-menu-user movil">
                                    <Avatar className="anchor-user-menu" onClick={this.toggleMenuUser} src={this.state.user.fileString || "/assets/gen/user-default.png"} />
                                </div>)
                        }

                    </nav>
                </header>

                <Menu 
                    anchorEl={this.state.menu.anchorEl} 
                    onClose={this.toggleMenuUser} 
                    open={this.state.menu.open} 
                    sx={{ width: 320, marginTop: '12px' }} 
                    className="menu-user"
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                    <MenuList dense>
                        {
                            this.menuList.map((a) => (
                                <MenuItem key={a.ref} data-ref={a.ref} onClick={(e) => goToElement(e)} >
                                    <Link to={a.path} style={{ color: 'black' }}>
                                        <ListItemText>{a.text}</ListItemText>
                                    </Link>
                                </MenuItem>
                            ))
                        }
                        <Divider />
                        <MenuItem>
                            <Link to="/Order/MyOrders" style={{ color: 'black' }}>
                                <ListItemText>Mis pedidos</ListItemText>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="/Account/Profile" style={{ color: 'black' }}>
                                <ListItemText>Mi cuenta</ListItemText>
                            </Link>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={this.logout}>
                            <ListItemText>Cerrar sessión</ListItemText>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </React.Fragment>


        );
    }
}

export default Header;