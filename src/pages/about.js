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

const About = () => {
    const classes = useStandardStyles();
    return (
        <Layout>
            <SEO title="About" />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
                className={classes.contentContainer}
            >
                <Paper elevation={2}>
                    <Box py={2} px={3}>
                        <h1>About Rent My Tent</h1>
                        <hr/>

                        <h3>Maximising the reuse of tents</h3>
                        <p>We’re baking economic incentives into online marketplaces to enable circular economies.</p>

                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                            spacing={5}
                        >
                            <Grid item xs={12} md={6}>
                                <h3>Problem</h3>
                                <p>Often people purchase tents with a single-use in mind. This means we have many tents, yet little utility.</p>
                                <p>In the UK its a particular problem at music festivals where 250,000 tents get left behind every year. This becomes nearly 900 tonnes of plastic waste, most of which ends up in landfill.</p>
                                <p>Tents are multi-material - nylon, metal, plastic etc., so practically impossible to recycle. The average tent weighs 3.5kg and is mostly made of plastic - the equivalent of 8750 straws.</p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <h3>Solution</h3>
                                <p>An online marketplace for people to hire tents. People can sell their tent into the marketplace, their tent is represented by a Non-fungible token and once the first transaction occurs (between seller & hirer) the tent will always be available for hire. Except when its being used during a rental period.</p>

                                <h4>Perpetual Deposit Return Scheme</h4>
                                <p>We’ve taken the same incentive that people have to return bottles for recycling and applied it to the reuse of tents.</p>
                                <p>We call this a Perpetual Deposit Return Scheme. Because its always the next tent hirer along that refunds the current tent hirers deposit.</p>
                                <p>In other words, every time the tent is hired the new deposit unlocks the previous one. By locking up deposits until the next tent hirer comes along we can ensure hired tents are taken good care of.</p>
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

export default About;
