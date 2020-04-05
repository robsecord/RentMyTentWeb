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
    'symbol'            : GLOBALS.TOKEN_DATA.SYMBOL,
    'decimals'          : GLOBALS.TOKEN_DATA.DECIMALS,
    'background_color'  : GLOBALS.TOKEN_DATA.BG_COLOR,
    'properties'        : {},
    'attributes'        : [],   // for OpenSea
};


const ContractHelpers = {};

ContractHelpers.saveMetadata = ({ tokenData, onProgress }) => {
    return new Promise(async (resolve, reject) => {
        try {

            console.log('ContractHelpers.saveMetadata');
            console.log(' - tokenData', tokenData);


            // Save Image File to IPFS
            onProgress('Saving Image to IPFS..');
            console.log('step 1');


            const imageFileUrl = await IPFS.saveImageFile({fileBuffer: tokenData.imageBuffer});
            console.log('imageFileUrl', imageFileUrl);

            // Generate Token Metadata
            const metadata          = {...tokenMetadata};
            metadata.name           = tokenData.name;
            metadata.description    = tokenData.desc;
            metadata.external_url   = `${GLOBALS.BASE_URL}${GLOBALS.APP_ROOT}/tent/{id}`;
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



ContractHelpers.registerTent = ({from, tokenData, onProgress}) => {
    return new Promise(async (resolve, reject) => {
        try {

            console.log('ContractHelpers.registerTent');
            console.log(' - from', from);
            console.log(' - tokenData', tokenData);


            const ethPrice = GLOBALS.REGISTER_TENT;

            // Save Token Metadata
            const {jsonFileUrl} = await ContractHelpers.saveMetadata({tokenData, onProgress});

            // Create Token on Blockchain
            onProgress('Creating Blockchain Transaction..');
            const rentMyTent = RentMyTent.instance();
            const tx = {from, value: ethPrice};
            const args = [
                '12300000000000000000', // tokenData.initialPrice,
                jsonFileUrl,
            ];

            console.log('tx', tx);
            console.log('args', args);

            // Submit Transaction and wait for Receipt
            rentMyTent.sendContractTx('listNewTent', tx, args, (err, transactionHash) => {
                if (err) {
                    return reject(err);
                }
                resolve({tx, args, transactionHash});
            });
        }
        catch (err) {
            reject(err);
        }
    });
};


export { ContractHelpers, tokenMetadata };
