import { Ed25519Keypair, JsonRpcProvider, Network, RawSigner } from '@mysten/sui.js';
import bip39 from 'bip39';
import fs from 'fs';
import axios from 'axios';
import HttpsProxyAgent from 'https-proxy-agent';
import { proxy } from '../../config/proxy.js';
import faker from 'faker';
import BigNumber from 'bignumber.js'


const provider = new JsonRpcProvider('https://fullnode.testnet.sui.io');

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


async function getUserAgent() {
    const userAgent = faker.internet.userAgent()

    return userAgent
}

// getUserAgent()

async function getProxies() {
    return proxy;
}

// getProxies()

async function getTotalProxies() {
    const totalProxies = Object.keys(proxy).length;

    return totalProxies
}

// getTotalProxies()

async function createAddress(proxy) {
    const mnemonic = bip39.generateMnemonic();
    const keypair = Ed25519Keypair.deriveKeypair(mnemonic)
    const address = `0x${keypair.getPublicKey().toSuiAddress()}`
    const userAgent = await getUserAgent()

    return proxy ?
        { mnemonic, address, proxy, userAgent } :
        { mnemonic, address, userAgent }
}

async function createSuiAddresses(totalAddresses, useProxies) {
    let addresses = []
    const proxy = await getProxies()

    if (useProxies) {
        for (let index = 0; index < totalAddresses; index++) {
            const currentProxy = Object.values(proxy)[index];
            addresses.push(await createAddress(currentProxy))
        }
    } else {
        for (let index = 0; index < totalAddresses; index++) {
            addresses.push(await createAddress())
        }
    }
    return addresses
}

async function saveSuiAddressesToJson(totalAddresses, useProxies) {
    const date = new Date().getTime()
    const jsonData = JSON.stringify(await createSuiAddresses(totalAddresses, useProxies));

    fs.writeFile(`resources/suiAddresses-${date}.json`, jsonData, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
}

// saveSuiAddressesToJson(50, true)

export async function getFileWithSuiAddresses(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(data);

    return json
}
// saveSuiAddressesToJson(50, true)
