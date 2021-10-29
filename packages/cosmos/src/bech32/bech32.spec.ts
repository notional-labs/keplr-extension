import {PrivKeyEthSecp256k1} from "@keplr-wallet/crypto";
import {Bech32Address} from "./index";
import assert from "assert";

//const MNEUMONIC = "celery husband drama unaware blue empower jelly twist program say prepare page"
const PRIV_KEY = "0b0df1b5ee8e70227e26a1b954f1c20ab4c043f7b045421bf12baa043429ede6"
const ETH_ADDRESS_FROM_PRIV = "0x6cF77c4EaA3f9A2449643D5Efa1D0C43583459F2";

describe("Test eth derivation", () => {
    it("priv key should generate the eth address", () => {
        const privKey = new PrivKeyEthSecp256k1( Uint8Array.from(Buffer.from(PRIV_KEY, 'hex')));

        const pubKey = privKey.getPubKey();
        console.log(pubKey.getAddress().length);
        const address = new Bech32Address(pubKey.getAddress());
        console.log(address);
        const ethAddress = address.toBech32("", true)
        console.log(ethAddress)
        assert.strictEqual(ethAddress, ETH_ADDRESS_FROM_PRIV);
    });
});
