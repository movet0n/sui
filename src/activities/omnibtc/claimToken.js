import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { TOKENS } from '../../../resources/data/omnibtc.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


export async function claimToken(mnemonic, token) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    try {
        await signer.executeMoveCall({
            packageObjectId: "0x72b846eca3c7f91961ec3cae20441be96a21e1fe", // static Package ID
            module: 'faucet',
            function: 'claim',
            typeArguments: [token],
            arguments: ["0x4e25d4ba8162dacb8bad51d5bbd3021a7f4a885d"], // static
            gasBudget: 2000
        })
        console.log(`>>> address ${address} | claimed ${token}`);

    } catch (error) {
        console.error(`>>> address ${address} | claimToken() | caught an error ${error}`);
    }
}

// claimToken()
