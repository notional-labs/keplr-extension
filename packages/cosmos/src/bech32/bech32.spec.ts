import {PrivKeyEthSecp256k1} from "@keplr-wallet/crypto";
// import {Bech32Address} from "./index";
import assert from "assert";
//import EC from "elliptic";
import * as util from 'ethereumjs-util';
import Wallet from 'ethereumjs-wallet';
//const MNEUMONIC = "celery husband drama unaware blue empower jelly twist program say prepare page"
const PRIV_KEY = "0b0df1b5ee8e70227e26a1b954f1c20ab4c043f7b045421bf12baa043429ede6"
const ETH_ADDRESS_FROM_PRIV = "0x6cF77c4EaA3f9A2449643D5Efa1D0C43583459F2";

describe("Test eth derivation", () => {
    it("priv key should generate the eth address", () => {
        const privateKeyEth = new PrivKeyEthSecp256k1(util.toBuffer(util.addHexPrefix(PRIV_KEY)))
        const privateKeyBuffer = util.toBuffer(util.addHexPrefix(PRIV_KEY));
        const wallet = Wallet.fromPrivateKey(privateKeyBuffer);
        const publicAddress = wallet.getAddressString();

        assert.strictEqual(publicAddress, ETH_ADDRESS_FROM_PRIV);
    });
});
