// Frameworks
import React from 'react';

// Material UI
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => {
    return {
        contentContainer: {
            minHeight: '70vh',
        },

        bareList: {
            '&, & ul': {
                listStyleType: 'none',
            },
        },

        centerAlign: {
            textAlign: 'center',
        },
    };
});
