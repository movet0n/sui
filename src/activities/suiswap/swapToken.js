import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { sendTokenToMyself } from '../transaction/sendTokenToMyself.js';
import { getTokenFirstObjectId } from '../../common/tokenObject.js';
import { TOKENS } from '../../../resources/data/suiswap.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


async function swapToken(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = `0x${keypair.getPublicKey().toSuiAddress()}`;
    const signer = new RawSigner(keypair, provider);

    // const gasCoin = await sendTokenToMyself(mnemonic, 1234568);
    const randomAmountSwapFrom = Math.floor(Math.random() * (3333333 - 1000000 + 1) + 1000000);
    let arg = [232, 3, 0, 0, 0, 0, 0, 0];
    let convertedArg = parseInt(arg.join(''), 10);

    const suiObjectId = await getTokenFirstObjectId(mnemonic, "sui")
    console.log(suiObjectId);

    try {
        await signer.executeMoveCall({
            packageObjectId: "0x8235459df815e77668b4a49bb36e229f3321f432",
            module: 'pool',
            function: 'swap_x_to_y',
            typeArguments: [
                "0x8235459df815e77668b4a49bb36e229f3321f432::pool::TestSOL", // from
                "0x2::coin::Coin" // to, should be an actual object ID
            ],
            arguments:
                [
                    TOKENS.SOL.objectId,
                    suiObjectId,
                    `${randomAmountSwapFrom}`,
                    `${convertedArg}`
                ],
            gasBudget: 15000
        })
        console.log(`>>> address ${address} | swapped`);

    } catch (error) {
        console.error(`>>> address ${address} | swapToken() | caught an error:\n>>> ${error}`);
    }
}

// swapToken()