import { sendMessage } from './sendMessage.js';
import { getFileWithSuiAddresses } from '../../common/account.js';


async function sendMessageMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log("\n----- ----- -----\nPolymedia - send message from multiple addresses\n");

    for (const obj of file) {
        const { mnemonic } = obj;
        const delay = Math.floor(Math.random() * 10000) + 7000;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await sendMessage(mnemonic);
                resolve();
            }, delay);
        });
    }
}

// sendMessageMultipleAddresses()