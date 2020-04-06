// Frameworks
import React, { useState, useContext } from 'react';
import UseAnimations from 'react-useanimations';
import * as _ from 'lodash';

// Material UI
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';

// App Components
import SEO from '../../components/seo';
import { AppTabs } from '../components/AppTabs';
import DisplayContractValue from '../components/DisplayContractValue';
import RegisterMember from '../components/registration/RegisterMember';

// Data Context for State
import { RootContext } from '../stores/root.store';
import { WalletContext } from '../stores/wallet.store';

// Custom Styles
import useRootStyles from '../layout/styles/root.styles';


// Member Route
const MemberProfile = ({ location }) => {
    const classes = useRootStyles();

    const [ rootState ] = useContext(RootContext);
    const { isMember, memberName } = rootState;

    const [ walletState ] = useContext(WalletContext);
    const { allReady, connectedAddress } = walletState;

    const _getNonMemberSection = () => {
        return (
            <RegisterMember elevation={2} />
        );
    };

    const _getMemberSection = () => {
        return (
            <Typography variant={'body1'} component={'p'}>
                [Member-only Section]<br/>
                Member: {memberName}<br/>
                List Status of Tents in Custody<br/>
                List Profits made from Tents
            </Typography>
        );
    };

    const _getContent = () => {
        if (!allReady) {
            return (
                <Alert
                    variant="outlined"
                    severity="warning"
                    icon={<UseAnimations animationKey="alertTriangle" size={24} />}
                >
                    You must connect your account in order to view your profile!
                </Alert>
            );
        }

        return (
            <>
                <Typography variant={'body1'} component={'p'}>
                    Address: {connectedAddress}
                </Typography>

                <Typography variant={'body1'} component={'div'}>
                    {
                        !_.isEmpty(connectedAddress) && (
                            <>
                                isMember:&nbsp; {isMember.toString()}
                            </>
                        )
                    }
                </Typography>

                {
                    isMember
                        ? _getMemberSection()
                        : _getNonMemberSection()
                }
            </>
        );
    };

    return (
        <>
            <SEO title={'Membership'} />
            <AppTabs location={location} />

            <Typography
                variant={'h5'}
                component={'h3'}
                className={classes.pageHeader}
            >
                Membership
            </Typography>

            {_getContent()}
        </>
    )
};

export default MemberProfile;
