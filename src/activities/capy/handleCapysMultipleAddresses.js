import { handleCapys } from './handleCapys.js';
import { getFileWithSuiAddresses } from '../../common/account.js';


async function handleCapysMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log("\n----- ----- -----\nCapy - Handle Capy\n");

    for (const obj of file) {
        const { mnemonic } = obj;
        const delay = Math.floor(Math.random() * 1500) + 500;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await handleCapys(mnemonic);
                resolve();
            }, delay);
        });
    }
}

// handleCapysMultipleAddresses()
