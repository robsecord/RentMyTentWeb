// Frameworks
import React, { useContext } from 'react';
import UseAnimations from 'react-useanimations';

// Material UI
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// App Components
import SEO from '../../common/seo';
import { AppTabs } from '../components/AppTabs';

// Data Context for State
import { WalletContext } from '../stores/wallet.store';

// Custom Styles
import useRootStyles from '../layout/styles/root.styles';


// Main Route
const ViewTents = ({ location }) => {
    const classes = useRootStyles();

    const [ walletState ] = useContext(WalletContext);
    const { allReady } = walletState;

    const _getContent = () => {
        return (
            <>
                {
                    !allReady && (
                        <Alert
                            variant="outlined"
                            severity="warning"
                            icon={<UseAnimations animationKey="alertTriangle" size={24} />}
                        >
                            You must connect your account in order to Rent Tents!
                        </Alert>
                    )
                }
                <Box py={3}>
                    <Typography variant={'h6'} component={'p'}>
                        Coming Soon!
                    </Typography>

                    <Typography variant={'body1'} component={'p'}>
                        You might find Tents available on 3rd-party Marketplaces such as&nbsp;
                        <Link href="https://opensea.io/" target="_new">OpenSea</Link>
                    </Typography>
                </Box>
            </>
        );
    };

    return (
        <>
            <SEO title={'Rent a Tent'} />
            <AppTabs location={location} />

            <Typography
                variant={'h5'}
                component={'h3'}
                className={classes.pageHeader}
            >
                Rent a Tent!
            </Typography>

            {_getContent()}
        </>
    )
};

export default ViewTents;
