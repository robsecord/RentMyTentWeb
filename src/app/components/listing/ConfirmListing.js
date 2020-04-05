// Frameworks
import React, { useContext } from 'react';
import * as _ from 'lodash';

// App Components
import { GLOBALS } from '../../../utils/globals';

// Data Context for State
import { RootContext } from '../../stores/root.store';
import { WalletContext } from '../../stores/wallet.store';

// Material UI
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// Rimble UI
import NetworkIndicator from '@rimble/network-indicator';

// Custom Styles
import useRootStyles from '../../layout/styles/root.styles';

// Create Route
const ConfirmListing = ({ back, next }) => {
    const classes = useRootStyles();

    const [ rootState ] = useContext(RootContext);
    const { tentListingData } = rootState;

    const [ walletState ] = useContext(WalletContext);
    const { networkId } = walletState;

    const _handleSubmit = async evt => {
        evt.preventDefault();

        try {
            // Submit Form
            next(tentListingData);
        }
        catch (err) {
            console.error(err);
        }
    };

    return (
        <Box py={2}>
            <Grid container spacing={3} className={classes.gridRow}>
                <Grid item xs={12} sm={6}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={6}>
                            <Button
                                type="button"
                                variant="outlined"
                                size="large"
                                onClick={back}
                            >
                                back
                            </Button>
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        className={classes.gridRow}
                    >
                        <Grid item xs={6}>
                            <NetworkIndicator
                                currentNetwork={networkId}
                                requiredNetwork={_.parseInt(GLOBALS.CHAIN_ID, 10)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={_handleSubmit}
                            >
                                List My Tent
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
};

export default ConfirmListing;
