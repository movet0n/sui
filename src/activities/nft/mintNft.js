import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { NFT_ARRAY } from '../../../resources/data/nft.js'


const provider = new JsonRpcProvider('https://fullnode.testnet.sui.io');


export async function mintNft(mnemonic, nft) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    try {
        await signer.executeMoveCall({
            packageObjectId: '0x0000000000000000000000000000000000000002',
            module: 'devnet_nft',
            function: 'mint',
            typeArguments: [],
            arguments: nft,
            gasBudget: 2000,
        })
        console.log(`address ${address} | minted NFT ${nft}`);

    } catch (error) {
        console.error(`>>> address ${address} | mintNft() | caught an error ${error}`);
    }
}

// mintNft()
