import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { claimToken } from './claimToken.js';
import { TOKENS } from '../../../resources/data/omnibtc.js';


export async function claimRandomToken(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = `0x${keypair.getPublicKey().toSuiAddress()}`;

    const tokensArray = Object.values(TOKENS);
    const randomIndex = Math.floor(Math.random() * tokensArray.length);
    const randomToken = tokensArray[randomIndex];

    try {
        claimToken(mnemonic, randomToken)
    } catch (error) {
        console.error(`>>> address ${address} | claimRandomToken() | caught an error ${error}`);
    }
}

// claimRandomToken()
