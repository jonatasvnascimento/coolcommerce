import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NextLink from 'next/link';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { theme } from '../utils/styles';
// import { siteName } from '../utils/config';
import { Badge, CircularProgress } from '@material-ui/core';
import { useStyles } from '../utils/styles';
import { Store } from './Store';
import {
    CART_RETRIEVE_REQUEST,
    CART_RETRIEVE_SUCCESS,
} from '../utils/constants';
import getCommerce from '../utils/commerce';

//refatorar pelo o amor de Deus

const teste = "pk_test_23235567f97b287fbf41bd15f08ed86fd4659468c09cb"

export default function Layout({
    children,
    commercePublicKey,
    title = 'Coolshop',
}) {
    const classes = useStyles();

    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    useEffect(() => {
        const fetchCart = async () => {
            const commerce = getCommerce(teste);
            dispatch({ type: CART_RETRIEVE_REQUEST });
            const cartData = await commerce.cart.retrieve();
            dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData });
        };
        fetchCart();
    }, [])


    return (
        <React.Fragment>
            <Head>
                <meta charSet="utf-8" />
                <title>{`${title} - CoolCommerce`}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    className={classes.appBar}
                >

                    <Toolbar className={classes.toolbar}>
                        <NextLink href="/">
                            <Link
                                variant="h6"
                                color="inherit"
                                noWrap
                                href="/"
                                className={classes.toolbarTitle}
                            >
                                CoolCommerce
                            </Link>
                        </NextLink>

                        <nav>
                            <NextLink href="/cart">
                                <Link
                                    variant="button"
                                    color="textPrimary"
                                    href="/cart"
                                    className={classes.link}
                                >
                                    {cart.loading ? (
                                        <CircularProgress />
                                    ) : cart.data.total_items > 0 ? (
                                    <Badge badgeContent={cart.data.total_items} color="primary">
                                        Cart
                                    </Badge>
                                    ) : (
                                    'Cart'
                                    )}
                                </Link>
                            </NextLink>
                        </nav>

                    </Toolbar>

                </AppBar>

                <Container component="main" className={classes.main}>
                    {children}
                </Container>

                <Container maxWidth="md" component="footer">

                    <Box mt={5}>
                        <Typography variant="body2" color="textSecondary" align="center">
                            {'© '}
                            CoolCommerce 2021
                            {'.'}
                        </Typography>
                    </Box>

                </Container>

            </ThemeProvider>
        </React.Fragment>
    )

}