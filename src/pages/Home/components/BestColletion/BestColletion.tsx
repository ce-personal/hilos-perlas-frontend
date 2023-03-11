import React from "react";
import { IPropBestColletion, IStateBestColletion } from "../../../../utils/interface/components/IBestColletion";
import axios from "axios";

import "./BestColletion.scss";
import env from "../../../../env";
import ShopProductCard from "../../../../components/Card/Card";
import { Button } from "@mui/material";
import IProduct from "../../../../utils/interface/shop/IProduct";
import { openOffCanvas } from "../../../../utils/service/OffCanvas";
import ReactDOM from "react-dom";
import ProductShop from "../../../Product/Shop/Shop";


class BestColletion extends React.Component<IPropBestColletion, IStateBestColletion> {
    directionalImageList = {
        left: "/assets/bestColletion/arrow-left.svg",
        right: "/assets/bestColletion/arrow-right.svg", 
        leftDisabled: "/assets/bestColletion/arrow-left-disabled.svg",
        rightDisabled: "/assets/bestColletion/arrow-right-disabled.svg"
    };

    constructor(props: any) {
        super(props);

        this.state = { listProduct: [], mainProduct: null, mainFile: '', dom: null }
    }
    
    async componentDidMount(): Promise<void> {
        const response = await axios.get(`${env.API_URL}/Product/GetListBestProduct`);

        const mainProduct: IProduct = response.data[0].product;
        const mainFile = response.data[0].files.find(a => a.isItMainFile);
        response.data.shift();

        this.setState({ listProduct: response.data, mainFile: mainFile.stringFile, mainProduct: mainProduct });
    }

    openShowProduct(id: string) {
        openOffCanvas("shop-product");
        
        const parent = document.getElementById("shop-product");
        parent.innerHTML = "";
        const portal = (ReactDOM.createPortal(<ProductShop productId={id} />, parent));

        this.setState({ dom: portal });

        parent.scrollBy(
            {
                behavior: "smooth",
                top: 0
            }
        )
    };

    render(): React.ReactNode {
        return (
            <main className="container best-colletion" id="best-colletion">
                {this.state.dom}
                <div className="title">
                    <h2>{this.props.title || "Nuestra mejor colección" } </h2>
                </div>


                <div className="list-best-colletion">    
                    {
                        this.state.listProduct.map(a => <ShopProductCard buttonBuy={null} key={a.product.id} product={a} />)
                    }
                </div>



                <div className="principal-product" id="main-product">
                    <div className="product-image">
                        <img src={this.state.mainFile} alt="" />
                    </div>

                    <div className="product-description">
                        <h3>{this.state.mainProduct?.name || "Cargando..."}</h3>

                        <p>{this.state.mainProduct?.description || "Cargando..."}</p>

                        <Button variant="contained" data-product-id={this.state.mainProduct?.id}>
                            Comprar
                        </Button>
                    </div>
                </div>
            </main>
        )
    }
}

export default BestColletion;