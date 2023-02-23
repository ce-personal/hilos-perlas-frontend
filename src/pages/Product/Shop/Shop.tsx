import { Button, ImageList, ImageListItem } from '@mui/material';
import axios from 'axios';

import env from '../../../env';
import React from 'react';
import { IPropProductShop, IStateProductShop } from '../../../utils/interface/components/IStateProductShop';


import LocalGroceryStoreRoundedIcon from '@mui/icons-material/LocalGroceryStoreRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

import "./Shop.scss";
import BestColletion from '../../Home/components/BestColletion/BestColletion';
import IShopingCart from '../../../utils/interface/localstorage/IShopingCart';
import { Link } from 'react-router-dom';



class ProductShop extends React.Component<IPropProductShop, IStateProductShop> {
    constructor(props: any) {
        super(props);

        this.state = {
            product: null,
            mainFile: '',
            isToShoppingCart: this.isToAddToShopingCart()
        }

        document.body.style.backgroundColor = "#f5f5f5";

        this.toggleShoppingCart = this.toggleShoppingCart.bind(this);
        this.updateView = this.updateView.bind(this);
        this.isToAddToShopingCart = this.isToAddToShopingCart.bind(this);
        this.addToShoppingCart = this.addToShoppingCart.bind(this);
        this.goToShopping = this.goToShopping.bind(this);
    }

    async componentDidUpdate(prevProps: Readonly<IPropProductShop>, prevState: Readonly<IStateProductShop>): Promise<void> {
        if (this.props.productId !== prevProps.productId) {
            this.updateView();
        }
    }


    async componentDidMount(): Promise<void> {
        if (this.props.productId === "") return;
        this.updateView();
    }


    async updateView(): Promise<void> {
        this.setState({
            isToShoppingCart: this.isToAddToShopingCart()
        });

        const response = await axios.get(`${env.API_URL}/Product/GetProductById?productId=${this.props.productId}`);
        const mainFile = response.data.files.find(a => a.isItMainFile);

        this.setState({ product: response.data, mainFile: mainFile.stringFile });
    }


    isToAddToShopingCart() {
        let localStorageValue: Array<IShopingCart> = JSON.parse(localStorage.getItem(env.localStorage.values.shoppingCart)) || [];
        return localStorageValue.find(a => a.productId == this.props.productId) !== null;
    }

    removeToShoppingCart() {
        let localStorageValue: Array<IShopingCart> = JSON.parse(localStorage.getItem(env.localStorage.values.shoppingCart)) || [];
        localStorageValue = localStorageValue.filter(a => a.productId !== this.props.productId);

        localStorage.setItem(env.localStorage.values.shoppingCart, JSON.stringify(localStorageValue));    

        // @ts-ignore
        window.changeValue();
    }

    addToShoppingCart(model: IShopingCart) {
        let localStorageValue: Array<IShopingCart> = JSON.parse(localStorage.getItem(env.localStorage.values.shoppingCart)) || [];
        localStorageValue.push(model);

        localStorage.setItem(env.localStorage.values.shoppingCart, JSON.stringify(localStorageValue));    

        // @ts-ignore
        window.changeValue();
    }


    toggleShoppingCart() {
        const isInLocal = this.isToAddToShopingCart();

        if (isInLocal) {
            this.setState({ isToShoppingCart: false });
            this.removeToShoppingCart();

            return false;
        }
        
        else {
            const quantity = prompt(`Indique la cantidad de piezas. (max: ${this.state.product.product.quantity})`, "1");

            if (quantity == null) return false;
            if (parseInt(quantity) > this.state.product.product.quantity) {
                alert("Lo sentimos no tenemos esa cantidad en producción");
                return false;
            } 

            const model: IShopingCart = {
                productId: this.props.productId,
                quantity: parseInt(quantity)
            } 

            this.setState({ isToShoppingCart: true });
            this.addToShoppingCart(model);

            return true;
        }
    }

    goToShopping(event) {
        const isInLocal = this.isToAddToShopingCart();
        
        let isToShop = true;
        if (!isInLocal) isToShop = this.toggleShoppingCart();
        
    
        if (!isToShop) {
            event.preventDefault();
        } 
          
        else {
            document.body.classList.remove("off");
            document.body.style.backgroundColor = "";
        }
    }

    componentWillUnmount(): void {
        document.body.classList.remove("off");
    }

    render(): React.ReactNode {
        if (this.props.productId == "") return <div></div>

        return (
            <main className="shop container">
                <main className='title'>
                    <div className="title-image">
                        <img src="https://cdn.dribbble.com/users/7281356/avatars/small/01fa6110318a90e4e535eaf97aadc76d.jpg?1650772828" alt="" />

                        <div className="content">
                            <h3>{this.state.product?.product.name}</h3>
                            <p>Producto de calidad verificada ✔️</p>
                        </div>
                    </div>

                    <div className="title-button">
                        <Button variant="outlined" size='small' onClick={this.toggleShoppingCart}>
                            <FavoriteRoundedIcon />
                            {
                                this.state.isToShoppingCart ? "Agregado" : "Agregar al carrito" 
                            }
                        </Button>
                        <Link to="/Order/GenerateOrder" onClick={this.goToShopping}>
                            <Button variant='contained' size='small'>
                                <LocalGroceryStoreRoundedIcon />
                                Comprar
                            </Button>
                        </Link>
                    </div>
                </main>

                <div className="files">
                    <div className="files-main">
                        <ImageList variant="masonry" cols={this.state.product?.files.length > 1 ? 2 : 1} gap={8}>
                            {(this.state.product?.files || []).map((item) => (
                                <ImageListItem key={item.stringFile}>
                                    <img
                                        src={`${item.stringFile}`}
                                        srcSet={`${item.stringFile}`}
                                        alt={item.id}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </div>

                <div className="description">
                    <h4>{this.state.product?.product.description || "Hermosa prenda preciosa para cualquier tipo de persona hecha a su medida y detalle"}</h4>
                </div>


                {/* Informacion para la empresa */}
                <div className='company'>
                    <div className="company-logo">
                        <img src={env.company.logo} alt="" />
                        <div className="line"></div>
                    </div>
                </div>


                <BestColletion />
            </main>
        );
    }
}

export default ProductShop;