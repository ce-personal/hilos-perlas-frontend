import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Facebook as FacebookIcon } from '../../components/Icons/facebook';
import { Google as GoogleIcon } from '../../components/Icons/google';
import React from 'react';

import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


import env from '../../env';
import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const AccountLogin = (props) => {
    const navigate = useNavigate();

    const sendLogin = async (email, password) => {
        const action = `${env.API_URL}/Account/Client/LogIn`;
        const response = await axios.post(action + `?email=${email}&password=${password}`);
        const data = response.data;


        switch (data.codeError) {
            case 404: return formik.setErrors({ email: 'Email no encontrado' });
            case 401: return formik.setErrors({ password: 'Contraseña no valida' });
        
            default:
                if (data.isSuccess) {
                    window.localStorage.setItem("user", JSON.stringify(data.client));


                    debugger
                    const search = window.location.search.split('redirectTo=')[1];
                    if (search) return navigate(search);

                    return navigate("/")
                }
                break;
        }
    };




    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Debe ser un correo electrónico válido')
                .max(255)
                .required('Correo electronico es requerido'),

            password: Yup
                .string()
                .max(255)
                .required('Se requiere contraseña')
        }),

        onSubmit: (value) => sendLogin(value.email, value.password),
    });


    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {

            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
            );

            sendLogin(userInfo.data.email, userInfo.data.sub);
        },
        onError: errorResponse => console.log(errorResponse),
    });

    return (
        <React.Fragment>
            <title>Login | De hilos y perlas</title>



            <Box component="main" sx={{ alignItems: 'center', display: 'flex', flexGrow: 1, minHeight: '100%' }} >
                <Container maxWidth="sm">
                    <Link to="/">
                        <Button
                            startIcon={<ArrowBackIcon fontSize="small" />}
                        >
                            Regresar
                        </Button>
                    </Link>

                    <form onSubmit={formik.handleSubmit}>
                        <Box sx={{ my: 3 }}>
                            <Typography color="textPrimary" variant="h4">
                                Iniciar sessión
                            </Typography>
                            <Typography color="textSecondary" gutterBottom variant="body2">
                                Por favor inicie sesión en su cuenta. Si aún no tiene una cuenta, haga <Link style={{ textDecoration: 'underline' }} to={{ pathname: "/Account/Register", search: window.location.search }}>clic aquí</Link> para registrarse.
                            </Typography>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Button
                                    color="info"
                                    fullWidth
                                    startIcon={<FacebookIcon />}
                                    // onClick={() => formik.handleSubmit()}
                                    disabled={true}
                                    size="large"
                                    variant="contained"
                                >
                                    Facebook
                                </Button>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Button
                                    color="error"
                                    fullWidth
                                    onClick={() => googleLogin()}
                                    size="large"
                                    startIcon={<GoogleIcon />}
                                    variant="contained"

                                    disabled={true}

                                >
                                    Google
                                </Button>
                            </Grid>
                        </Grid>

                        <Box sx={{ pb: 1, pt: 3 }}>
                            <Typography align="center" color="textSecondary" variant="body1">
                                O inicie sesión con un correo electronico
                            </Typography>
                        </Box>

                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Correo electronico"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                            variant="outlined"
                            autoComplete='off'
                        />

                        <TextField
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            fullWidth
                            helperText={formik.touched.password && formik.errors.password}
                            label="Contraseña"
                            margin="normal"
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="password"
                            value={formik.values.password}
                            variant="outlined"
                        />

                        <Box sx={{ py: 2 }}>
                            <Button
                                color="primary"
                                disabled={formik.isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Iniciar sessión
                            </Button>
                        </Box>

                    </form>
                </Container>
            </Box>
        </React.Fragment>
    );
};

export default AccountLogin;