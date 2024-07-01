export const NET_LIST = [
  "ethereum-mainnet",
  "ethereum-sepolia",
  "optimism-mainnet",
  "optimism-sepolia",
  "arbitrum-one",
  "arbitrum-nova",
  "arbitrum-sepolia",
  "scroll-mainnet",
  "scroll-sepolia",
  "base-mainnet",
  "base-sepolia",
];

export const AUTH_WHITE_LIST = ["/login", "/oauth/github"];

type NetWork = {
  networkName : string;
  networkId : string;
}
export const NEW_DETAIL_LIST: NetWork[] = [
  {
    networkName: "Ethereum Mainnet",
    networkId: "ethereum-mainnet",
  },
  {
    networkName: "Ethereum Sepolia",
    networkId: "ethereum-sepolia",
  },
  {
    networkName: "Optimism Mainnet",
    networkId: "optimism-mainnet",
  },
  {
    networkName: "Optimism Sepolia",
    networkId: "optimism-sepolia",
  },
  {
    networkName: "Arbitrum One",
    networkId: "arbitrum-one",
  },
  {
    networkName: "Arbitrum Nova",
    networkId: "arbitrum-nova",
  },
  {
    networkName: "Arbitrum Sepolia",
    networkId: "arbitrum-sepolia",
  },
  {
    networkName: "Scroll Mainnet",
    networkId: "scroll-mainnet",
  },
  {
    networkName: "Scroll Sepolia",
    networkId: "scroll-sepolia",
  },
  {
    networkName: "Base Mainnet",
    networkId: "base-mainnet",
  },
  {
    networkName: "Base Sepolia",
    networkId: "base-sepolia",
  },
 
];