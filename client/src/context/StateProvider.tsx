import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { useActiveAccount, useWalletBalance, useReadContract } from "thirdweb/react";
import { client, chain } from "../client";
import { getContract } from "thirdweb";
import { formatEther } from "ethers";

interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
}

interface StateContextType {
  address?: string;
  balance?: string;
  symbol?: string;
  contract?: any;
  userCampaigns?: Campaign[];
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
    address: "0xb5Cd1Fa232698bB3976F97c63191Cb14B15D5F96",
    chain,
  });

  const { data: campaignsData } = useReadContract({
    contract,
    method: "function getCampaigns() view returns (address[], string[], string[], uint256[], uint256[], uint256[], string[])",
    params: [],
  });

  const userCampaigns: Campaign[] | undefined = campaignsData
    ? campaignsData[0].map((owner: string, i: number) => ({
        owner,
        title: campaignsData[1][i],
        description: campaignsData[2][i],
        target: formatEther(campaignsData[3][i]),
        deadline: Number(campaignsData[4][i]),
        amountCollected: formatEther(campaignsData[5][i]),
        image: campaignsData[6][i],
        pId: i,
      })).filter((c) => c.owner.toLowerCase() === account?.address?.toLowerCase())
    : undefined;

  return (
    <StateContext.Provider
      value={{
        address: account?.address,
        balance: balance?.displayValue,
        symbol: balance?.symbol,
        contract,
        userCampaigns,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
