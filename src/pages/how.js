// Frameworks
import React from 'react';
import { Link } from 'gatsby';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// App Components
import Layout from '../layout/layout';
import SEO from '../common/seo';

// Custom Theme
import useStandardStyles from '../layout/styles/standard.styles';

const How = () => {
    const classes = useStandardStyles();
    return (
        <Layout>
            <SEO title="How it works" />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
                className={classes.contentContainer}
            >
                <Paper elevation={2}>
                    <Box py={2} px={3}>
                        <h1>How it works</h1>
                        <hr/>

                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                            spacing={5}
                        >
                            <Grid item xs={12} md={6}>
                                <h3>For Sellers</h3>
                                <ul className={classes.bareList}>
                                    <li>List your tent
                                        <ul><li><em>Include some photos and a description.</em></li></ul>
                                    </li>
                                    <li>Sell your tent
                                        <ul><li><em>Get money for your idle tent.</em></li></ul>
                                    </li>
                                    <li>Save the planet
                                        <ul><li><em>When your tent is taken off your hands it will always be available here for rent.</em></li></ul>
                                    </li>
                                </ul>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <h3>For Renters</h3>
                                <ul className={classes.bareList}>
                                    <li>Find a tent to rent
                                        <ul><li><em>Choose from a wide range of good-quality used tents.</em></li></ul>
                                    </li>
                                    <li>Save money
                                        <ul><li><em>Pay for the rental and a refundable deposit.</em></li></ul>
                                    </li>
                                    <li>Select rental period
                                        <ul><li><em>Choose how long you want to keep the tent.</em></li></ul>
                                    </li>
                                    <li>Take care of the tent
                                        <ul><li><em>Once the rental period is up you’re the custodian until the next renter comes along.</em></li></ul>
                                    </li>
                                </ul>
                            </Grid>
                        </Grid>

                        <hr/>
                        <Link to="/">Go back to the homepage</Link>
                    </Box>
                </Paper>
            </Grid>
        </Layout>
    );
};

export default How;
