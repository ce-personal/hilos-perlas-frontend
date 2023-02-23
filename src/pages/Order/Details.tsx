import { Button, Paper, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import { Dayjs } from "dayjs";
import moment from "moment";
import React from "react";
import Header from "../../components/Header/Header";
import env from "../../env";
import { IPropDetail, IStateDetail } from "../../utils/interface/components/IOrder";
import TableProductOrder from "./components/TableProduct";

import Map from "./components/Map";
import { Link } from "react-router-dom";

import "./Finish/Finish.scss";


class OrderDetails extends React.Component<IPropDetail, IStateDetail> {
    constructor(props: IPropDetail) {
        super(props);

        this.state = {
            listProduct: [],
            order: null,
            user: JSON.parse(localStorage.getItem("user")),
            value: null,
            ubication: { lng: null, lat: null }
        }

        this.changeValue = this.changeValue.bind(this);
        this.loadInfoByOrder = this.loadInfoByOrder.bind(this);
    }
    
    componentDidMount(): void {
        document.body.style.backgroundColor = "rgb(249, 250, 252)";
        this.loadInfoByOrder();
    }

    changeValue(value: Dayjs | null) {
        this.setState({ value });
    }


    async loadInfoByOrder() {
        const responseOrder = await axios.get(`${env.API_URL}/Order/GetOrderByOrderId${window.location.search}`);
        const listProductByOrderId = await axios.get(`${env.API_URL}/Order/GetItemOrderByOrderId${window.location.search}`);

        for (const item of listProductByOrderId.data) {
            item.quantityLocal = item.quantity;
        }

        this.setState({ order: responseOrder.data, listProduct: listProductByOrderId.data });


        const isUbicationInMap = responseOrder.data.ubication.includes("maps-direction");
        if (!isUbicationInMap) return;

        const ubication = JSON.parse(responseOrder.data.ubication.split("maps-direction")[1]);
        this.setState({ ubication: ubication })
    }


    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Paper elevation={3}>
                    <Header />
                </Paper>


                <main className="grid-list-finish-order">
                    <div className="map-container">
                        <Map changeValueMarker={() => {}} />
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
                                        value={moment(this.state.order?.date).format("yyyy-MM-DD")}
                                        onChange={() => {}}
                                        readOnly
                                        renderInput={(params) => <TextField fullWidth {...params} />}
                                    />
                                </LocalizationProvider>

                                <TextField
                                    sx={{ marginTop: '30px' }}
                                    fullWidth
                                    label="Proporciona una dirección o selecciona una ubicación en el mapa."
                                    name="direction"
                                    id="direction"
                                    variant="outlined"

                                    

                                    multiline
                                    rows={4}
                                    InputProps={{
                                        readOnly: true,
                                        value: this.state.order?.ubication || ""
                                    }}
                                />

                                <Link to="/Order/MyOrders">
                                    <Button variant="contained" sx={{ display: 'flex', margin: 'auto', marginTop: '20px' }}>
                                        Regresar
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


export default OrderDetails;