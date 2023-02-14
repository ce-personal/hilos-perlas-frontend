import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React from "react";
import Header from "../../../components/Header/Header";
import env from "../../../env";
import { IPropsMyOrders, IStateMyOrders } from "../../../utils/interface/components/IOrder";

import moment from "moment";
import { EStatus } from "../../../utils/interface/shop/IOrder";
import { Link } from "react-router-dom";

import "./MyOrders.scss";


class MyOrders extends React.Component<IPropsMyOrders, IStateMyOrders> {
    constructor(props: any) {
        super(props);

        this.state = {
            listOrders: [],
            user: JSON.parse(localStorage.getItem("user"))
        }


        this.loadListOrder = this.loadListOrder.bind(this);
        
        (window as any).reloadMyOrders = () => this.loadListOrder();
    }


    componentDidMount(): void {
        this.loadListOrder();

        document.body.style.backgroundColor = "rgb(249, 250, 252)";
    }

    async loadListOrder() {
        const response = await axios.get(`${env.API_URL}/Order/GetListOrderByClientId?clientId=${this.state.user.id}`);
        this.setState({ listOrders: response.data });
    }

    render(): React.ReactNode {
        return (
            <React.Fragment>
                <Paper elevation={3}>
                    <Header />
                </Paper>

                <div className="container list-my-orders" style={{ marginTop: '50px' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No pedido</TableCell>
                                    <TableCell align="left">Nombre</TableCell>
                                    <TableCell align="left">Creado el </TableCell>
                                    <TableCell align="left">Entrega</TableCell>
                                    <TableCell align="left">Estado</TableCell>
                                    <TableCell align="left"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.listOrders.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                #{row.consecutive}
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="left">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">{moment(row.date).format("DD/MM/yyyy")}</TableCell>
                                            <TableCell align="left">{moment(row.deliveryDate).format("DD/MM/yyyy")}</TableCell>
                                            <TableCell align="left">{EStatus[row.status]}</TableCell>
                                            <TableCell align="left">
                                                <Link to={`/Order/Details?orderId=${row.id}`}>
                                                    <Button variant="outlined">Ver detalle</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </React.Fragment>
        )
    }
}

export default MyOrders;