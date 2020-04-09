// Frameworks
import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => {
    return {
        primaryContainer: {
            background: 'linear-gradient(45deg, #F4BE96 30%, #F5EAD2 90%)',
        },
        primaryContent: {
            padding: '0 3rem',
        },

        heroContainer: {
            height: '70vh',
        },
        heroHeader: {
            height: '15vh',
            margin: '0',
            padding: '0 3rem',
        },
        heroFooter: {
            height: '15vh',
            margin: '0',
            padding: '0 3rem',
        },

        heroLogo: {
            display: 'inline-block',
            width: 140,
            padding: 10,
            color: '#212054',
            textDecoration: 'none',

            '& span': {
                display: 'block',
                marginTop: -10,
                textAlign: 'center',
                fontSize: '0.8em',
                textTransform: 'uppercase',
            },
        },
        heroLogoImg: {
            margin: '0 10px',
        },

        heroMenu: {
            // paddingRight: 50,
        },
        heroMenuLink: {
            padding: '0 20px',

            '&:-webkit-any-link': {
                color: theme.palette.primary.main,
                textDecoration: 'none',
            }
        },

        heading1: {

        },
        heading2: {

        },
        heading3: {

        },

        centerAlign: {
            textAlign: 'center',
        },

    };
});
