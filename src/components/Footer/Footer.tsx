import React from "react";
import { IPropFooter, IStateFooter } from "../../utils/interface/components/IFoorter";
import "./Footer.scss";


class Footer extends React.Component<IPropFooter, IStateFooter> {
    constructor(props: any) {
        super(props);

        this.state = {
            ourService: [],
            aboutUs: [],
            categoryProduct: [],
            contact: []
        }
    }

    componentDidMount(): void {
        this.setState({
            ourService: ["Productos de calidad", "100% de calidad", "Servicio 24/7"]
        });

        this.setState({
            categoryProduct: [
                { id: '1', description: '', name: 'Pulseras', recordId: '1'  },
                { id: '2', description: '', name: 'Chapas', recordId: '1'  },
                { id: '3', description: '', name: 'Cadenas', recordId: '1'  },
            ]
        });

        this.setState({
            contact: [
                { name: 'Managua, Nicaragua', url: '' },
                { name: 'Phone: +505 8269 4705', url: '' },
                { name: 'hilosyperla5@gmail.com', url: '' },
            ]
        });

        this.setState({
            aboutUs: [
                { name: 'Nuestros inicios', url: '' },
                { name: 'Nuestro personal', url: '' },
                { name: 'Mas de nosotros', url: '' },
            ]
        });
    }





    render(): React.ReactNode {
        return (
            <main className="container footer">
                <div className="footer-information">
                    <div className="col">
                        <h3>Nuestro servicio</h3>

                        <div className="lines">
                            {
                                this.state.ourService.map(a => <p key={a}>{a}</p>)
                            }
                        </div>
                    </div>

                    <div className="col">
                        <h3>Productos</h3>

                        <div className="lines">
                            {
                                this.state.categoryProduct.map(a => (
                                    <p key={a.id}>{a.name}</p>
                                )) 
                            }
                        </div>
                    </div>

                    <div className="col">
                        <h3>Acerca de</h3>

                        <div className="lines">
                            {
                                this.state.aboutUs.map(a => (
                                    <p key={a.name}>{a.name}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className="col">
                        <h3>Contacto</h3>

                        <div className="lines">
                            {
                                this.state.contact.map(a => <a href={a.url} key={a.name}>{a.name}</a>)
                            }
                        </div>
                    </div>
                </div>

                <div className="line"></div>


                <div className="footer-red">
                    <div className="col">
                        <p>2022 - Managua, Nicaragua.</p>
                        <p>Todos los derechos reservados</p>
                    </div>

                    <div className="col image-logo">
                        <img src="/assets/Logo.png" alt="Logo de la empresa" />
                    </div>

                    <div className="col">
                        <img src="/assets/footer/Facebook.png" alt="" className="icon" />
                        <img src="/assets/footer/Twitter.png" alt="" className="icon" />
                        <img src="/assets/footer/Instagram.png" alt="" className="icon" />
                    </div>
                </div>
            </main>
        )
    }
}

export default Footer;