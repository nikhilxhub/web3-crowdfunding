// FILE: src/components/CampaignCard.tsx

import React from "react";
import { Link } from "react-router-dom";
import { toEther } from "thirdweb";
import type { Campaign } from "./DisplayCampaign"; // Import the type

// UI Imports
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Target } from "lucide-react";

interface CampaignCardProps {
  id: number;
  campaign: Campaign;
}

// --- Helper Functions ---
const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;
const calculateDaysLeft = (deadline: bigint) => {
  const difference = new Date(Number(deadline) * 1000).getTime() - new Date().getTime();
  if (difference <= 0) return { text: "Ended", value: 0 };
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return { text: `${days} Days Left`, value: days };
};

// --- Main Card Component ---
export const CampaignCard: React.FC<CampaignCardProps> = ({ id, campaign }) => {
  const daysLeft = calculateDaysLeft(campaign.deadline);
  const collectedEth = parseFloat(toEther(campaign.amountCollected));
  const targetEth = parseFloat(toEther(campaign.target));
  const progress = targetEth > 0 ? (collectedEth / targetEth) * 100 : 0;

  return (
    <Link to={`/campaign/${id}`} className="block group">
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader className="p-0">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-48 object-cover"
          />
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg truncate">{campaign.title}</h3>
          {/* <p className="text-xs font-semibold text-primary uppercase mb-2">Education</p> */}
          <p className="text-sm text-muted-foreground mt-2 h-10 overflow-hidden">
            {campaign.description.slice(0, 80)}...
          </p>
        </CardContent>
        <CardFooter className="p-4 flex flex-col items-start">
            <div className="w-full mb-3">
                <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-semibold">{collectedEth.toFixed(3)} ETH</span>
                    <span className="text-muted-foreground">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2"/>
            </div>
            <div className="w-full flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4" />
                    <span>{targetEth} ETH</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span className={daysLeft.value === 0 ? "text-red-500 font-semibold" : ""}>
                        {daysLeft.text}
                    </span>
                </div>
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

// --- Skeleton Loader Component ---
export const CampaignCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden">
    <Skeleton className="w-full h-48" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="p-4 pt-0 space-y-3">
        <Skeleton className="h-2 w-full" />
        <div className="flex justify-between">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/3" />
        </div>
    </div>
  </Card>
);