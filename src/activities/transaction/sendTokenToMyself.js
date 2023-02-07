import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { getTokenObjectIds } from '../../common/tokenObject.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


export async function sendTokenToMyself(mnemonic, amount_to_send) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    try {
        const tx = await signer.paySui({
            inputCoins: await getTokenObjectIds(mnemonic, "sui"),
            recipients: [address],
            amounts: [amount_to_send],
            gasBudget: 500
        })
        const json = JSON.stringify(tx)
        const parsed = JSON.parse(json)
        const objectId = parsed.EffectsCert.effects.effects.created[0].reference.objectId

        console.log(`>>> address ${address} | sent ${amount_to_send / 10 ** 9} SUI to itself | new object ID: ${parsed.EffectsCert.effects.effects.created[0].reference.objectId}`);

        return objectId

    } catch (error) {
        console.error(`>>> address ${address} | sendTokenToMyself() | caught an error ${error}`);
    }
}

// sendTokenToMyself()