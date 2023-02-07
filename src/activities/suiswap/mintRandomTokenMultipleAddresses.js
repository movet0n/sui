import { mintRandomToken } from './mintRandomToken.js';
import { getFileWithSuiAddresses } from '../../common/account.js';


async function mintRandomTokenMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log(`\n----- ----- -----\nSuiSwap - Mint a single token picked up randomply for multiple addresses\n`);

    for (const obj of file) {
        const { mnemonic } = obj;

        const delay = Math.floor(Math.random() * 1000) + 500;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await mintRandomToken(mnemonic);
                resolve();
            }, delay);
        });
    }
}

// mintRandomTokenMultipleAddresses()
