import EC from "elliptic";
import CryptoJS from "crypto-js";
import { keccak } from 'ethereumjs-util';
import { publicKeyConvert } from 'secp256k1';
import assert from "assert";
// import { Buffer } from "buffer/";


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

export class PubKeySecp256k1 {
  constructor(protected readonly pubKey: Uint8Array) {}

  toBytes(): Uint8Array {
    return new Uint8Array(this.pubKey);
  }

  getAddress(): Uint8Array {
    let pubKeyBuffer = Buffer.from(publicKeyConvert(this.pubKey, false).slice(1)) 
    
    assert(pubKeyBuffer.length === 64)
    // Only take the lower 168bits of the hash, the last 8 bits (1 byte) indicate that this is an eth address
    let address = new Uint8Array(21) 
    address.set(keccak(pubKeyBuffer).slice(-20), 0)
    return address
  }
}