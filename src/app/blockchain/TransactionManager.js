// Frameworks
import React, { useEffect, useContext } from 'react';
import * as _ from 'lodash';

// App Components
import Transactions from '../blockchain/transactions';
import TxStreamView from '../components/TxStreamView';

// Data Context for State
import { TransactionContext } from '../stores/transaction.store';


const TransactionManager = ({  }) => {
    const [ txState, txDispatch] = useContext(TransactionContext);
    const { submittedTransaction } = txState;

    useEffect(() => {
        if (!_.isEmpty(submittedTransaction)) {
            // dFuse - watch transaction
            const { transactionHash } = submittedTransaction;
            (async () => {
                const transactions = Transactions.instance();
                await transactions.streamTransaction({transactionHash});
            })();

            txDispatch({
                type: 'STREAM_TRANSITION', payload: {
                    streamTransitions: [{to: 'CREATE', transition: 'TX_INIT'}]
                }
            });
        }
    }, [submittedTransaction]);

    return (
        <TxStreamView />
    )
};

export default TransactionManager;
