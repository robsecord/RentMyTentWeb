// Frameworks
import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => {
    return {
        testBlock: {
            display: 'block',
            position: 'absolute',
            top: 1, left: 1,
            width: 100,
            height: '1.4em',
            fontSize: '0.9em',
            textAlign: 'center',
            background: 'white',
            border: '1px solid #444',

            '&:after': {
                display: 'block',
                position: 'absolute',
                top: 1, left: 1,
                width: 96,
                content: '"?"',

                [theme.breakpoints.up('xs')]: {
                    content: '"up-xs"',
                },
                [theme.breakpoints.up('sm')]: {
                    content: '"up-sm"',
                },
                [theme.breakpoints.up('md')]: {
                    content: '"up-md"',
                },
                [theme.breakpoints.up('lg')]: {
                    content: '"up-lg"',
                },
            },
        },

        primaryContainer: {
            padding: '0 1rem',
            background: 'linear-gradient(45deg, #F4BE96 30%, #F5EAD2 90%)',

            [theme.breakpoints.up('sm')]: {
                padding: '0 2rem',
            },
        },
        primaryContent: {
            padding: '0 1rem',

            [theme.breakpoints.up('sm')]: {
                padding: '0 2rem',
            },

            [theme.breakpoints.up('md')]: {
                padding: '0 3rem',
            },
        },

        heroContainer: {
            height: '70vh',
            backgroundColor: 'transparent',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
            backgroundSize: 'auto',

            [theme.breakpoints.down('md')]: {
                backgroundSize: '50%',
            },
        },
        heroHeader: {
            height: '15vh',
            margin: '0',
            padding: '0 1rem',

            [theme.breakpoints.up('sm')]: {
                padding: '0 2rem',
            },

            [theme.breakpoints.up('md')]: {
                padding: '0 3rem',
            },
        },
        heroFooter: {
            height: '15vh',
            margin: '0',
            padding: '0 1rem',

            [theme.breakpoints.up('sm')]: {
                padding: '0 2rem',
            },

            [theme.breakpoints.up('md')]: {
                padding: '0 3rem',
            },
        },

        heroLogo: {
            display: 'inline-block',
            width: 120,
            padding: '5px 10px',
            color: '#212054',
            textDecoration: 'none',

            [theme.breakpoints.up('sm')]: {
                width: 140,
                padding: '5px 10px',
            },

            [theme.breakpoints.up('md')]: {
                padding: '20px 10px',
            },

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
            padding: '0 10px',

            '&:-webkit-any-link': {
                color: theme.palette.primary.main,
                textDecoration: 'none',
            },

            [theme.breakpoints.up('sm')]: {
                padding: '0 15px',
            },

            [theme.breakpoints.up('md')]: {
                padding: '0 20px',
            },
        },

        heading1: {
            fontSize: '1.6rem',
            fontWeight: '700',
            marginBottom: '0.5rem',

            [theme.breakpoints.up('sm')]: {
                fontSize: '2.4rem',
                padding: '0 15px',
            },

            [theme.breakpoints.up('md')]: {
                fontSize: '3rem',
                padding: '0 20px',
            },
        },
        heading2: {
            color: '#356989',
            fontSize: '1.6rem',
            fontWeight: '700',
            marginBottom: '0.75rem',

            [theme.breakpoints.up('sm')]: {
                fontSize: '2.4rem',
                padding: '0 15px',
            },

            [theme.breakpoints.up('md')]: {
                fontSize: '3rem',
                padding: '0 20px',
            },
        },
        heading3: {
            fontSize: '1.2rem',

            [theme.breakpoints.up('sm')]: {
                fontSize: '1.6rem',
                padding: '0 15px',
            },

            [theme.breakpoints.up('md')]: {
                fontSize: '2rem',
                padding: '0 20px',
            },
        },

        heroInputContainer: {
            textAlign: 'right',

            [theme.breakpoints.down('xs')]: {
                textAlign: 'left',
            },
        },

        centerAlign: {
            textAlign: 'center',
        },

    };
});
