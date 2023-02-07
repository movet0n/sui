import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import bip39 from 'bip39';
import fs from 'fs';
import axios from 'axios';
import HttpsProxyAgent from 'https-proxy-agent';
import { proxy } from '../../config/proxy.js';
import faker from 'faker';
import BigNumber from 'bignumber.js'


// RPC = [
//     DEVNET:
//     https://fullnode.testnet.vincagame.com/
//     TESTNET:
//     https://fullnode.testnet.sui.io
//     https://sui-api.rpcpool.com/
//     https://sui-testnet.public.blastapi.io/
//     https://rpc.ankr.com/sui_testnet
//     https://fullnode.testnet.vincagame.com/ 

// ]

// const provider = new JsonRpcProvider(Network.DEVNET);
const provider = new JsonRpcProvider('https://fullnode.testnet.sui.io');


async function requestSuiFromFaucet(recipient, proxy, userAgent) {
    console.log(`Requesting SUI from faucet for ${recipient}`);

    let axiosProxyInstance = axios.create();

    if (proxy) {
        const [ip, port, login, password] = proxy.split(":");
        const customProxy = `http://${login}:${password}@${ip}:${port}`;
        axiosProxyInstance = axios.create({ httpsAgent: HttpsProxyAgent(customProxy) });
    }

    let res = await axiosProxyInstance("https://faucet.testnet.sui.io/gas", {
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ FixedAmountRequest: { recipient } }),
        method: "POST"
    }).catch(async err => {
        console.log('Faucet error:', err)
        console.log('Faucet error:', err?.response?.statusText || err.code)

        if (err?.response?.status == 429) {
            proxy.limited = true;
            console.log(`Proxy rate limited, need to wait ${err.response.headers['retry-after']} seconds`);
            await timeout(5000)
        }
    })

    res?.data && console.log(`Faucet request status: ${res.statusText}`);

    return res?.data
}

// requestSuiFromFaucet()

async function requestSuiFromFaucetForMultipleAddresses(filePath) {
    const file = await getFileWithSuiAddresses(filePath);

    for (const obj of file) {
        const { address, proxy, userAgent } = obj;
        const delay = Math.floor(Math.random() * 7000) + 1500;

        await new Promise((resolve) => {
            setTimeout(async () => {
                await requestSuiFromFaucet(address, proxy, userAgent);
                resolve();
            }, delay);
        });
    }
}

// requestSuiFromFaucetForMultipleAddresses()
