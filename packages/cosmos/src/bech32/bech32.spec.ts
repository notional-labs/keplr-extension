import {PrivKeyEthSecp256k1} from "@keplr-wallet/crypto";
//import {Bech32Address} from "./index";

import assert from "assert";

// import {Bech32Address} from "./index";
//import EC from "elliptic";
import {Wallet} from 'ethers';

const MNEUMONIC = "visit drastic version push field lake suit bulb tilt private erode describe"
const ETH_ADDRESS_FROM_MNEUMONIC = "0x471C5E8e694AfB1b2212428FD760265A28124cb0";
const PRIV_KEY = "0b0df1b5ee8e70227e26a1b954f1c20ab4c043f7b045421bf12baa043429ede6"
const ETH_ADDRESS_FROM_PRIV = "0x6cF77c4EaA3f9A2449643D5Efa1D0C43583459F2";

describe('simulating construct private key from mnemonic', () => {
    it('should generate correct eth address', async () => {
        //simulate getting private key
        const wallet = Wallet.fromMnemonic(trimWordsStr(MNEUMONIC));

        const privKeyEth = new PrivKeyEthSecp256k1(wallet);
        const pubKey = privKeyEth.getPubKey()
        const addressBuffer = pubKey.getAddress();
        const publicAddress = pubKey.getAddressString();
        console.log(addressBuffer)
        assert.strictEqual(publicAddress, ETH_ADDRESS_FROM_MNEUMONIC);
    })
})

describe("Test eth derivation", () => {
    it("priv key should generate the eth address", () => {
        const privateKeyEth = new PrivKeyEthSecp256k1(new Wallet(PRIV_KEY));
        const pubKey = privateKeyEth.getPubKey()
        const addressBuffer = pubKey.getAddress();
        const publicAddress = pubKey.getAddressString();
        console.log(addressBuffer)
        assert.strictEqual(publicAddress, ETH_ADDRESS_FROM_PRIV);
    });
});

function trimWordsStr(str: string): string {
    str = str.trim();
    // Split on the whitespace or new line.
    const splited = str.split(/\s+/);
    const words = splited
      .map((word) => word.trim())
      .filter((word) => word.trim().length > 0);
    return words.join(" ");
}