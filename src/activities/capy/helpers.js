import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { getFileWithSuiAddresses } from '../../common/account.js';
import { getTokenFirstObjectId } from '../../common/tokenObject.js';
import { ACCESSORIES } from '../../../resources/data/capy.js';


const provider = new JsonRpcProvider('https://fullnode.testnet.sui.io');


const contracts = {
    VITE_PACKAGE_ID: "0x4c10b61966a34d3bb5c8a8f063e6b7445fc41f93", // Capy type ID
    VITE_VERSION: "1",
    VITE_DIGEST: "iAApXWGHm6yoo9KVjPCTSlyNgwklmjrmg8SHOskA/vk=",
    VITE_REGISTRY: "0x2e09e52d1027d2cb3d1bd2edbd95d1a093d6a886", // 2nd arg, Capy Registry
    VITE_REGISTRY_V: "5",
    VITE_CAPY_MARKET: "0xb72094559ea2225003338245be04a844b39db5de",
    VITE_CAPY_MARKET_V: "5",
    VITE_ITEM_STORE: "0x3a60ac6f596443c94091555d622ed404fe2a6afb",
    VITE_ITEM_STORE_V: "5",
    VITE_EDEN: "0xabe47e555dd47dd38ce239f22d5208277cf0d57e", // 1st arg, Type
    VITE_EDEN_V: "5",
    VITE_API_URL: "https://api.capy.art",
    VITE_SUI_NETWORK: "devnet",
    VITE_USER_NODE_ENV: "production",
    BASE_URL: "/",
    MODE: "production",
    DEV: !1,
    PROD: !0
}


async function mintCapy(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    let data = await signer.executeMoveCall({
        packageObjectId: contracts.VITE_PACKAGE_ID,
        module: 'eden',
        function: 'get_capy',
        typeArguments: [],
        arguments: [contracts.VITE_EDEN, contracts.VITE_REGISTRY],
        gasBudget: 20000
    });

    if (data) {
        const moveEvent = data.EffectsCert.effects.effects.events.find(i => i.moveEvent);

        if (moveEvent && moveEvent.moveEvent) {
            let moveEventField = moveEvent.moveEvent;
            if (moveEventField && moveEventField.fields && moveEventField.fields.id) {
                console.log(`>>> address ${address} | minted a Capy`);
                return moveEventField.fields.id;
            } else {
                console.log(`>>> address ${address} | cannot mint a Capy: more than 2 Capys alreay minted?`);
            }
        } else {
            console.log(`>>> address ${address} | cannot mint a Capy: more than 2 Capys alreay minted?`);
        }
    }
}

// mintCapy()

async function mintCapyMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    for (const obj of file) {
        const { mnemonic } = obj;

        const delay = Math.floor(Math.random() * 3000) + 500;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await mintCapy(mnemonic);
                resolve();
            }, delay);
        });
    }
}

// mintCapyMultipleAddresses()

async function getFirstCapyId(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();

    let capys = await getCapysByAddress(mnemonic);

    if (capys.length === 0) {
        console.log(`>>> address ${address} | 0 Capys found, mint 1 Capy`);
        await mintCapy(mnemonic);
    } else {
        console.log(`>>> address ${address} | ${capys.length} Capy/s found, no need to mint more Capys`);
    }

    capys = await getCapysByAddress(mnemonic);

    return capys[0].objectId;
}

// getFirstCapyId()

export async function getCapysForBreeding(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();

    let capys = await getCapysByAddress(mnemonic);
    const totalCapys = capys.length;

    if (totalCapys < 2) {
        console.log(`>>> address ${address} | ${totalCapys} Capy/s found, minting ${2 - totalCapys} new Capy/s`);

        for (let i = 0; i < 2 - totalCapys; i++) {
            await mintCapy(mnemonic);
        }

        capys = await getCapysByAddress(mnemonic);
    } else {
        console.log(`>>> address ${address} | ${totalCapys} Capys found, no need to mint more Capys`);
    }

    return [
        capys[0].objectId,
        capys[1].objectId
    ]
}

// getCapysForBreeding()

const availableAccessories = ACCESSORIES.filter(item => !item.name.includes('holiday'))
const getRandomAccessory = () => availableAccessories[Math.floor(Math.random() * availableAccessories.length)]

async function buyRandomAccessory(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    const totalAccessories = (await getCapyAccessoriesByAddress(mnemonic)).length
    const randomAccessory = getRandomAccessory();
    const { name, price } = randomAccessory
    const coinObjectId = await getTokenFirstObjectId(mnemonic, "sui");

    if (totalAccessories < 2) {
        await signer.executeMoveCall({
            packageObjectId: contracts.VITE_PACKAGE_ID,
            module: 'capy_item',
            function: 'buy_mul_coin',
            typeArguments: [],
            arguments: [
                contracts.VITE_ITEM_STORE,
                name,
                [coinObjectId]
            ],
            gasBudget: 20000
        })
        console.log(`>>> address ${address} | bought ${name} at ${price / 10 ** 9} SUI`);
    } else {
        console.log(`>>> address ${address} | buyRandomAccessory() | ${totalAccessories} accessories, no need to mint more`);
    }
}

// buyRandomAccessory()

async function buyRandomAccessoryMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);
    const objects = file.slice(24, file.length);

    for (const obj of objects) {
        const { mnemonic } = obj;

        const delay = Math.floor(Math.random() * 1000) + 500;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await buyRandomAccessory(mnemonic);
                resolve();
            }, delay);
        });
    }
}

// buyRandomAccessoryMultipleAddresses()

async function getCapyAccessoriesByAddress(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();

    const objects = await provider.getObjectsOwnedByAddress(address)
    const capyAccessories = objects.filter(obj => obj.type == "0x4c10b61966a34d3bb5c8a8f063e6b7445fc41f93::capy_item::CapyItem")

    // console.log(`>>> address ${address} | Capy accessories: ${capyAccessories}`);
    return capyAccessories
}

// getCapyAccessoriesByAddress()

export async function getFirstAccessoryId(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();

    let accessories = await getCapyAccessoriesByAddress(mnemonic);

    if (accessories.length === 0) {
        console.log(`>>> address ${address} | 0 accessories found, buying a random accessory ...`);
        await buyRandomAccessory(mnemonic);
    } else {
        console.log(`>>> address ${address} | ${accessories.length} accessories found, no need to buy more items`);
    }

    accessories = await getCapyAccessoriesByAddress(mnemonic);

    return accessories[0].objectId;
}

// getFirstAccessoryId()

export async function addAccessoryToCapy(mnemonic, capyId, accessoryId) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    try {
        await signer.executeMoveCall({
            packageObjectId: contracts.VITE_PACKAGE_ID,
            module: 'capy',
            function: 'add_item',
            typeArguments: [`${contracts.VITE_PACKAGE_ID}::capy_item::CapyItem`],
            arguments: [capyId, accessoryId],
            gasBudget: 20000
        })
        console.log(`>>> address ${address} | added accessory ${accessoryId} to Capy ${capyId}`);

    } catch (error) {
        console.error(`>>> address ${address} | addAccessoryToCapy() | caught an error ${error}`);
    }
}

// addAccessoryToCapy(
//     mnemonic,
//     await getFirstCapyId(mnemonic),
//     await getFirstAccessoryId(mnemonic),
// )

async function getCapysByAddress(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();

    const objects = await provider.getObjectsOwnedByAddress(address)
    const capys = objects.filter(obj => obj.type == "0x4c10b61966a34d3bb5c8a8f063e6b7445fc41f93::capy::Capy")

    // console.log(capys);
    return capys
}

// getCapysByAddress()

async function dressUpCapy(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();

    let capyId = await getFirstCapyId(mnemonic)
    let accessoryId = await getFirstAccessoryId(mnemonic);

    console.log(`>>> addres ${address} | dress up Capy ${capyId} with accessory ${accessoryId}`);

    await addAccessoryToCapy(mnemonic, capyId, accessoryId)
}

// dressUpCapy()

async function dressUpCapyMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    for (const obj of file) {
        const { mnemonic } = obj;

        let capyId = await getFirstCapyId(mnemonic)
        let accessoryId = await getFirstAccessoryId(mnemonic);

        await addAccessoryToCapy(mnemonic, capyId, accessoryId)
    }
}

// dressUpCapyMultipleAddresses()

export async function breedCapys(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    const capies = await getCapysForBreeding(mnemonic)
    const firstCapyId = capies[0]
    const secondCapyId = capies[1]

    try {
        await signer.executeMoveCall({
            packageObjectId: contracts.VITE_PACKAGE_ID,
            module: 'capy',
            function: 'breed_and_keep',
            typeArguments: [],
            arguments: [contracts.VITE_REGISTRY, firstCapyId, secondCapyId],
            gasBudget: 20000
        })
        console.log(`>>> address ${address} | breeding Capys: ${firstCapyId} and ${secondCapyId}`);

    } catch (error) {
        console.error(`>>> address ${address} | breedCapys() | caught an error ${error}`);
    }
    // if (data) return data.EffectsCert.effects.effects.events.find(i => i.moveEvent).moveEvent.fields.id;
}

// breedCapys()

async function breedCapysMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    for (const obj of file) {
        const { mnemonic } = obj;
        const delay = Math.floor(Math.random() * 1500) + 500;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await breedCapys(mnemonic);
                resolve();
            }, delay);
        });
    }
}

// breedCapysMultipleAddresses()
