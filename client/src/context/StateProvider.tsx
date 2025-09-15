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
    // address: "0x58830b6f4549293577148e70F0C2Dbb5608Ea181", // your contract address
    address: "0xb5Cd1Fa232698bB3976F97c63191Cb14B15D5F96", // your contract address
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
