import { Bech32Address } from "@keplr-wallet/cosmos";
import { ChainInfo } from "@keplr-wallet/types";

import {
  PRIVILEGED_ORIGINS,
  BETA_STRAIGHTEDGE_REST_CONFIG,
  BETA_STRAIGHTEDGE_RPC_CONFIG,
} from "./config.var";

export const EmbedChainInfos: ChainInfo[] = [
  {
    rpc: "http://0.0.0.0:26657",
    rpcConfig: BETA_STRAIGHTEDGE_RPC_CONFIG,
    rest: "http://0.0.0.0:1317",
    restConfig: BETA_STRAIGHTEDGE_REST_CONFIG,
    chainId: "dig-1",
    chainName: "DIG",
    stakeCurrency: {
      coinDenom: "stake",
      coinMinimalDenom: "stake",
      coinDecimals: 1,
    },
    walletUrl:
      process.env.NODE_ENV === "production"
        ? "https://wallet.keplr.app/#/straightedge/stake"
        : "http://localhost:8080/#/straightedge/stake",
    walletUrlForStaking:
      process.env.NODE_ENV === "production"
        ? "https://wallet.keplr.app/#/straightedge/stake"
        : "http://localhost:8080/#/straightedge/stake",
    bip44: {
      coinType: 118,
    },
    bech32Config: Bech32Address.defaultBech32Config("str"),
    currencies: [
      {
        coinDenom: "stake",
        coinMinimalDenom: "stake",
        coinDecimals: 1,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "stake",
        coinMinimalDenom: "stake",
        coinDecimals: 1,
      },
    ],
    coinType: 551,
    // STR's decimal is high. Thus, if gas price is set as 0.025, it produces very low and long fee.
    // And, currently, this long fee is not visible well in Keplr.
    // Just, increase the gas price step temporarily.
    gasPriceStep: {
      low: 0.01 * Math.pow(10, 12),
      average: 0.025 * Math.pow(10, 12),
      high: 0.04 * Math.pow(10, 12),
    },
    beta: true,
  }
];

// The origins that are able to pass any permission that external webpages can have.
export const PrivilegedOrigins: string[] = PRIVILEGED_ORIGINS;
