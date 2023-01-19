import React from "react";
import { IPropBestColletion, IStateBestColletion } from "../../../../utils/interface/components/IBestColletion";
import axios from "axios";

import "./BestColletion.scss";
import env from "../../../../env";
import ShopProductCard from "../../../../components/Card/Card";
import { Button, Grid } from "@mui/material";
import IProduct from "../../../../utils/interface/shop/IProduct";


class BestColletion extends React.Component<IPropBestColletion, IStateBestColletion> {
    directionalImageList = {
        left: "/assets/bestColletion/arrow-left.svg",
        right: "/assets/bestColletion/arrow-right.svg", 
        leftDisabled: "/assets/bestColletion/arrow-left-disabled.svg",
        rightDisabled: "/assets/bestColletion/arrow-right-disabled.svg"
    };

    constructor(props: any) {
        super(props);

        this.state = { listProduct: [], mainProduct: null, mainFile: '' }
    }
    
    async componentDidMount(): Promise<void> {
        const response = await axios.get(`${env.API_URL}/Product/GetListBestProduct`);

        const mainProduct: IProduct = response.data[0].product;
        const mainFile = response.data[0].files.find(a => a.isItMainFile);
        response.data.shift();

        this.setState({ listProduct: response.data, mainFile: mainFile.stringFile, mainProduct: mainProduct });
    }

    render(): React.ReactNode {
        return (
            <main className="container best-colletion" id="best-colletion">
                <div className="title">
                    <h2>Nuestra mejor colección</h2>

                    <div className="directional">
                        <img src={this.directionalImageList.leftDisabled} alt="" />
                        <img src={this.directionalImageList.rightDisabled} alt="" />
                    </div>
                </div>


                <div className="list-best-colletion">    
                    {
                        this.state.listProduct.map(a => <ShopProductCard key={a.id} product={a} />)
                        // this.state.listProduct.map(a => <CardProduct key={a.id} product={a} button={this.generateButton(a)} background={backgroundCardProduct.random} />)
                    }
                </div>



                <div className="principal-product" id="main-product">
                    <div className="product-image">
                        <img src={this.state.mainFile} alt="" />
                    </div>

                    <div className="product-description">
                        <h3>{this.state.mainProduct?.name || "Cargando..."}</h3>

                        <p>{this.state.mainProduct?.description || "Cargando..."}</p>

                        <Button variant="contained">
                            Comprar
                        </Button>
                        {/* <button className="btn btn-primary">Comprar</button> */}
                    </div>
                </div>
            </main>
        )
    }
}

export default BestColletion;