import {PrivKeySecp256k1, Mnemonic} from "@keplr-wallet/crypto";
import assert from "assert";
import * as util from 'ethereumjs-util';
import {Bech32Address} from "./index";
//import EC from "elliptic";

const MNEMONIC = "visit drastic version push field lake suit bulb tilt private erode describe"
const ETH_ADDRESS_FROM_MNEUMONIC = "0x471C5E8e694AfB1b2212428FD760265A28124cb0";
const PRIV_KEY = "0b0df1b5ee8e70227e26a1b954f1c20ab4c043f7b045421bf12baa043429ede6"
const ETH_ADDRESS_FROM_PRIV = "0x6cF77c4EaA3f9A2449643D5Efa1D0C43583459F2";

describe('Test eth derivation from mnemonic', () => {
    it('should generate correct eth address', async () => {
        const privKey = new PrivKeySecp256k1(Mnemonic.generateWalletFromMnemonic(MNEMONIC));
        
        const address = new Bech32Address(privKey.getPubKey().getAddress());
        const publicAddress = address.toBech32("");

        assert.strictEqual(publicAddress, ETH_ADDRESS_FROM_MNEUMONIC);
    })
})

describe("Test eth derivation", () => {
    it("priv key should generate the eth address", () => {
        const privKey = new PrivKeySecp256k1(util.toBuffer(util.addHexPrefix(PRIV_KEY)))
        const address = new Bech32Address(privKey.getPubKey().getAddress());
        const publicAddress = address.toBech32("");

        assert.strictEqual(publicAddress, ETH_ADDRESS_FROM_PRIV);
    });
});
