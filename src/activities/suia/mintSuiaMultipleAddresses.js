import { mintSuia } from './mintSuia.js';
import { getFileWithSuiAddresses } from '../../common/account.js';


async function mintSuiaMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);
    console.log(`\n----- ----- -----\nSuia - mint an OAT from multiple addresses\n`);

    for (const obj of file) {
        const { mnemonic } = obj;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await mintSuia(mnemonic);
                resolve();
            });
        });
    }
}

// mintSuiaMultipleAddresses()
