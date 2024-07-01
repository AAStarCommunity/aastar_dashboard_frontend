import { connectorsForWallets, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { optimismSepolia, optimism } from "wagmi/chains";
import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";

export const config = getDefaultConfig({
  appName: "AAstar",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains: [optimism, optimismSepolia],
  ssr: true,
  wallets: [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, rainbowWallet, coinbaseWallet],
    },
  ],
});
