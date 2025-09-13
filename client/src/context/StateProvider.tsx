import React, { createContext, useContext, type ReactNode } from "react";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client, chain } from "../client";
import { getContract } from "thirdweb";

interface StateContextType {
  address?: string;
  balance?: string;
  symbol?: string;
  contract?:any
}

const StateContext = createContext<StateContextType>({});

export const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const account = useActiveAccount();
  const { data: balance } = useWalletBalance({
    client,
    chain,
    address: account?.address,
  });


 const contract = getContract({
    client,
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // your contract address
    chain,
  });

  

  // we need to write contract




  // we need to read contract



  

  return (
    <StateContext.Provider
      value={{
        address: account?.address,
        balance: balance?.displayValue,
        symbol: balance?.symbol,
        contract
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
