import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { mintToken } from './mintToken.js';
import { TOKENS } from '../../../resources/data/suiswap.js';


export async function mintRandomToken(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = `0x${keypair.getPublicKey().toSuiAddress()}`;

    const tokensArray = Object.values(TOKENS);
    const randomIndex = Math.floor(Math.random() * tokensArray.length);
    const randomToken = tokensArray[randomIndex];
    const randomFunction = randomToken.function;

    try {
        mintToken(mnemonic, randomFunction)
    } catch (error) {
        console.error(`>>> address ${address} | mintRandomToken() | caught an error ${error}`);
    }
}

// mintRandomToken()
