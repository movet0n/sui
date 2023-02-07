import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import { sendTokenToMyself } from '../transaction/sendTokenToMyself.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');

const VALIDATORS = [
    { name: "Ahoy Validator", address: "0x98987d782154c32f97a1717eadd38897cb4b3ba0" },
    { name: "Ankr", address: "0xa2ea08f0fe3f1f21c1c626c55066ae25595ed88d" },
    { name: "Blockdaemon", address: "0x5d06f37654f11cdd27179088fcfeadaab21e13ef" },
    { name: "BwareLabs", address: "0x2c530836f1d1629e93be4b3c17afe49222986e4e" },
    { name: "Chainode Tech", address: "0x63a03820bafde3535d2b1dd49dc8c3b0e4812553" },
    { name: "Chorus One", address: "0xc75fcfa8e93f9c09cd63b6606985dbde98e72cdf" },
    { name: "Coinbase Cloud", address: "0x0dfc80a642b711d1d8ff44a808e115f6bc302919" },
    { name: "ContributionDAO", address: "0xa3b1b472f6c6f600fb244c8e78fd32df6d705512" },
    { name: "Cosmostation", address: "0xf30ba97931bedac27ca0ea54aeb1abae748e62ed" },
    { name: "DSRV", address: "0xd6859aeee42810b0e07cc62211b1d6dd7ed955e1" },
    { name: "Everstake", address: "0x8ffe1349c12c596a38b65800d2d98c9db0e38094" },
    { name: "Figment", address: "0x049950270c3f899ad734cba5027cbbf411199b6d" },
    { name: "Forbole", address: "0x47fd0740af34c4a0637c5b7970bab029c7fdf148" },
    { name: "GalaxyDigital", address: "0x4f4334b57f762b7255a924537680e4d09410878f" },
    { name: "Google Cloud Web3", address: "0x2aee191029bc482e1a685cde2c0fed6532d6cec1" },
    { name: "Laine", address: "0xa8e6b7ab1c2e6098c7056e2ecd2041cf0e04ffc0" },
    { name: "Mysten-1", address: "0xfdc2a0fe740d34e5424d1a06c0c4ac106b7096f2" },
    { name: "Nodes.Guru", address: "0x05eac33a7c45b9fb1f20c33500a307e7713f33e0" },
    { name: "Omnistake", address: "0x0f58ef0a8a5ca582ee16b6a8ced07efa1eac4092" },
    { name: "P2P.ORG", address: "0xd4f166363b2b0dc74e44e6e23100c1d2e3210e3c" },
    { name: "Restake", address: "0x4181c06a69bb95161ea90fe1b23cb68bc2cf8aa7" },
    { name: "Staketab", address: "0x6c374763cdbf4fc6b7397a5c90ef8bca431382e2" },
    { name: "Stakely", address: "0x07a3d48f2686399ca504d0b625f62761d9ef2db1" },
    { name: "Stakin", address: "0x910544c783522bee83e66f8d1014add90ee2f341" },
    { name: "TestnetPride", address: "0x2cfb19b03b58b05f1ea073dcffb76eb084bf8aac" },
    { name: "TPT", address: "0x70bdad20a4fc118df8d7fd6085d3385b9f7a22e3" },
    { name: "Triton One", address: "0xb0719855f1c3c4a6dbbc08b9eb4bfaa529e6f646" },
]


export async function delegate(mnemonic) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();
    const signer = new RawSigner(keypair, provider);

    const randomAmount = Math.floor(Math.random() * (3333333 - 1000000 + 1) + 1000000);
    const objectId = await sendTokenToMyself(mnemonic, 5000000);

    const randomIndex = Math.floor(Math.random() * VALIDATORS.length);
    const randomValidatorName = VALIDATORS[randomIndex].name;
    const randomValidatorAddress = VALIDATORS[randomIndex].address;

    try {
        await signer.executeMoveCall({
            packageObjectId: "0x0000000000000000000000000000000000000002",
            module: 'sui_system',
            function: 'request_add_delegation_mul_coin',
            typeArguments: [],
            arguments:
                [
                    "0x5",
                    [`${objectId}`],
                    [`${randomAmount}`],
                    randomValidatorAddress
                ],
            gasBudget: 15000
        })
        console.log(`>>> address ${address} | delegated ${randomAmount / 10 ** 9} SUI to ${randomValidatorName}\n`);

    } catch (error) {
        console.error(`>>> address ${address} | delegate() | caught an error ${error}`);
    }
}

// delegate()
