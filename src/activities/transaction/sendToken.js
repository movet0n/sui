import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { convertSuiToMist } from '../../common/random.js';
import { getTokenObjectIds } from '../../common/tokenObject.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


export async function sendToken(mnemonic_from, recipient_address, amount_to_send) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic_from);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    const convertedAmount = await convertSuiToMist(amount_to_send)

    try {
        await signer.paySui({
            inputCoins: await getTokenObjectIds(mnemonic_from, "sui"),
            recipients: [recipient_address],
            amounts: [convertedAmount],
            gasBudget: 2000
        })
        console.log(`>>> address ${address} | sent ${amount_to_send} SUI to ${recipient_address}`);

    } catch (error) {
        console.error(`>>> address ${address} | sendTokens() | caught an error ${error}`);
    }
}

// sendToken()
