import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


export async function mintTicket(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    try {
        await signer.executeMoveCall({
            packageObjectId: "0xb18b6f593981000b4ee6de770084292112889056",
            module: 'belaunch',
            function: 'mint_user_info',
            typeArguments: [
                "0x656cd55766018cd0b9d75542566ff42bc0e56292::wizardland::WIZARDLAND",
                "0x2::sui::SUI"
            ],
            arguments: ["0xc0e022185ddc6a981f78d08603aeffe6da5930a1"],
            gasBudget: 15000
        })
        console.log(`>>> address ${address} | minted a ticket`);

    } catch (error) {
        console.error(`>>> address ${address} | mintTicket() | caught an error ${error}`);
    }
}

// mintTicket()
