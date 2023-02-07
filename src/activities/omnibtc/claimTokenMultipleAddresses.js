import { claimToken } from './claimToken.js'
import { getFileWithSuiAddresses } from '../../common/account.js';
import { TOKENS } from '../../../resources/data/omnibtc.js';


async function claimTokenMultipleAddresses(filePath, token) {
    const file = await getFileWithSuiAddresses(filePath);
    console.log(`\n----- ----- -----\nClaim a specific token for multiple addresses\n`);

    try {
        for (const obj of file) {
            const { mnemonic } = obj;
            const delay = Math.floor(Math.random() * 2000) + 1000;

            await new Promise((resolve) => {
                setTimeout(async () => {
                    await claimToken(mnemonic, token);
                    resolve();
                }, delay);
            });
        }

    } catch (error) {
        console.error(`>>> address ${address} | claimTokenMultipleAddresses() | caught an error ${error}`);
    }
}

// claimTokenMultipleAddresses()
