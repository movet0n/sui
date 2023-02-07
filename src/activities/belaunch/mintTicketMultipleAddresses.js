import { mintTicket } from './mintTicket.js';
import { getFileWithSuiAddresses } from '../../common/account.js';


async function mintTicketMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log("\n----- ----- ----- ----- -----\nBelaunch - Mint ticket for multiple addresses\n");

    for (const obj of file) {
        const { mnemonic } = obj;
        const delay = Math.floor(Math.random() * 1000) + 2000;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await mintTicket(mnemonic);
                resolve();
            }, delay);
        });
    }
}

// mintTicketMultipleAddresses()