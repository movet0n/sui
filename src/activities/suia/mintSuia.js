import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


export async function mintSuia(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = `0x${keypair.getPublicKey().toSuiAddress()}`;
    const signer = new RawSigner(keypair, provider);

    try {
        await signer.executeMoveCall({
            packageObjectId: "0x66ff099542cdaf96e129f7d74b972715e90d956a", // static Package ID
            module: 'suia',
            function: 'claim_medal',
            typeArguments: [],
            arguments: ['0x19009f416f442468719e0098103c5e54880d81da'],
            gasBudget: 2000
        })
        console.log(`>>> address ${address} | minted Suia OAT`);

    } catch (error) {
        console.error(`>>> address ${address} | mintSuia() | caught an error ${error}`);
    }
}

// mintSuia()
