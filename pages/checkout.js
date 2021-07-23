import React, { useContext, useState } from 'react';
import { Alert } from '@material-ui/lab';
import Layout from '../components/Layout';
import { Store } from '../components/Store';
import {
    Button,
    Card,
    CircularProgress,
    Grid,
    List,
    ListItem,
    MenuItem,
    Select,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@material-ui/core';
import { useStyles } from '../utils/styles';
import { CART_RETRIEVE_SUCCESS } from '../utils/constants';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Router from 'next/router';
import getCommerce from '../utils/commerce';

const dev = process.env.NODE_ENV === 'development' || true; // remove "|| true" in production lemprar <<<<<<<<<<!!!!!!!!!!!!!!

function Checkout(props) {
    const classes = useStyles();

    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    // Customer details
    const [firstName, setFirstName] = useState(dev ? 'Jane' : '');
    const [lastName, setLastName] = useState(dev ? 'Doe' : '');
    const [email, setEmail] = useState(dev ? 'janedoe@email.com' : '');

    // Shipping details
    const [shippingName, setShippingName] = useState(dev ? 'Jane Doe' : '');
    const [shippingStreet, setShippingStreet] = useState(
        dev ? '123 Fake St' : ''
    );
    const [shippingPostalZipCode, setShippingPostalZipCode] = useState(
        dev ? '90089' : ''
    );
    const [shippingCity, setShippingCity] = useState(dev ? 'Los Angeles' : '');
    const [shippingStateProvince, setShippingStateProvince] = useState(
        dev ? 'AR' : ''
    );
    const [shippingCountry, setShippingCountry] = useState(dev ? 'GB' : '');
    const [shippingOption, setShippingOption] = useState({});

    // Payment details
    const [cardNum, setCardNum] = useState(dev ? '4242 4242 4242 4242' : '');
    const [expMonth, setExpMonth] = useState(dev ? '11' : '');
    const [expYear, setExpYear] = useState(dev ? '2023' : '');
    const [cvv, setCvv] = useState(dev ? '123' : '');
    const [billingPostalZipcode, setBillingPostalZipcode] = useState(
        dev ? '90089' : ''
    );

    return (
        <Layout commercePublicKey={props.commercePublicKey} title="Shopping Cart">
            {cart.loading ? (
                <CircularProgress />
            ) : cart.data.line_items.length === 0 ? (
                <Alert icon={false} severity="error">
                    Cart is empty. <Link href="/">Go shopping</Link>
                </Alert>
            ) : (
                <React.Fragment>
                    <Typography variant="h1" component="h1">
                        Shopping Cart
                    </Typography>
                    <Slide direction="up" in={true}>
                        <Grid container spacing={1}>
                            <Grid item md={9}>
                                <Grid container>
                                    <TableContainer>
                                        <Table aria-label="Orders">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Name</TableCell>
                                                    <TableCell align="right">Quantity</TableCell>
                                                    <TableCell align="right">Price</TableCell>
                                                    <TableCell align="right">Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {cart.data.line_items.map((cartItem) => (
                                                    <TableRow key={cartItem.name}>
                                                        <TableCell component="th" scope="row">
                                                            {cartItem.name}
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Select
                                                                labelId="quanitity-label"
                                                                id="quanitity"
                                                                onChange={(e) =>
                                                                    quantityChangeHandler(
                                                                        cartItem,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                value={cartItem.quantity}
                                                            >
                                                                {[...Array(20).keys()].map((x) => (
                                                                    <MenuItem key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            {cartItem.price.formatted_with_symbol}
                                                        </TableCell>

                                                        <TableCell align="right">
                                                            <Button
                                                                onClick={() => removeFromCartHandler(cartItem)}
                                                                variant="contained"
                                                                color="secondary"
                                                            >
                                                                x
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <Card className={classes.card}>
                                    <List>
                                        <ListItem>
                                            <Grid container>
                                                <Typography variant="h6">
                                                    Subtotal: {cart.data.subtotal.formatted_with_symbol}
                                                </Typography>
                                            </Grid>
                                        </ListItem>
                                        <ListItem>
                                            {cart.data.total_items > 0 && (
                                                <Button
                                                    type="button"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={proccessToCheckout}
                                                >
                                                    Proceed to checkout
                                                </Button>
                                            )}
                                        </ListItem>
                                    </List>
                                </Card>
                            </Grid>
                        </Grid>
                    </Slide>
                </React.Fragment>
            )}
        </Layout>
    );
}
export default dynamic(() => Promise.resolve(Cart), {
    ssr: false,
});