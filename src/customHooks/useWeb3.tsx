import * as React from "react";
import Web3 from "web3";

const WebContext = React.createContext<Web3 | null>(null);
const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");

export function WebProvider({ children }: { children: React.ReactNode }) {
  return <WebContext.Provider value={web3}>{children}</WebContext.Provider>;
}

export function useWeb3() {
  const context = React.useContext(WebContext);

  if (!context) {
    throw new Error("useWeb3 must be used within a WebProvider");
  }

  return context;
}
