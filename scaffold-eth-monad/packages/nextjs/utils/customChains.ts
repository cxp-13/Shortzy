import { defineChain } from "viem";

// TODO: Add Chain details here.
export const monadTestnet = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: {
      // TODO: Add Monad RPC URL
      http: ["https://monad-testnet.g.alchemy.com/v2/Rna75_AevX3G8uiycW_XR"],
    },
  },
  blockExplorers: {
    default: {
      name: "Monad Testnet Blockscout",
      // TODO: Add Explorer URL
      url: "https://testnet.monadexplorer.com",
    },
  },
});
