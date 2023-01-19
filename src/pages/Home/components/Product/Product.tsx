import axios from "axios";
import React from "react";
import ShopProductCard from "../../../../components/Card/Card";
import CardProduct from "../../../../components/Home/CardProduct/CardProduct";
import env from "../../../../env";
import { backgroundCardProduct } from "../../../../utils/interface/components/ICardProduct";
import { IPropProduct, IStateProduct } from "../../../../utils/interface/components/IProduct";
import IProduct from "../../../../utils/interface/shop/IProduct";
import "./Product.scss";


class Product extends React.Component<IPropProduct, IStateProduct> {
    constructor(props: any) {
        super(props);

        this.state = { listProduct: [] };
    }

    async componentDidMount(): Promise<void> {
        const response = await axios.get(`${env.API_URL}/Product/GetListProduct`);
        this.setState({ listProduct: response.data })
    }

    render(): React.ReactNode {
        return (
            <main className="list-product" id="our-product">
                <div className="container">
                    <div className="info-product">
                        <h1>Nuestros podructos</h1>
                        <p>Cada uno de nuestros productos creados con la mejor calidad posible y una gran emoción de apego con el producto dando un gran resultado. </p>
                    </div>

                    <div className="list-product">    
                        {
                            this.state.listProduct.map(a => <ShopProductCard key={a.id} product={a} />)
                        }
                    </div>

                </div>
            </main>
        )
    }
}

export default Product;