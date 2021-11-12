import bech32 from "bech32";
import web3 from "web3";
import { Bech32Config } from "@keplr-wallet/types";
import { getAddress } from "@ethersproject/address";
import { hexDataSlice } from "@ethersproject/bytes";
import { keccak256 } from "@ethersproject/keccak256";

export class Bech32Address {
  static shortenAddress(bech32: string, maxCharacters: number): string {
    if (bech32.slice(0,2) != "0x") {
      if (maxCharacters >= bech32.length) {
        return bech32;
      }

      const i = bech32.indexOf("1");
      const prefix = bech32.slice(0, i);
      const address = bech32.slice(i + 1);

      maxCharacters -= prefix.length;
      maxCharacters -= 3; // For "..."
      maxCharacters -= 1; // For "1"

      if (maxCharacters <= 0) {
        return "";
      }

      const mid = Math.floor(address.length / 2);
      let former = address.slice(0, mid);
      let latter = address.slice(mid);

      while (maxCharacters < former.length + latter.length) {
        if ((former.length + latter.length) % 2 === 1 && former.length > 0) {
          former = former.slice(0, former.length - 1);
        } else {
          latter = latter.slice(1);
        }
      }
      return prefix + "1" + former + "..." + latter;
    }
    else {
      if (maxCharacters >= bech32.length) {
        return bech32;
      }

      const i = 2 // index of element behind 0x
      const address = bech32.slice(i);

      maxCharacters -= 2; // For "0x"
      maxCharacters -= 3; // For "..."

      if (maxCharacters <= 0) {
        return "";
      }

      const mid = Math.floor(address.length / 2);
      let former = address.slice(0, mid);
      let latter = address.slice(mid);

      while (maxCharacters < former.length + latter.length) {
        if ((former.length + latter.length) % 2 === 1 && former.length > 0) {
          former = former.slice(0, former.length - 1);
        } else {
          latter = latter.slice(1);
        }
      }
      return "0x" + former + "..." + latter;
    }
  }

  static fromBech32(bech32Address: string, prefix?: string): Bech32Address {
    this.validate(bech32Address, prefix)
    if (bech32Address.slice(0,2) != "0x") {
      const decoded = bech32.decode(bech32Address);
      return new Bech32Address(new Uint8Array(decoded.words));
    }
    else {
      // remove 2 first elements "0x" of eth addr and turns it into Uint8Array


      let address = Uint8Array.from(Buffer.from(bech32Address.slice(2), 'hex'))

      // adding a 1 at the end to mark that this is an eth address
      let ethAddress = new Uint8Array(21);
      ethAddress.set(ethAddress, 0);
      return new Bech32Address(address);
    }
  }

  static validate(bech32Address: string, prefix?: string) {
    if (bech32Address.slice(0,2) != "0x") {
      const { prefix: decodedPrefix } = bech32.decode(bech32Address);
      if (prefix && prefix !== decodedPrefix) {
        throw new Error(
          `Unexpected prefix (expected: ${prefix}, actual: ${decodedPrefix})`
        );
      }
    }
    else {
      const valid = web3.utils.isAddress(bech32Address);
      if (!valid) {
        throw new Error(
          `invalid address`
        );
      }
    }
  }

  static defaultBech32Config(
    mainPrefix: string,
    validatorPrefix: string = "val",
    consensusPrefix: string = "cons",
    publicPrefix: string = "pub",
    operatorPrefix: string = "oper"
  ): Bech32Config {
    return {
      bech32PrefixAccAddr: mainPrefix,
      bech32PrefixAccPub: mainPrefix + publicPrefix,
      bech32PrefixValAddr: mainPrefix + validatorPrefix + operatorPrefix,
      bech32PrefixValPub:
        mainPrefix + validatorPrefix + operatorPrefix + publicPrefix,
      bech32PrefixConsAddr: mainPrefix + validatorPrefix + consensusPrefix,
      bech32PrefixConsPub:
        mainPrefix + validatorPrefix + consensusPrefix + publicPrefix,
    };
  }

  constructor(public readonly address: Uint8Array) {}

  toBech32(prefix: string): string {
    // if address bytes array has length of 32 then it is an eth address
    if (this.address.length == 65) {
      return getAddress(hexDataSlice(keccak256(hexDataSlice(this.address, 1)), 12));
    }
    else {
      const words = bech32.toWords(this.address);
      return bech32.encode(prefix, words);
    }
  }
}
