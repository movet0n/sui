import { delegate } from './delegate.js';
import { getFileWithSuiAddresses } from '../../common/account.js';
import { getRandomSuiValueBetween } from '../../common/random.js';


async function delegateFromMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log("\n----- ----- -----\nDelegate from multiple addresses\n");

    for (const obj of file) {
        const { mnemonic } = obj;
        const delay = Math.floor(Math.random() * 2000) + 3000;

        let amount = await getRandomSuiValueBetween(0.0001, 0.0005)

        await new Promise((resolve) => {
            setTimeout(async () => {
                await delegate(mnemonic, amount);
                resolve();
            }, delay);
        });
    }
}

// delegateFromMultipleAddresses()