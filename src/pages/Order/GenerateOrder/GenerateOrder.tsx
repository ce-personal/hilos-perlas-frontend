/* eslint-disable */

import { Button, DialogTitle, Grid, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ShopProductCard from "../../../components/Card/Card";
import Header from "../../../components/Header/Header";
import env from "../../../env";
import { IPropGenerateOrder, IPropGenerateOrderButtonEdit, IStateGenerateOrder } from "../../../utils/interface/components/IOrder";
import TableProductOrder from "../components/TableProduct";


import "./GenerateOrder.scss";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },

    ["&:focus-visible"]: {
        outline: 'auto 0.1px #00000010'
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ContainerButtonOrder = styled("div")(() => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginTop: '18px'
}));


class ButtonEdit extends React.Component<IPropGenerateOrderButtonEdit> {
    changeQuantity(productId: string): void {
        const quantity = parseInt(prompt(`Por favor ingrese la cantidad deseada. 0 para eliminar el producto. Máximo ${this.props.product.quantity}.`));
        if (isNaN(quantity)) return alert("Valor no válido");
        if (quantity > this.props.product.quantity) return alert("Lo sentimos no tenemos esa cantidad en producción");

        if (quantity == 0) this.props.removeProduct(productId);
        else if (quantity > 0) this.props.changeQuantity(productId, quantity);
    }

    render(): React.ReactNode {
        return (
            <Button variant="outlined" onClick={() => this.changeQuantity(this.props.product.id)}>
                Editar cantidad
            </Button>
        )
    }
}


class OrderGenerateOrder extends React.Component<IPropGenerateOrder, IStateGenerateOrder> {
    constructor(props: any) {
        super(props);

        document.body.style.backgroundColor = "#f9fafc";
        this.state = {
            listProductInLocal: JSON.parse(localStorage.getItem(env.localStorage.values.shoppingCart)),
            listProduct: [],
            urlRedirect: ''
        }


        this.loadProduct = this.loadProduct.bind(this);
        this.changeQuantity = this.changeQuantity.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.setUrlRedirect = this.setUrlRedirect.bind(this);
    }

    componentDidMount(): void {
        this.setUrlRedirect();
        this.loadProduct();
    }

    setUrlRedirect() {
        const userSaveInLocal = localStorage.getItem("user");
        if (userSaveInLocal == "" || !userSaveInLocal) return this.setState({ urlRedirect: "/Account/Login?redirectTo=/Order/Finish" });
        const user = JSON.parse(userSaveInLocal);

        if (user.id) this.setState({ urlRedirect: "/Order/Finish" });
    }

    async loadProduct(): Promise<void> {
        const formData = new FormData();
        for (const item of this.state.listProductInLocal) {
            formData.append("listProductId[]", item.productId);
        }

        const response = await axios.post(`${env.API_URL}/Product/GetProductByListId`, formData);
        for (const item of response.data) {
            const productByItem = this.state.listProductInLocal.find(a => a.productId == item.product.id);
            item.quantityLocal = productByItem.quantity;
        
            item.product.status = "Cantidad: " + item.quantityLocal;
        }

        this.setState({ listProduct: response.data });
    }


    changeQuantity(productId: string, quantity: number): void {
        const product = this.state.listProduct.findIndex(a => a.product.id == productId)
        const productInLocal = this.state.listProductInLocal.findIndex(a => a.productId == productId)

        const listProductEdit = this.state.listProduct[product];
        listProductEdit.quantityLocal = quantity;
        // @ts-ignore
        listProductEdit.product.status = "Cantidad: " + quantity;
        
        const listProductInLocalEdit = this.state.listProductInLocal[productInLocal];
        listProductInLocalEdit.quantity = quantity;


        this.setState({ listProduct: this.state.listProduct, listProductInLocal: this.state.listProductInLocal });
        localStorage.setItem(env.localStorage.values.shoppingCart, JSON.stringify(this.state.listProductInLocal));    
    }

    removeProduct(productId: string) {
        const newListProduct = this.state.listProduct.filter(a => a.product.id != productId);
        const newListProductInLocal = this.state.listProductInLocal.filter(a => a.productId != productId);

        this.setState({ listProduct: newListProduct, listProductInLocal: newListProductInLocal });
        localStorage.setItem(env.localStorage.values.shoppingCart, JSON.stringify(newListProductInLocal));    
    }



    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Paper elevation={3}>
                    <Header />
                </Paper>


                <main className="grid-list-generate-order">
                    <div className="list-product list-product-generate-order" style={{ marginTop: 0, paddingLeft: '20px' }}>
                        <Grid container spacing={2} justifyContent="center">
                            {
                                this.state.listProduct.map(a => (
                                    <Grid key={a.product.id} item xl={4} lg={4} md={6} sm={6} xs={12}>
                                        <ShopProductCard buttonBuy={<ButtonEdit removeProduct={this.removeProduct} changeQuantity={this.changeQuantity} product={a.product} />} key={a.product.id} product={a}  />
                                    </Grid>
                                ))
                            }

                        </Grid>
                    </div>

                    <div style={{ marginTop: '50px', padding: '20px' }}>
                        <TableProductOrder listProduct={this.state.listProduct} />


                        <ContainerButtonOrder>
                            <Link to="/">
                                <Button variant="outlined">
                                    Seguir comprando
                                </Button>
                            </Link>

                            <Link to={this.state.urlRedirect}>
                                <Button variant="contained">
                                    Terminar compra
                                </Button>
                            </Link>
                        </ContainerButtonOrder>
                    </div>
                </main>
            </React.Fragment>
        )
    }
}

export default OrderGenerateOrder;