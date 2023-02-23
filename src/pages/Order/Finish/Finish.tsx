import { Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import Header from "../../../components/Header/Header";
import env from "../../../env";
import { IStateFinishOrder } from "../../../utils/interface/components/IOrder";
import TableProductOrder from "../components/TableProduct";
import dayjs, { Dayjs, locale } from 'dayjs';

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Map from "../components/Map";
import { Link } from "react-router-dom";


import "./Finish.scss";
import moment from "moment";

class FinishOrder extends React.Component<{}, IStateFinishOrder> {
    constructor(props: any) {
        super(props);

        document.body.style.backgroundColor = "#f9fafc";
        this.state = {
            listProductInLocal: JSON.parse(localStorage.getItem(env.localStorage.values.shoppingCart)) || [],
            listProduct: [],
            value: dayjs(moment(new Date()).format("yyyy-MM-DD")),
            user: JSON.parse(localStorage.getItem("user")),
            marker: null
        }


        this.loadProduct = this.loadProduct.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.changeValueMarker = this.changeValueMarker.bind(this);
        this.finishOrder = this.finishOrder.bind(this);
    }

    componentDidMount(): void {
        this.loadProduct();
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

    changeValue(value: Dayjs | null) {
        this.setState({ value });
    }

    changeValueMarker(marker) {
        this.setState({ marker });
    }



    async finishOrder(event) {        
        let deliveryDate = "";

        debugger

        try
        {
            // @ts-ignore
            deliveryDate = `${this.state.value.getFullYear()}-${this.state.value.getMonth()}-${this.state.value.getDate()}`;
        }
        catch(ex) 
        {
            deliveryDate = `${this.state.value.year()}-${this.state.value.month() < 10 ? `0${this.state.value.month()}` : this.state.value.month()}-${this.state.value.date() < 10 ? `0${this.state.value.date()}` : this.state.value.date()}`;
        }
        let direction = "";


        const domDirrecion = document.querySelector("#direction") as HTMLInputElement;
        if (domDirrecion.value == "" || domDirrecion == null) return event.preventDefault();
        else direction = domDirrecion.value;


        if (this.state.listProduct.length == 0) {
            alert("No puedes hacer un pedido sin productos agregados");
            return event.preventDefault();
        }



        const isReady = window.confirm("¿Estás seguro de que quieres continuar? Una vez que hayas finalizado, no habrá posibilidad de modificar tu pedido y deberás adquirirlo.");
        if (!isReady) return event.preventDefault();




        const formDataOrder = new FormData();
        formDataOrder.append("clientId", this.state.user.id);
        formDataOrder.append("deliveryDate", deliveryDate);
        formDataOrder.append("ubication", direction);
        
        const newOrder = await axios.post(`${env.API_URL}/Order/CreateOrder`, formDataOrder);

        for (const item of this.state.listProduct) {
            const formDataItemOrder = new FormData();

            formDataItemOrder.append("orderId", newOrder.data.id);
            formDataItemOrder.append("quantity", item.quantityLocal.toString());
            formDataItemOrder.append("productId", item.product.id);

            await axios.post(`${env.API_URL}/Order/CreateItemOrderByOrderId`, formDataItemOrder);
        }

        alert("Gracias por hacer su pedido. Le mantendremos informado sobre el estado de su orden y nos pondremos en contacto con usted pronto. ¡Quede atento!")
        window.localStorage.removeItem(env.localStorage.values.shoppingCart);


        try {
            (window as any).reloadMyOrders();
        } 
        catch (error) {
            console.error(error);    
        }
    }



    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Paper elevation={3}>
                    <Header />
                </Paper>
                

                <main style={{ height: 'calc(100% - 95px)' }} className="grid-list-finish-order">
                    <div className="map-container">
                        <Map changeValueMarker={this.changeValueMarker}/>
                    </div>

                    <div>
                        <div style={{ padding: '20px' }}>
                            <TableProductOrder listProduct={this.state.listProduct} />
                        </div>

                        <div style={{ padding: '20px' }}>
                            <form>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <MobileDatePicker
                                        label="Fecha de entrega"
                                        inputFormat="dd/MM/yyyy"
                                        value={this.state.value}
                                        onChange={this.changeValue}
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </LocalizationProvider>

                                 <TextField
                                    sx={{ marginTop: '30px' }}
                                    fullWidth
                                    label="Proporciona una dirección exacta."
                                    name="direction"
                                    id="direction"
                                    variant="outlined"

                                    multiline
                                    rows={4}
                                />
                            
                                <Link onClick={this.finishOrder} to="/Order/MyOrders">
                                    <Button variant="contained" sx={{ display: 'flex', margin: 'auto', marginTop: '20px'  }}>
                                        Realizar pedido
                                    </Button>
                                </Link>
                            </form>
                        </div>
                    </div>

                </main>
            </React.Fragment>
        )
    }
}

export default FinishOrder;