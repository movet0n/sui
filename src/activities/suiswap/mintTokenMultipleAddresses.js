import { mintToken } from './mintToken.js';
import { getFileWithSuiAddresses } from '../../common/account.js';
import { TOKENS } from '../../../resources/data/suiswap.js';


async function mintTokenMultipleAddresses(filePath, token) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log(`\n----- ----- -----\nSuiSwap - Mint a single token for multiple addresses\n`);

    for (const obj of file) {
        const { mnemonic } = obj;

        const delay = Math.floor(Math.random() * 1000) + 500;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await mintToken(mnemonic, token);
                resolve();
            }, delay);
        });
    }
}

// mintTokenMultipleAddresses()
