import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IPropTableProductOrder } from "../../../utils/interface/components/IOrder";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },

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

class TableProductOrder extends React.Component<IPropTableProductOrder> {
    render(): React.ReactNode {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: '100%' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Nombre</StyledTableCell>
                            <StyledTableCell align="center">Precio</StyledTableCell>
                            <StyledTableCell align="right">Cantidad</StyledTableCell>
                            <StyledTableCell align="right">Total</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.listProduct.map((row) => (
                            <StyledTableRow
                                key={row.product.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" align="left">
                                    <Link to={`/Product/Details?productId=${row.product.id}`} style={{ color: 'black' }}>
                                        {row.product.name}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="center">C$ {row.product.price}</StyledTableCell>
                                <StyledTableCell align="right"> {row.quantityLocal}</StyledTableCell>
                                <StyledTableCell align="right">C$ {row.quantityLocal * row.product.price}</StyledTableCell>
                            </StyledTableRow>
                        ))}

                        <TableRow>
                            <TableCell colSpan={2} />
                            <TableCell colSpan={1} align="right">Total (sin envio): </TableCell>
                            <TableCell align="right">C$ {this.props.listProduct.map(a => a.product.price * a.quantityLocal).reduce((a, b) => a + b, 0)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default TableProductOrder;