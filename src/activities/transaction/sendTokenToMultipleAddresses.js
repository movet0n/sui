import { sendToken } from './sendToken.js';
import { getFileWithSuiAddresses } from '../../common/account.js';
import { getRandomSuiValueBetween } from '../../common/random.js';


async function sendTokenToMultipleAddresses(mnemonic_from, filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log("\n----- ----- -----\nTransaction - send tokens to multiple addresses\n");

    for (const obj of file) {
        const { address } = obj;

        const delay = Math.floor(Math.random() * 10000) + 7000;
        const amount = await getRandomSuiValueBetween(0.02, 0.05)

        await new Promise((resolve) => {
            setTimeout(async () => {
                await sendToken(mnemonic_from, address, amount);
                resolve();
            }, delay);
        });
    }
}

// sendTokenToMultipleAddresses()
