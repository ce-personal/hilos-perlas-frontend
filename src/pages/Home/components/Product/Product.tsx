import { Grid } from "@mui/material";
import axios from "axios";
import React from "react";
import ShopProductCard from "../../../../components/Card/Card";
import env from "../../../../env";
import { IPropProduct, IStateProduct } from "../../../../utils/interface/components/IProduct";
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

                    <div className="list-product-cards">  
                        <Grid container spacing={2}>
                            {
                                this.state.listProduct.map(a => (
                                    // xl={3} lg={3} md={4} xs={6}
                                    <Grid key={a.product.id} item xl={3} lg={3} md={4} sm={6} xs={12}>
                                        <ShopProductCard buttonBuy={null} key={a.product.id} product={a} />
                                    </Grid>
                                ))
                            }
                        </Grid>  
                    </div>

                </div>
            </main>
        )
    }
}

export default Product;