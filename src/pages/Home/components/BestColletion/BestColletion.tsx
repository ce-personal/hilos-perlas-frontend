import React from "react";
import CardProduct from "../../../../components/Home/CardProduct/CardProduct";
import { IPropBestColletion, IStateBestColletion } from "../../../../utils/interface/components/IBestColletion";
import { backgroundCardProduct } from "../../../../utils/interface/components/ICardProduct";
import IProduct from "../../../../utils/interface/shop/IProduct";

import "./BestColletion.scss";


class BestColletion extends React.Component<IPropBestColletion, IStateBestColletion> {
    directionalImageList = {
        left: "/assets/bestColletion/arrow-left.svg",
        right: "/assets/bestColletion/arrow-right.svg", 
        leftDisabled: "/assets/bestColletion/arrow-left-disabled.svg",
        rightDisabled: "/assets/bestColletion/arrow-right-disabled.svg"
    };

    constructor(props: any) {
        super(props);

        this.state = { listProduct: [] }
    }
    
    componentDidMount(): void {
        this.setState({
            listProduct: [
                // @ts-ignore
                { id: '0', name: "Apple Watch", price: '$450', quantity: 2, categoryId: '', customProductId: '', date: new Date(), description: '', recordId: '', listFile: [ { id: '1', stringFile: "/assets/bestColletion/apple-watch.png" }]  },
                // @ts-ignore
                { id: '1', name: "Cartier", price: '$450', quantity: 2, categoryId: '', customProductId: '', date: new Date(), description: '', recordId: '', listFile: [ { id: '2', stringFile: "/assets/bestColletion/cartier.png" }] },
                // @ts-ignore
                { id: '2', name: "Seiko", price: '$450', quantity: 2, categoryId: '', customProductId: '', date: new Date(), description: '', recordId: '', listFile: [ { id: '3', stringFile: "/assets/bestColletion/seiko.png" }] }
            ]
        })
    }

    generateButton(product: IProduct) {
        return (
            <button className="btn btn-primary">Buy now</button>
        )
    }

    render(): React.ReactNode {
        return (
            <main className="container best-colletion">
                <div className="title">
                    <h2>Our Best Collection</h2>

                    <div className="directional">
                        <img src={this.directionalImageList.leftDisabled} alt="" />
                        <img src={this.directionalImageList.right} alt="" />
                    </div>
                </div>


                <div className="list-best-colletion">
                    {
                        this.state.listProduct.map(a => <CardProduct key={a.id} product={a} button={this.generateButton(a)} background={backgroundCardProduct.random} />)
                    }
                </div>



                <div className="principal-product">
                    <div className="product-image">
                        <div className="decoration">
                            <div className="option"></div>
                            <div className="option"></div>
                        </div>

                        <img src="/assets/bestColletion/rolex-milgauss.png" alt="" />
                    </div>

                    <div className="product-description">
                        <h3>Rolex Milgauss</h3>

                        <p>watches have proved themselves from the start in the most extreme conditions imaginable – from the depths of the deepest oceans to the summits of the highest mountains.</p>

                        <button className="btn btn-primary">Buy now</button>
                    </div>
                </div>
            </main>
        )
    }
}

export default BestColletion;