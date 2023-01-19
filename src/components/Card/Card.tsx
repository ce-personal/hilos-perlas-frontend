// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import Label from './Label/Index';

// firebase
import { useEffect, useState } from 'react';



// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    borderRadius: '8px 8px 0px 0px'
});


const StyledHoverProduct = styled("div")({
    "&:not(.isEditable)": {
        position: 'relative',
        transition: '.5s',
        
        "&:hover": {
            "&:before": {
                content: '""',
                backgroundColor: '#00000085',
                position: 'absolute',
                height: '100%',
                width: '100%',
                zIndex: 1,
                cursor: 'pointer',
                borderRadius: '8px 8px 0px 0px',
            },
        
            "&:after": {
                content: '"Subir imagen"',
                position: 'absolute',
                zIndex: 3,
                color: 'white',
                padding: '8px 30px',
                border: '1px solid #fff',
                borderRadius: '8px',
                left: 'calc(50% - 80px)',
                top: 'calc(50% - 21px)',
                cursor: 'pointer'
            }
        }
    }
});



// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
    const { name, price, status, isEditable } = product.product;

    const [cover, setCover] = useState();
    const [loading, setLoading] = useState(false);

    const init = () => {        
        if (loading) return;
        if (product.files.length > 0) setLoading(true);

        const coverPrincipal = product.files.find(a => a.isItMainFile)?.stringFile; 
        setCover(coverPrincipal);
    };


    useEffect(() => {
        init();
    });

    return (
        <Card sx={{ overflow: 'initial' }}>
            <div style={{ position: 'relative' }}>
                <StyledHoverProduct className={!isEditable ? 'isEditable' : ''}>
                    <Box sx={{ pt: '100%', position: 'relative' }}>
                        {status && (
                            // @ts-ignore
                            <Label
                                variant="filled"
                                color={(status === 'sale' && 'error') || 'info'}
                                sx={{
                                    zIndex: 9,
                                    top: 16,
                                    right: 16,
                                    position: 'absolute',
                                    textTransform: 'uppercase',
                                }}
                            >
                                {status}
                            </Label>
                        )}

                        <StyledProductImg alt={name} src={cover} className="principal-image" />
                    </Box>
                </StyledHoverProduct>
            </div>

            <Stack spacing={2} sx={{ p: 3 }}>
                <Link color="inherit" underline="hover">
                    <Typography variant="subtitle2" noWrap>
                        {name}
                    </Typography>
                </Link>

                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        C$ {price}
                    </Typography>

                    <Button variant='contained'>
                        Comprar
                    </Button>
                </Stack>
            </Stack>
        </Card>
    );
}