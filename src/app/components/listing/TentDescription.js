// Frameworks
import React, { useState, useEffect, useContext } from 'react';
import { Buffer } from 'buffer';
import Img from 'gatsby-image';
import * as _ from 'lodash';

// Data Context for State
import { RootContext } from '../../stores/root.store';
import { WalletContext } from '../../stores/wallet.store';

// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


import useRootStyles from '../../layout/styles/root.styles';
const useCustomStyles = makeStyles(theme => ({
    fileInputFieldset: {
        width: '85%',
    },
    fileInput: {
        display: 'none',
    },
    fileName: {
        display: 'inline-block',
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    fileNameLabel: {
        verticalAlign: 'middle',
    },
    tentImage: {
        maxWidth: '100%',
        maxHeight: 400,
        borderRadius: 5,
    }
}));


// Create Route
const TentDescription = ({ next }) => {
    const classes = useRootStyles();
    const customClasses = useCustomStyles();

    const [ rootState, rootDispatch ] = useContext(RootContext);
    const { connectionState, tentListingData } = rootState;

    const [ walletState ] = useContext(WalletContext);
    const { allReady, connectedAddress } = walletState;

    const [tentName,         setTentName]         = useState(tentListingData.name || '');
    const [tentDesc,         setTentDesc]         = useState(tentListingData.desc || '');
    const [tentCreator,      setTentCreator]      = useState(tentListingData.creator || '');
    const [tentImage,        setTentImage]        = useState(tentListingData.image || 'Upload Image of Tent *');
    const [tentImageBuffer,  setTentImageBuffer]  = useState(tentListingData.imageBuffer || null);
    const [tentImageBase64,  setTentImageBase64]  = useState(tentListingData.imageBase64 || null);
    const [formValidated,    setFormValidated]    = useState(false);

    const [isTentNameValid,    setTentNameValid]    = useState(true);
    const [isTentDescValid,    setTentDescValid]    = useState(true);
    const [isTentCreatorValid, setTentCreatorValid] = useState(true);
    const [isTentImageValid,   setTentImageValid]   = useState(true);

    useEffect(() => {
        if (allReady && _.isEmpty(tentCreator)) {
            setTentCreator(connectedAddress);
            setTentCreatorValid(!_.isEmpty(connectedAddress));
        }
    }, []);

    useEffect(() => {
        setFormValidated(_validateForm());

        const formData = _getFormData();
        rootDispatch({
            type    : 'UPDATE_LISTING_DATA',
            payload : formData
        });
    }, [
        connectionState,
        tentName,
        tentDesc,
        tentCreator,
        tentImage,
        tentImageBuffer,
        tentImageBase64,
    ]);

    const _getFormData = () => {
        return {
            name        : _.trim(tentName),
            desc        : _.trim(tentDesc),
            creator     : tentCreator,
            image        : tentImage,
            imageBuffer  : tentImageBuffer,
            imageBase64  : tentImageBase64,
        };
    };

    const _validateAll = () => {
        setTentNameValid(!_.isEmpty(tentName));
        setTentCreatorValid(!_.isEmpty(tentCreator));
        setTentImageValid(!_.isEmpty(tentImageBuffer));
        setTentDescValid(!_.isEmpty(tentDesc));
    };

    const _validateForm = () => {
        const conditions = [
            _.isEmpty(connectionState),
            !_.isEmpty(tentName),
            !_.isEmpty(tentDesc),
            !_.isEmpty(tentCreator),
            !_.isEmpty(tentImageBuffer),
        ];
        return _.every(conditions, Boolean);
    };

    const _cleanTentImageDisplay = (filename) => {
        return _.last(filename.split('\\'));
    };

    const _updateTentName = evt => {
        const value = evt.target.value;
        setTentName(value);
        setTentNameValid(!_.isEmpty(value));
    };

    const _updateTentCreator = evt => {
        const value = _.trim(evt.target.value);
        setTentCreator(value);
        setTentCreatorValid(!_.isEmpty(value));
    };

    const _updateTentImage = evt => {
        evt.preventDefault();
        evt.stopPropagation();

        const value = evt.target.value;
        const file = evt.target.files[0];
        if (_.isUndefined(file)) { return; }

        const fileExt = _.last(value.split('.'));
        setTentImage(value);
        setTentImageValid(!_.isEmpty(value));

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            const buffer = Buffer(reader.result);
            setTentImageBuffer(buffer);
            setTentImageBase64(`data:image/${fileExt};base64,${buffer.toString('base64')}`);
        };
    };

    const _updateTentDesc = evt => {
        const value = evt.target.value;
        setTentDesc(value);
        setTentDescValid(!_.isEmpty(value));
    };

    const _handleSubmit = async evt => {
        evt.preventDefault();
        if (!formValidated) {
            return _validateAll();
        }
        next();
    };

    return (
        <>
            <Box py={3}>
                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={6}>
                        <TextField
                            id="tentTypeName"
                            label="Name"
                            variant="outlined"
                            onChange={_updateTentName}
                            value={tentName}
                            fullWidth
                            required
                            error={!isTentNameValid}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="tentTypeCreator"
                            label="Creator"
                            variant="outlined"
                            onChange={_updateTentCreator}
                            value={tentCreator}
                            fullWidth
                            required
                            error={!isTentCreatorValid}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={12}>
                        <TextField
                            id="tentTypeDesc"
                            label="Full Description"
                            variant="outlined"
                            onChange={_updateTentDesc}
                            value={tentDesc}
                            multiline
                            rows="4"
                            fullWidth
                            required
                            error={!isTentDescValid}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={12} sm={6}>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <FormControl
                                required
                                error={!isTentImageValid}
                                component="fieldset"
                                className={customClasses.fileInputFieldset}
                            >
                                <FormGroup>
                                    <FormControlLabel
                                        classes={{
                                            root: customClasses.fileName,
                                            label: customClasses.fileNameLabel,
                                        }}
                                        control={
                                            <>
                                                <input
                                                    id="tentTypeImage"
                                                    type="file"
                                                    accept="image/png,image/jpg,image/gif"
                                                    className={customClasses.fileInput}
                                                    onChange={_updateTentImage}
                                                    required
                                                />
                                                <IconButton
                                                    color="secondary"
                                                    aria-label="upload image of tent"
                                                    component="span"
                                                >
                                                    <PhotoCamera />
                                                </IconButton>
                                            </>
                                        }
                                        label={_cleanTentImageDisplay(tentImage)}
                                    />
                                </FormGroup>
                                <FormHelperText error={true}>{!isTentImageValid ? 'Tent Image required' : ''}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        {
                            !_.isEmpty(tentImageBase64) && (
                                <img src={tentImageBase64} className={customClasses.tentImage} />
                            )
                        }
                    </Grid>
                </Grid>
            </Box>

            <Divider />

            <Box py={2}>
                <Grid container spacing={3} className={classes.gridRow}>
                    <Grid item xs={12} sm={6}>
                        &nbsp;
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            className={classes.gridRow}
                            style={{textAlign:'right'}}
                        >
                            <Button
                                type="button"
                                // disabled={!formValidated}
                                variant={formValidated ? 'contained' : 'outlined'}
                                color={formValidated ? 'primary' : 'default'}
                                size="large"
                                onClick={_handleSubmit}
                                className={formValidated ? '' : customClasses.visiblyDisabledButton}
                            >
                                next
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default TentDescription;
