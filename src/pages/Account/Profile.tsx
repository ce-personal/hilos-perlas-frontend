import { Box, Container, Grid, Typography, Snackbar, Paper } from '@mui/material';
import { AccountProfileEdit } from './edit/account-profile';
import { AccountProfileDetails } from './edit/account-profile-details';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import env from '../../env';
import { useEffect, useState } from 'react';

import MuiAlert from '@mui/material/Alert';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const AccountProfile = () => {
    const [saved, setSaved] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            email: '',
            phoneNumber: "",
            fileString: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .max(255)
                .required('Nombre es un campo requerido')
                .min(3, "Debe tener un mínimo de 3 caracteres."),
            email: Yup  
                .string()
                .email("Debe ser un correo valido")
                .required("Email es un campo requerido"),
        }),

        onSubmit: (value) => sendAccount(value)
    });

    const init = async () => {
        const client = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(`${env.API_URL}/Account/Client/GetProfileById?clientId=${client.id}`);
        
        formik.setValues(response.data);
    };

    const sendAccount = async (value) => {
        const formData = new FormData();
        const clientId = JSON.parse(localStorage.getItem("user")).id;
        const image: HTMLImageElement = document.querySelector(".image-avatar img");
        
        formData.append("id", clientId);
        formData.append("fileString", image.src);
    
        for (const key in value) {
            formData.append(key, value[key]);
        }
        
        
        await axios.post(`${env.API_URL}/Account/Client/PostProfileByEdit`, formData);
        alert("Datos actualizados.");

        const action = `${env.API_URL}/Account/Client/LogIn`;
        const response = await axios.post(action + `?email=${value.email}&password=${value.password}`);

        window.localStorage.setItem("user", JSON.stringify(response.data.client))

        navigate("/")
    };

/* eslint-disable */
    useEffect(() => {
        init();

        document.body.style.backgroundColor = "#f9fafc";
    }, [])

    return (
        <main style={{ backgroundColor: "#F9FAFC" }}>
            <Paper elevation={3}>
                <Header />
            </Paper>

            <Snackbar open={saved} onClose={() => setSaved(false)} anchorOrigin={{ horizontal: "center", vertical: "bottom" }}>
                <Alert severity="success">Los datos se actualizaron correctamente!</Alert>
            </Snackbar>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Cuenta
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <AccountProfileEdit form={formik} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <AccountProfileDetails form={formik} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </main>
    )
}

export default AccountProfile;
