import { Button, ImageList, ImageListItem, Paper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import env from "../../env";
import { IPropProductDetail, IStateProductDetail } from "../../utils/interface/components/IProduct";

import "./Shop/Shop.scss";



const ProductDetail = () => {
    const [product, setProduct]:  any = useState({ product: {}, files: [] });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${env.API_URL}/Product/GetProductById${window.location.search}`)
            .then(a => setProduct(a.data));
    }, [])

    return (
        <React.Fragment>
            <Paper elevation={4}>
                <Header />
            </Paper>


            <main className="shop" style={{ marginTop: '50px' }}>
                <main className='title'>
                    <div className="title-image">
                        <img src="https://cdn.dribbble.com/users/7281356/avatars/small/01fa6110318a90e4e535eaf97aadc76d.jpg?1650772828" alt="" />

                        <div className="content">
                            <h3>{product?.product.name}</h3>
                            <p>Producto de calidad verificada ✔️</p>
                        </div>
                    </div>
                </main>

                <div className="files">
                    <div className="files-main">
                        <ImageList variant="masonry" cols={product?.files.length > 1 ? 2 : 1} gap={8}>
                            {(product?.files || []).map((item) => (
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
                    <h4>{product?.product.description || "Hermosa prenda preciosa para cualquier tipo de persona hecha a su medida y detalle"}</h4>
                </div>
            </main>

            <div onClick={() => navigate(-1)} style={{ display: 'flex', margin: 'auto', marginTop: '50px', paddingBottom: '50px', justifyContent: 'center' }}>
                
                <Button variant="contained" sx={{ minWidth: '120px' }}>
                    Regresar
                </Button>
            </div>
        </React.Fragment>
    ) 
};

export default ProductDetail;