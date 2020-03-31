// Frameworks
import React from 'react';
import * as _ from 'lodash';

// App Components
import { GLOBALS } from '../../utils/globals';
import IPFS from '../../utils/ipfs';

// Contract Data
import { RentMyTent } from '../blockchain/contracts';


// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema
// https://docs.opensea.io/docs/metadata-standards
const tokenMetadata = {
    'description'       : '',
    'external_url'      : '',
    'animation_url'     : '',
    'youtube_url'       : '',
    'image'             : '',
    'name'              : '',
    'symbol'            : '',
    'decimals'          : 18,
    'background_color'  : 'FFF',
    'properties'        : {},
    'attributes'        : [],   // OpenSea
};


const ContractHelpers = {};

ContractHelpers.saveMetadata = ({ tokenData, onProgress }) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Save Image File to IPFS
            onProgress('Saving Image to IPFS..');
            const imageFileUrl = await IPFS.saveImageFile({fileBuffer: tokenData.iconBuffer});
            console.log('imageFileUrl', imageFileUrl);

            // Generate Token Metadata
            const metadata          = {...tokenMetadata};
            metadata.name           = tokenData.name;
            metadata.symbol         = tokenData.symbol;
            metadata.description    = tokenData.desc;
            metadata.external_url   = `${GLOBALS.BASE_URL}${GLOBALS.APP_ROOT}/type/{id}`;
            metadata.image          = imageFileUrl;
            // metadata.properties = {};
            // metadata.attributes = [];

            // Save Metadata to IPFS
            onProgress('Saving Metadata to IPFS..');
            const jsonFileUrl = await IPFS.saveJsonFile({jsonObj: metadata});
            console.log('jsonFileUrl', jsonFileUrl, metadata);

            resolve({imageFileUrl, jsonFileUrl});
        }
        catch (err) {
            reject(err);
        }
    });
};


export { ContractHelpers, tokenMetadata };
