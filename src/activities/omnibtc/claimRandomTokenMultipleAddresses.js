import { claimRandomToken } from './claimRandomToken.js';
import { getFileWithSuiAddresses } from '../../common/account.js';


async function claimRandomTokenMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log(`\n----- ----- -----\nOmniBTC - Claim a single token picked up randomply for multiple addresses\n`);

    for (const obj of file) {
        const { mnemonic } = obj;

        const delay = Math.floor(Math.random() * 1000) + 500;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await claimRandomToken(mnemonic);
                resolve();
            }, delay);
        });
    }
}

// claimRandomTokenMultipleAddresses()
