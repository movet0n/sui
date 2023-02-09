import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


export async function register(mnemonic, name) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    try {
        await signer.executeMoveCall({
            packageObjectId: "0xac02d650b50456147c2c055c68acac7c545de0a7",
            module: 'frenemies',
            function: 'register',
            typeArguments: [],
            arguments:
                [
                    `${name}`,
                    "0xc42531c558ded8fcfecb0b0a4b479d9efb14af67",
                    "0x5"
                ],
            gasBudget: 15000
        })
        console.log(`>>> address ${address} | registered with a name '${name}'`);

    } catch (error) {
        console.error(`>>> address ${address} | register() | caught an error ${error}`);
    }
}

// register()
