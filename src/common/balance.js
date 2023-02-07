import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import BigNumber from 'bignumber.js'
import { getFileWithSuiAddresses } from './account.js';


const provider = new JsonRpcProvider('https://sui-api.rpcpool.com/');


async function getAccountSuiBalances(address) {
    let data = await provider.getCoinBalancesOwnedByAddress(address)
    let arr = data.map(obj => ({
        objectId: obj.details.reference.objectId,
        type: obj.details.data.type,
        balance: obj.details.data.fields.balance
    }))

    return arr.filter(coin => coin.type.includes("sui")).sort((a, b) => b.balance - a.balance)
}

// getAccountSuiBalances()

async function getAccountBalance(address) {
    const balances = await getAccountSuiBalances(address);
    let total_balance = new BigNumber(0);

    try {
        for (let index = 0; index < balances.length; index++) {
            const element = balances[index];
            total_balance = total_balance.plus(element["balance"]);
        }
        console.log(`>>> address ${address} | ${total_balance / (10 ** 9)} SUI`);

        return total_balance

    } catch (error) {
        console.error(`>>> address ${address} | delegate() | caught an error ${error}`);
    }
}

// getAccountBalance()

async function getAccountBalanceMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    console.log("\n----- ----- ----- ----- -----");
    console.log("Get account Balance\n");

    for (const obj of file) {
        const { address } = obj;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await getAccountBalance(address);
                resolve();
            });
        });
    }
}

// getAccountBalanceMultipleAddresses()