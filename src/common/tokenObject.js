import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


const TOKENS = {
    TEST: "mint_test_token",
    BNB: "mint_test_token_bnb",
    BTC: "mint_test_token_btc",
    DAI: "mint_test_token_dai",
    ETH: "mint_test_token_eth",
    SOL: "mint_test_token_sol",
    USDC: "mint_test_token_usdc",
    USDT: "mint_test_token_usdt",
}


export async function getTokenObjects(mnemonic, token) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);
    const address = keypair.getPublicKey().toSuiAddress();

    let data = await provider.getCoinBalancesOwnedByAddress(address)

    let arr = data.map(obj => ({
        objectId: obj.details.reference.objectId,
        type: obj.details.data.type,
        balance: obj.details.data.fields.balance
    }))

    return arr.filter(coin => coin.type.includes(token)).sort((a, b) => b.balance - a.balance)
}

// getTokenObjects()

export async function getTokenObjectIds(mnemonic, token) {
    let balances = await getTokenObjects(mnemonic, token)
    let balanceSum = 0;
    let array = [];

    for (let balance of balances) {
        array.push(balance.objectId)
        balanceSum += +balance.balance
    }

    return array
}

// getTokenObjectIds()

export async function getTokenFirstObjectId(mnemonic, token) {
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic);

    const firstObjectId = JSON.parse(JSON.stringify(await getTokenObjects(mnemonic, token)))[0].objectId;

    return firstObjectId
}

// getTokenFirstObjectId()