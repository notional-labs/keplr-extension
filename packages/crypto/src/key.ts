import EC from "elliptic";
import CryptoJS from "crypto-js";

import { Buffer } from "buffer/";

export class PrivKeySecp256k1 {
  constructor(protected readonly privKey: Uint8Array) {}

  toBytes(): Uint8Array {
    return new Uint8Array(this.privKey);
  }

  getPubKey(): PubKeySecp256k1 {
    const secp256k1 = new EC.ec("secp256k1");

    const key = secp256k1.keyFromPrivate(this.privKey);

    return new PubKeySecp256k1(
      new Uint8Array(key.getPublic().encodeCompressed("array"))
    );
  }

  sign(msg: Uint8Array): Uint8Array {
    const secp256k1 = new EC.ec("secp256k1");
    const key = secp256k1.keyFromPrivate(this.privKey);

    const hash = CryptoJS.SHA256(
      CryptoJS.lib.WordArray.create(msg as any)
    ).toString();

    const signature = key.sign(Buffer.from(hash, "hex"), {
      canonical: true,
    });

    return new Uint8Array(
      signature.r.toArray("be", 32).concat(signature.s.toArray("be", 32))
    );
  }
}