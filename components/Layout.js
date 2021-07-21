import { AppBar, Box, Container, CssBaseline, Link, ThemeProvider, Toolbar, Typography,H } from '@material-ui/core'
import NextLink from 'next/link';
import Head from 'next/head'
import React from 'react';
import { theme, useStyles } from '../utils/styles'

export default function Layout({
    children,
    commercePublicKey,
    title = 'CoolCommerce',
}) {

    const classes = useStyles()

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
                                    Carrinho
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