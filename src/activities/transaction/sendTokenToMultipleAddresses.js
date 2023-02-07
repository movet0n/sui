import { sendToken } from './sendToken.js';
import { getFileWithSuiAddresses } from '../../common/account.js';


async function sendTokenToMultipleAddresses(mnemonic_from, filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log("\n----- ----- -----\nTransaction - send tokens to multiple addresses\n");

    for (const obj of file) {
        const { address } = obj;

        const delay = Math.floor(Math.random() * 10000) + 7000;
        const amount = Math.floor(Math.random() * (92345678 - 50000000 + 1) + 50000000);

        await new Promise((resolve) => {
            setTimeout(async () => {
                await sendToken(mnemonic_from, address, amount);
                resolve();
            }, delay);
        });
    }
}

// sendTokenToMultipleAddresses()
