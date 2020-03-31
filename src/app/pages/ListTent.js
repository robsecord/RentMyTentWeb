// Frameworks
import React, { useState, useEffect, useContext } from 'react';
import UseAnimations from 'react-useanimations';
import * as _ from 'lodash';

// Material UI
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';

// App Components
import SEO from '../../components/seo';
import { AppTabs } from '../components/AppTabs';

// Data Context for State
import { WalletContext } from '../stores/wallet.store';

// Custom Styles
import useRootStyles from '../layout/styles/root.styles';


// List-Tent Route
const ListTent = ({ location }) => {
    const classes = useRootStyles();
    const [ walletState ] = useContext(WalletContext);
    const { allReady, connectedAddress } = walletState;

    const _getContent = () => {
        if (!allReady) {
            return (
                <Alert
                    variant="outlined"
                    severity="warning"
                    icon={<UseAnimations animationKey="alertTriangle" size={24} />}
                >
                    You must connect your account in order to Mint Particles!
                </Alert>
            );
        }

        return (
            <Typography variant={'body1'} component={'p'}>
                todo..
            </Typography>
        );
    };

    return (
        <>
            <SEO title={'List a Tent'} />
            <AppTabs location={location} />

            <Typography
                variant={'h5'}
                component={'h3'}
                className={classes.pageHeader}
            >
                List a Tent!
            </Typography>

            {_getContent()}
        </>
    )
};

export default ListTent;
