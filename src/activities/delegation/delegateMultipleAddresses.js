import { getFileWithSuiAddresses } from '../../common/account.js';
import { delegate } from './delegate.js';


async function delegateFromMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log("\n----- ----- -----\nDelegate to multiple addresses\n");

    for (const obj of file) {
        const { mnemonic } = obj;
        const delay = Math.floor(Math.random() * 2000) + 3000;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await delegate(mnemonic);
                resolve();
            }, delay);
        });
    }
}

// delegateFromMultipleAddresses()