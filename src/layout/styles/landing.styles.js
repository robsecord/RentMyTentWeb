// Frameworks
import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    primaryContainer: {
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0 20px 30px`,
        paddingTop: 0,

        [theme.breakpoints.down('sm')]: {
            maxWidth: 'none',
            width: '100%',
        },
    },
    heroContainer: {
        height: '100vh',
    },
    heroHeader: {
        margin: '0',
    },
    heroPadding: {
        padding: '30px',
    },
    heroMargin: {
        margin: '100px 0',
    },
    centerAlign: {
        textAlign: 'center',
    }
}));
