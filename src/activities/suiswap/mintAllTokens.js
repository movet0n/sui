import { mintToken } from './mintToken.js';
import { TOKENS } from '../../../resources/data/suiswap.js';


async function mintAllTokens(mnemonic) {
    for (const [token, address] of Object.entries(TOKENS)) {
        await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 1000) + 3000));
        await mintToken(mnemonic, address);
    }
}

// mintAllTokens()
