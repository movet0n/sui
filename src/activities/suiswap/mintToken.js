import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { TOKENS } from '../../../resources/data/suiswap.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


export async function mintToken(mnemonic, token) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = `0x${keypair.getPublicKey().toSuiAddress()}`;
    const signer = new RawSigner(keypair, provider);

    let argument = [64, 66, 15, 0, 0, 0, 0, 0];
    let convertedArgument = parseInt(argument.join(''), 10);

    try {
        await signer.executeMoveCall({
            packageObjectId: "0x8235459df815e77668b4a49bb36e229f3321f432", // static Package ID
            module: 'pool',
            function: token,
            typeArguments: [],
            arguments:
                [
                    "0x8579e3e916c12fbfa423dff766320febe8052864", // static Object ID
                    `${convertedArgument}`,
                    address
                ],
            gasBudget: 2000
        })
        console.log(`>>> address ${address} | minted ${token}`);

    } catch (error) {
        console.error(`>>> address ${address} | mintToken() | caught an error ${error}`);
    }
}

// mintToken()
