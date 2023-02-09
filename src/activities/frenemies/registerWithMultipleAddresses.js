import faker from 'faker';
import { register } from './register.js';
import { getFileWithSuiAddresses } from '../../common/account.js';


async function registerWithMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log("\n----- ----- -----\nFrenemies - register with multiple addresses\n");

    for (const obj of file) {
        const { mnemonic } = obj;

        const delay = Math.floor(Math.random() * 4000) + 3000;
        let randomName = faker.name.findName();

        await new Promise((resolve) => {
            setTimeout(async () => {
                await register(mnemonic, randomName);
                resolve();
            }, delay);
        });
    }
}

// registerWithMultipleAddresses()
