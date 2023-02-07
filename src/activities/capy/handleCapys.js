import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { addAccessoryToCapy, breedCapys, getCapysForBreeding, getFirstAccessoryId } from './helpers.js';


export async function handleCapys(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();

    console.log(`\nHandle Capys for address ${address}`);

    try {
        const capies = await getCapysForBreeding(mnemonic)

        const firstCapyId = capies[0]
        const firstAccessoryId = await getFirstAccessoryId(mnemonic)
        await addAccessoryToCapy(mnemonic, firstCapyId, firstAccessoryId)

        const secondCapyId = capies[1]
        const secondAccessoryId = await getFirstAccessoryId(mnemonic)
        await addAccessoryToCapy(mnemonic, secondCapyId, secondAccessoryId)

        await breedCapys(mnemonic, firstCapyId, secondCapyId)
        console.log(`>>> address ${address} | Capys handled`);

    } catch (error) {
        console.error(`>>> address ${address} | handleCapys() | caught an error ${error}`);
    }
}

// handleCapys()
