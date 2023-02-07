import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';


const provider = new JsonRpcProvider('https://fullnode.testnet.sui.io');


export async function sendMessage(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    let argument = [1, 128, 150, 152, 0, 0, 0, 0, 0];
    let convertedArgument = parseInt(argument.join(''), 10);

    try {
        await signer.executeMoveCall({
            packageObjectId: "0xe67c773b9c68a6a863bba425e3d85c9e530f4df5",
            module: 'chat',
            function: 'add_message',
            typeArguments: [],
            arguments:
                [
                    "0x1d813602114ed649de94649a9458e2c1f396c652",
                    `${convertedArgument}`,
                    "hi"
                ],
            gasBudget: 20000
        })
        console.log(`>>> address ${address} | sent a message`);

    } catch (error) {
        console.error(`>>> address ${address} | sendMessage() | caught an error ${error}`);
    }
}

// sendMessage()
