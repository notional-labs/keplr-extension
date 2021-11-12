import { Bech32Address } from "@keplr-wallet/cosmos";
import { ChainInfo } from "@keplr-wallet/types";

import {
  PRIVILEGED_ORIGINS,
  COSMOS_REST_CONFIG,
  COSMOS_REST_ENDPOINT,
  COSMOS_RPC_CONFIG,
  COSMOS_RPC_ENDPOINT,
  OSMOSIS_REST_CONFIG,
  OSMOSIS_REST_ENDPOINT,
  OSMOSIS_RPC_CONFIG,
  OSMOSIS_RPC_ENDPOINT,
  KAVA_REST_CONFIG,
  KAVA_REST_ENDPOINT,
  KAVA_RPC_CONFIG,
  KAVA_RPC_ENDPOINT,
  SECRET_NETWORK_REST_CONFIG,
  SECRET_NETWORK_REST_ENDPOINT,
  SECRET_NETWORK_RPC_CONFIG,
  SECRET_NETWORK_RPC_ENDPOINT,
  BETA_CYBER_NETWORK_REST_ENDPOINT,
  BETA_CYBER_NETWORK_REST_CONFIG,
  BETA_CYBER_NETWORK_RPC_ENDPOINT,
  BETA_CYBER_NETWORK_RPC_CONFIG,
  BETA_STRAIGHTEDGE_REST_ENDPOINT,
  BETA_STRAIGHTEDGE_REST_CONFIG,
  BETA_STRAIGHTEDGE_RPC_ENDPOINT,
  BETA_STRAIGHTEDGE_RPC_CONFIG,
  AKASH_RPC_ENDPOINT,
  AKASH_RPC_CONFIG,
  AKASH_REST_ENDPOINT,
  AKASH_REST_CONFIG,
  CRYPTO_ORG_RPC_ENDPOINT,
  CRYPTO_ORG_RPC_CONFIG,
  CRYPTO_ORG_REST_ENDPOINT,
  CRYPTO_ORG_REST_CONFIG,
  IOV_RPC_ENDPOINT,
  IOV_RPC_CONFIG,
  IOV_REST_ENDPOINT,
  IOV_REST_CONFIG,
  CERTIK_RPC_ENDPOINT,
  CERTIK_RPC_CONFIG,
  CERTIK_REST_ENDPOINT,
  CERTIK_REST_CONFIG,
  SIFCHAIN_RPC_ENDPOINT,
  SIFCHAIN_RPC_CONFIG,
  SIFCHAIN_REST_ENDPOINT,
  SIFCHAIN_REST_CONFIG,
  IRIS_RPC_ENDPOINT,
  IRIS_RPC_CONFIG,
  IRIS_REST_ENDPOINT,
  IRIS_REST_CONFIG,
  REGEN_RPC_ENDPOINT,
  REGEN_RPC_CONFIG,
  REGEN_REST_ENDPOINT,
  REGEN_REST_CONFIG,
  SENTINEL_RPC_ENDPOINT,
  SENTINEL_RPC_CONFIG,
  SENTINEL_REST_ENDPOINT,
  SENTINEL_REST_CONFIG,
  PERSISTENCE_RPC_ENDPOINT,
  PERSISTENCE_RPC_CONFIG,
  PERSISTENCE_REST_ENDPOINT,
  PERSISTENCE_REST_CONFIG,
  IXO_RPC_ENDPOINT,
  IXO_RPC_CONFIG,
  IXO_REST_ENDPOINT,
  IXO_REST_CONFIG,
  EMONEY_RPC_ENDPOINT,
  EMONEY_RPC_CONFIG,
  EMONEY_REST_ENDPOINT,
  EMONEY_REST_CONFIG,
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
  },
  {
    rpc: "http://0.0.0.0:26657",
    rpcConfig: BETA_STRAIGHTEDGE_RPC_CONFIG,
    rest: "http://0.0.0.0:1317",
    restConfig: BETA_STRAIGHTEDGE_REST_CONFIG,
    chainId: "dig-1",
    chainName: "DIGbutit'sfewercomplicant",
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
  },
];

// The origins that are able to pass any permission that external webpages can have.
export const PrivilegedOrigins: string[] = PRIVILEGED_ORIGINS;
