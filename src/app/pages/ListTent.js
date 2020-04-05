// Frameworks
import React, { useState, useEffect, useContext } from 'react';
import UseAnimations from 'react-useanimations';
import * as _ from 'lodash';

// Material UI
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';

// App Components
import SEO from '../../components/seo';
import ListingWizard from '../components/listing/ListingWizard';
import LoadingModal from '../components/LoadingModal';
import Transactions from '../blockchain/transactions';
import { ContractHelpers } from '../blockchain/contract-helpers';
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

    const [ isSubmitting, setSubmitting ] = useState(false);
    const [ txData, setTxData ] = useState({});
    const [ loadingProgress, setLoadingProgress ] = useState('');

    useEffect(() => {
        if (isSubmitting && !_.isEmpty(txData)) {
            const { transactionHash } = txData;
            console.log('Create - transaction sent;');
            console.log('  txData', txData);

            // dFuse - watch transaction
            (async () => {
                const transactions = Transactions.instance();
                await transactions.streamTransaction({transactionHash});
            })();

            setLoadingProgress('Transaction created, monitoring has begun in the background...');
            setTimeout(() => {
                // All Done, clean up
                setSubmitting(false);
                setTxData({});
            }, 3000);
        }
    }, [isSubmitting, txData, setSubmitting, setTxData]);

    const _handleError = (errorMsg) => {
        setLoadingProgress(errorMsg);
        setTimeout(() => {
            setSubmitting(false);
        }, 3000);
    };

    const handleSubmit = async (formData) => {
        let txReceipt;
        try {
            setSubmitting(true);

            const options = {
                from: connectedAddress,
                tokenData: formData,
                onProgress: setLoadingProgress,
            };

            const response = await ContractHelpers.registerTent(options);
            const {tx, args, transactionHash} = response;
            txReceipt = transactionHash;
            setTxData({transactionHash, params: {tx, args}, type: 'RegisterTent'});
            return true;
        }
        catch (err) {
            if (/gateway timeout/i.test(err)) {
                _handleError('Failed to save Image and/or Metadata to IPFS!');
            } else if (_.isUndefined(txReceipt)) {
                _handleError('Transaction cancelled by user.');
                console.info(err);
            } else {
                _handleError('An unexpected error has occurred!');
                console.error(err);
            }
            return false;
        }
    };

    const _getContent = () => {
        if (!allReady) {
            return (
                <Alert
                    variant="outlined"
                    severity="warning"
                    icon={<UseAnimations animationKey="alertTriangle" size={24} />}
                >
                    You must connect your account in order to Register Tents!
                </Alert>
            );
        }

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

            {_getContent()}

            <LoadingModal
                title={'Registering Tent!'}
                progress={loadingProgress}
                isOpen={isSubmitting}
            />
        </>
    )
};

export default ListTent;
