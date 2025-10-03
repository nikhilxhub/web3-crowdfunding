// FILE: src/components/DisplayCampaigns.tsx

import React, { useEffect, useState } from "react";
import { useStateContext } from "@/context/StateProvider";
import { useReadContract } from "thirdweb/react";
import { CampaignCard, CampaignCardSkeleton } from "./CampaignCard"; // We will create this
import { Frown } from "lucide-react";

// Define a type for our campaign object for better type safety
export interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
}

const DisplayCampaign: React.FC = () => {
  const { contract } = useStateContext();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { data, isLoading } = useReadContract({
    contract,
    method: "function getCampaigns() view returns (address[],string[],string[],uint256[],uint256[],uint256[],string[])"
  });

  useEffect(() => {
    if (data && Array.isArray(data) && data.length === 7) {
      const [owners, titles, descriptions, targets, deadlines, amounts, images] = data;

      // Reconstruct the data into an array of campaign objects
      const reconstructedCampaigns: Campaign[] = owners.map((_, i) => ({
        owner: owners[i],
        title: titles[i],
        description: descriptions[i],
        target: targets[i],
        deadline: deadlines[i],
        amountCollected: amounts[i],
        image: images[i],
      }));

      setCampaigns(reconstructedCampaigns);
    }
  }, [data]);

  const renderContent = () => {
    // 1. Loading State: Show skeleton loaders
    if (isLoading) {
      return Array(6).fill(0).map((_, index) => (
        <CampaignCardSkeleton key={index} />
      ));
    }
    
    // 2. Empty State: Show a user-friendly message
    if (campaigns.length === 0) {
      return (
        <div className="col-span-1 sm:col-span-2 md:col-span-3 flex flex-col items-center justify-center text-center bg-card border rounded-lg p-12">
            <Frown className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold">No Campaigns Found</h2>
            <p className="text-muted-foreground mt-1">
                There are currently no active campaigns. Why not create one?
            </p>
        </div>
      );
    }

    // 3. Success State: Show the campaign cards
    return campaigns.map((campaign, index) => (
      <CampaignCard
        key={index}
        id={index}
        campaign={campaign}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-left mb-8">
        All Campaigns ({isLoading ? "..." : campaigns.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default DisplayCampaign;