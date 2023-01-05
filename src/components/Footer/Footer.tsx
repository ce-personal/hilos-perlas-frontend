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
            ourService: ["Luxuty Brads", "Free Returen", "24/7 Service"]
        });

        this.setState({
            categoryProduct: [
                { id: '1', description: '', name: 'Apple watch', recordId: '1'  },
                { id: '2', description: '', name: 'Rolex', recordId: '1'  },
                { id: '3', description: '', name: 'Omega', recordId: '1'  },
            ]
        });

        this.setState({
            contact: [
                { name: 'S.E.D Road-12011', url: '' },
                { name: 'Phone: 12345678911', url: '' },
                { name: 'S.E.D gorup@gmail.com', url: '' },
            ]
        });

        this.setState({
            aboutUs: [
                { name: 'watches have', url: '' },
                { name: 'proved themselves', url: '' },
                { name: 'the start in', url: '' },
                { name: 'highest mountains', url: '' }
            ]
        });
    }





    render(): React.ReactNode {
        return (
            <main className="container footer">
                <div className="footer-information">
                    <div className="col">
                        <h3>Our service</h3>

                        <div className="lines">
                            {
                                this.state.ourService.map(a => <p key={a}>{a}</p>)
                            }
                        </div>
                    </div>

                    <div className="col">
                        <h3>Product</h3>

                        <div className="lines">
                            {
                                this.state.categoryProduct.map(a => (
                                    <p key={a.id}>{a.name}</p>
                                )) 
                            }
                        </div>
                    </div>

                    <div className="col">
                        <h3>About us</h3>

                        <div className="lines">
                            {
                                this.state.aboutUs.map(a => (
                                    <p key={a.name}>{a.name}</p>
                                ))
                            }
                        </div>
                    </div>

                    <div className="col">
                        <h3>Contact</h3>

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
                        <p>2022 Copyright By Alhamdulla Gorup.</p>
                        <p>All Rights Resetved</p>
                    </div>

                    <div className="col">
                        <img src="/assets/logo.svg" alt="Logo de la empresa" />
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