import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { getTokenObjectIds } from '../../common/tokenObject.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


export async function sendToken(mnemonic_from, recipient_address, amount_to_send) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic_from);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    try {
        await signer.paySui({
            inputCoins: await getTokenObjectIds(mnemonic_from, "sui"),
            recipients: [recipient_address],
            amounts: [amount_to_send],
            gasBudget: 500
        })
        console.log(`>>> address ${address} | sent ${amount_to_send / 10 ** 9} SUI to ${recipient_address}`);

    } catch (error) {
        console.error(`>>> address ${address} | sendTokens() | caught an error ${error}`);
    }
}

// sendToken()
