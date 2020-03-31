// Frameworks
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { navigate, useStaticQuery, graphql } from 'gatsby';

import './styles/reset.css';
import './styles/overrides.css';
import theme from './styles/root.theme';

// Material UI
import Box from '@material-ui/core/Box';

// Layout Components
import Header from '../components/header';

// Common
import { GLOBALS } from '../utils/globals';

// Custom Theme
import useLandingStyles from '../layout/styles/landing.styles';


// Layout Wrapper
const Layout = ({children, noHeader}) => {
    const classes = useLandingStyles();
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    const _goHome = () => { navigate(GLOBALS.APP_ROOT) };

    return (
        <ThemeProvider theme={theme}>
            {
                !noHeader && (
                    <Header siteTitle={data.site.siteMetadata.title} onClick={_goHome}/>
                )
            }
            <div className={classes.primaryContainer}>
                <main>{children}</main>
                <footer>
                    <Box mt={4}>
                        &copy; {new Date().getFullYear()}, Rent My Tent
                    </Box>
                </footer>
            </div>
        </ThemeProvider>
    );
};

Layout.propTypes = {
    children: PropTypes.array.isRequired,
    noHeader: PropTypes.bool,
};

Layout.defaultProps = {
    noHeader: false,
};

export default Layout;
