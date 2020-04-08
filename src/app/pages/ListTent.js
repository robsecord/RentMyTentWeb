// Frameworks
import React, { useContext } from 'react';
import UseAnimations from 'react-useanimations';

// Material UI
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

// App Components
import SEO from '../../common/seo';
import ListingWizard from '../components/listing/ListingWizard';
import RegisterMember from '../components/registration/RegisterMember';
import { ContractHelpers } from '../blockchain/contract-helpers';
import { AppTabs } from '../components/AppTabs';

// Data Context for State
import { RootContext } from '../stores/root.store';
import { WalletContext } from '../stores/wallet.store';
import { TransactionContext } from '../stores/transaction.store';

// Custom Styles
import useRootStyles from '../layout/styles/root.styles';


// List-Tent Route
const ListTent = ({ location }) => {
    const classes = useRootStyles();

    const [ rootState ] = useContext(RootContext);
    const { isMember } = rootState;

    const [, txDispatch ] = useContext(TransactionContext);

    const [ walletState ] = useContext(WalletContext);
    const { allReady, connectedAddress } = walletState;

    const handleSubmit = async (formData) => {
        const options = {
            txDispatch,
            from: connectedAddress,
            tokenData: formData,
        };
        await ContractHelpers.registerTent(options);
    };

    const _getWarningBox = (warningMsg) => {
        return (
            <Alert
                variant="outlined"
                severity="warning"
                icon={<UseAnimations animationKey="alertTriangle" size={24} />}
            >
                {warningMsg}
            </Alert>
        );
    };

    const _getNonMemberSection = () => {
        return (
            <>
                {_getWarningBox('You must be a Registered Member in order to List Tents!')}
                <Box pt={3}>
                    <RegisterMember elevation={2} />
                </Box>
            </>
        );
    };

    const _getContent = () => {
        return (
            <form autoComplete={'off'}>
                <ListingWizard
                    onSubmitForm={handleSubmit}
                />
            </form>
        );
    };

    return (
        <>
            <SEO title={'List My Tent'} />
            <AppTabs location={location} />

            <Typography
                variant={'h5'}
                component={'h3'}
                className={classes.pageHeader}
            >
                List My Tent!
            </Typography>

            {
                !allReady
                    ? _getWarningBox('You must connect your account in order to List Tents!')
                    : (
                        isMember
                            ? _getContent()
                            : _getNonMemberSection()
                    )
            }
        </>
    )
};

export default ListTent;
