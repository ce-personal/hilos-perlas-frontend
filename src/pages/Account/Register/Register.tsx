import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import env from '../../../env';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import "./Register.scss";

const AccountRegister = () => {
    const navigate = useNavigate();

    const sendRegister = async (value: any) => {
        const action = `${env.API_URL}/Account/Client/Register`;
        const formData = new FormData();

        for (const key in value) {
            formData.append(key, value[key]);
        }
        
        const response = await axios.post(action, formData);

        if (response.data.isSuccess) {
            window.localStorage.setItem("user", JSON.stringify(response.data.client));

            const search = window.location.search.split('redirectTo=')[1];
            if (search) return navigate(search);

            return navigate("/");
        }


        switch (response.data.codeError) {
            case 400: return formik.setErrors({ email: 'Correo ya usado' })
    
            default:
                break;
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            lastName: '',
            password: '',
            phoneNumber: ''
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email('Debe ser un correo electrónico válido')
                .max(255)
                .required(
                    'Se requiere un email'),
            name: Yup
                .string()
                .max(255)
                .min(3, 'Debe contener más de 3 caracteres')
                .required('Se requiere un nombre valido'),
            password: Yup
                .string()
                .max(255)
                .min(3, 'Debe contener más de 3 caracteres')
                .required('Se requiere una contraseña valida')
        }),
        onSubmit: sendRegister
    });
    
    return (
        <>
            <title>
                Agregar personal | De hilos y perlas
            </title>

            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%'
                }}
            >
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
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Generar una cuenta nueva
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Si ya tiene una cuenta, inicie sesión. De lo contrario, haga <Link to="/Account/Login" style={{ textDecoration: 'underline' }}>clic aquí</Link> para crear una cuenta nueva.
                            </Typography>
                        </Box>

                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    error={Boolean(formik.touched.name && formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                    fullWidth
                                    label="Nombre"
                                    margin="normal"
                                    name="name"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    variant="outlined"
                                />
                                
                            </Grid>
                            <Grid item md={6} xs={12} className="input-group-2">
                                <TextField
                                    error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                    fullWidth
                                    label="Apellido"
                                    margin="normal"
                                    name="lastName"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.lastName}
                                    variant="outlined"

                                />
                            </Grid>
                        </Grid>

                        <TextField
                            error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                            fullWidth
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            label="Numero telefonico"
                            margin="normal"
                            name="phoneNumber"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="phoneNumber"
                            value={formik.values.phoneNumber}
                            variant="outlined"
                        />

                        <TextField
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Dirección de email"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="email"
                            value={formik.values.email}
                            variant="outlined"
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
                                Guardar información
                            </Button>
                        </Box>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default AccountRegister;
