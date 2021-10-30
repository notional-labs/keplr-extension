import {PrivKeyEthSecp256k1, Mnemonic} from "@keplr-wallet/crypto";
import {Bech32Address} from "./index";
import {Crypto} from "@keplr-wallet/background/src/keyring/crypto";
import { ScryptParams } from "@keplr-wallet/background"

import assert from "assert";
import scrypt from "scrypt-js"

const MNEUMONIC = "celery husband drama unaware blue empower jelly twist program say prepare page"
//const PRIV_KEY = "0b0df1b5ee8e70227e26a1b954f1c20ab4c043f7b045421bf12baa043429ede6"
const ETH_ADDRESS_FROM_PRIV = "0x6cF77c4EaA3f9A2449643D5Efa1D0C43583459F2";
var privKeyBuffer: Uint8Array;

describe('simulating construct private key from mnemonic', () => {
    it('always successful', async () => {
        // simulate creating and storing mnemonic
        const res = await Crypto.encrypt(
            (array) => {
                return Promise.resolve(crypto.getRandomValues(array));
            },
            {
                scrypt: async (text: string, params: ScryptParams) => {
                  return await scrypt.scrypt(
                    Buffer.from(text),
                    Buffer.from(params.salt, "hex"),
                    params.n,
                    params.r,
                    params.p,
                    params.dklen
                  );
                },
            },
            "sha256",
            "mnemonic",
            trimWordsStr(MNEUMONIC),
            "",
            {"":""},
            undefined
        )
        
        // simulate retrieving mnemonic
        const mnemonic = Buffer.from(await Crypto.decrypt(
            {
                scrypt: async (text: string, params: ScryptParams) => {
                  return await scrypt.scrypt(
                    Buffer.from(text),
                    Buffer.from(params.salt, "hex"),
                    params.n,
                    params.r,
                    params.p,
                    params.dklen
                  );
                },
            },
            res,
            ""
        )).toString();

        //simulate getting private key
        privKeyBuffer = Mnemonic.generateWalletFromMnemonic(mnemonic);
    })
})

describe("Test eth derivation", () => {
    it("priv key should generate the eth address", () => {
        const privKey = new PrivKeyEthSecp256k1(privKeyBuffer);

        const pubKey = privKey.getPubKey();
        console.log(pubKey.getAddress().length);
        const address = new Bech32Address(pubKey.getAddress());
        console.log(address);
        const ethAddress = address.toBech32("");
        console.log(ethAddress)
        assert.strictEqual(ethAddress, ETH_ADDRESS_FROM_PRIV);
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