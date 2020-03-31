// Frameworks
import React from 'react';
import { navigate } from 'gatsby';
import clsx from 'clsx';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Layout Components
import Layout from '../layout/layout';
import SEO from '../components/seo';
import { GLOBALS } from '../utils/globals';

// Custom Theme
import useLandingStyles from '../layout/styles/landing.styles';


const DarkPaper = withStyles(theme => ({
    root: {
        width: '100%',
        color: '#eee',
        backgroundColor: theme.palette.background.paper,
    }
}))(Paper);


const StyledButton = withStyles(theme => ({
    root: {
        height: 60,
        padding: '0 30px',
        background: 'linear-gradient(45deg, #ff006c 30%, #ff417d 90%)',
        borderRadius: 7,
        border: 0,
        color: 'white',
        fontSize: '1.5rem',
        fontWeight: '100',

        [theme.breakpoints.down('sm')]: {
            fontSize: '1.15rem',
            padding: '0 20px',
        },
    },
    label: {
        textTransform: 'capitalize',
    },
}))(Button);




// Static Route
const IndexPage = () => {
    const classes = useLandingStyles();

    const _gotoApp = (evt) => {
        evt.preventDefault();
        navigate(`${GLOBALS.APP_ROOT}`);
    };

    return (
        <Layout noHeader={true}>
            <SEO />

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="stretch"
                className={classes.heroContainer}
            >
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.heroHeader}
                >
                    <Typography variant="h3" className={classes.centerAlign}>
                        Rent My Tent (Hero Section)
                    </Typography>

                </Grid>
            </Grid>

            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.heroMargin}
            >
                <StyledButton size="large" as="a" href="#" onClick={_gotoApp}>List a Tent</StyledButton>
            </Grid>

            <hr/>

            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
            >
                <DarkPaper className={clsx(classes.heroPadding, classes.heroMargin)} elevation={2}>
                    <Typography variant="h4">
                        How it works (section)
                    </Typography>
                    <p>
                        todo...
                    </p>
                </DarkPaper>
            </Grid>
        </Layout>
    );
};

export default IndexPage;
