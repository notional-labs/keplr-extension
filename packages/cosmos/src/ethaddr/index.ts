import web3 from "web3";

export class EthAddress {
  static shortenAddress(eth: string, maxCharacters: number): string {
    if (maxCharacters >= eth.length) {
      return eth;
    }

    const i = 2 // index of element behind 0x
    const address = eth.slice(i);

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

  static fromEth(ethAddress: string): EthAddress {
    // remove 2 first elements "0x" of eth addr and turns it into Uint8Array
    let address = Uint8Array.from(Buffer.from(ethAddress.slice(2), 'hex'));

    return new EthAddress(address);
  }

  static validate(ethAddress: string) {
    web3.utils.toChecksumAddress(ethAddress);
  }

  constructor(public readonly address: Uint8Array) {}

  toEth(): string {
    return "0x" + Buffer.from(this.address).toString('hex');
  }
}
