import { mintNft } from './mintNft.js'
import { getFileWithSuiAddresses } from '../../common/account.js';
import { NFT_ARRAY } from '../../../resources/data/nft.js'


async function mintNftMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log(`\n----- ----- -----\nMint NFTs for multiple addresses\n`);

    for (const i in NFT_ARRAY) {
        let nft = NFT_ARRAY[i]

        for (const obj of file) {
            const { mnemonic } = obj;
            const delay = Math.floor(Math.random() * 2000) + 1000;

            await new Promise((resolve) => {
                setTimeout(async () => {
                    await mintNft(mnemonic, nft);
                    resolve();
                }, delay);
            });
        }
    }
}

// mintNftMultipleAddresses()
