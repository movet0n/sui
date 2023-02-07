import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { claimToken } from './claimToken.js'
import { TOKENS } from '../../../resources/data/omnibtc.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


async function claimAllTokens(mnemonic) {
    for (const [token, address] of Object.entries(TOKENS)) {
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 2000) + 1000));
        await claimToken(mnemonic, address);
    }
}

// claimAllTokens()
