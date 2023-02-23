import { Badge, Fab } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { ShoppingBag } from "../../components/Icons/shopping-bag";
import env from "../../env";
import { IPropHome, IStateHome } from "../../utils/interface/components/IHome";
import ILocalShopingCart from "../../utils/interface/localstorage/IShopingCart";
import { openOffCanvas, toggleOffCanvas } from "../../utils/service/OffCanvas";
import ProductShop from "../Product/Shop/Shop";
import BestColletion from "./components/BestColletion/BestColletion";
import HomeDashboard from "./components/Dashboard/Dashboard";
import Inspiration from "./components/Inspiration/Inspiration";
import Manufacture from "./components/Manufacture/Manufacture";
import Product from "./components/Product/Product";


import "./Index.scss";

class HomeIndex extends React.Component<IPropHome, IStateHome> {
    constructor(props: any) {
        super(props);

        this.state = {
            productId: "",
            shopingCartLength: JSON.parse(window.localStorage.getItem(env.localStorage.values.shoppingCart) || "[]").length
        };

        this.loadInfoByOffCanvas = this.loadInfoByOffCanvas.bind(this);
        this.updateLocalStorage = this.updateLocalStorage.bind(this);

        // @ts-ignore
        window.changeValue = this.updateLocalStorage;
        
    }

    componentDidMount(): void {
        this.addEventToOpenShop();
    }
    
    addEventToOpenShop() {
        document.addEventListener("click", (a: any) => {
            if (a.target.getAttribute('data-product-id') != null) {
                this.loadInfoByOffCanvas(a.target);
            }
        });    
    }

    loadInfoByOffCanvas(element: HTMLButtonElement) {
        openOffCanvas("shop-product");
        this.setState({ productId: element.dataset.productId });
    }


    updateLocalStorage() {
        const localStorageValue = window.localStorage.getItem(env.localStorage.values.shoppingCart);
        if (!localStorageValue) return;

        const shoppingCart: Array<ILocalShopingCart> = JSON.parse(localStorageValue);
        this.setState({ shopingCartLength: shoppingCart.length });
    }
    
    render(): React.ReactNode {
        return (
            <React.Fragment>
                <HomeDashboard />
                <BestColletion />

                <Manufacture />
                <Product />

                <Inspiration />
                <Footer />


                <main className="off-canvas">
                    <button className="off-close" onClick={() => toggleOffCanvas("shop-product")}>

                    </button>
                
                    <div id="shop-product">
                        <ProductShop productId={this.state.productId}/>
                    </div>
                </main>




                {
                    this.state.shopingCartLength > 0 
                    ?
                        <Link to="/Order/GenerateOrder" className="link-to-shopping-cart" style={{ position: 'fixed', bottom: '16px', right: '16px', zIndex: '1001' }}>
                            <Badge badgeContent={this.state.shopingCartLength} color="secondary" overlap="circular" sx={{ zIndex: '10000000 !important' }}>
                                <Fab color="primary" aria-label="add">
                                    <ShoppingBag />
                                </Fab>
                            </Badge>
                        </Link>
                    :
                        null
                }
            </React.Fragment>
        )
    }
}

export default HomeIndex;