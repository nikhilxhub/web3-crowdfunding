import React, { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "@/context/StateProvider";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import { prepareContractCall, toEther } from "thirdweb";
import { toast } from "sonner";

// Import UI components from shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
 
  CardFooter,
  CardHeader,

} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ArrowLeftIcon, InfoIcon } from "lucide-react";

// --- Helper Functions ---

/**
 * Truncates an Ethereum address for better display.
 * @param address The full Ethereum address string.
 * @returns A shortened version like "0x1234...5678".
 */
const truncateAddress = (address: string) => {
  if (!address) return "N/A";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Calculates the number of days left until a deadline.
 * @param deadline The deadline timestamp from the smart contract (in seconds).
 * @returns A string indicating the time left or if the campaign has ended.
 */
const calculateDaysLeft = (deadline: bigint) => {
  // Solidity timestamps are in seconds, JS Date needs milliseconds
  const deadlineDate = new Date(Number(deadline) * 1000);
  const now = new Date();
  const difference = deadlineDate.getTime() - now.getTime();

  if (difference <= 0) {
    return { text: "Campaign Ended", value: 0, hasEnded: true };
  }

  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return { text: `${days} ${days === 1 ? 'Day' : 'Days'} Left`, value: days, hasEnded: false };
};

// --- Main Component ---

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contract } = useStateContext();
  const [campaign, setCampaign] = useState<any | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>("");
  const navigate = useNavigate();

  // Fetch all campaigns data
  const { data, isLoading } = useReadContract({
    contract,
    method:
      "function getCampaigns() view returns (address[],string[],string[],uint256[],uint256[],uint256[],string[])",
  });

  // Setup the transaction hook
  const { mutate: sendTx, isPending } = useSendTransaction();

  // Effect to parse and set the specific campaign data
  useEffect(() => {
    if (data && Array.isArray(data) && data.length === 7 && id !== undefined) {
      const index = Number(id);
      const [owners, titles, descriptions, targets, deadlines, amounts, images] = data;

      // Check if the index is valid for all returned arrays
      if (owners?.[index] !== undefined) {
        setCampaign({
          owner: owners[index],
          title: titles[index],
          description: descriptions[index],
          target: targets[index],
          deadline: deadlines[index],
          amountCollected: amounts[index],
          image: images[index],
        });
      } else {
        setCampaign(null); // Campaign not found for this ID
      }
    }
  }, [data, id]);

  // Memoize derived campaign values to prevent recalculations on every render
  const campaignDetails = useMemo(() => {
    if (!campaign) return null;

    const targetEth = parseFloat(toEther(campaign.target));
    const collectedEth = parseFloat(toEther(campaign.amountCollected));
    const progress = targetEth > 0 ? (collectedEth / targetEth) * 100 : 0;
    const daysLeft = calculateDaysLeft(campaign.deadline);

    return {
      targetEth,
      collectedEth,
      progress,
      daysLeft,
    };
  }, [campaign]);

  // Function to handle the donation transaction
  const handleDonate = async () => {
    if (!donationAmount || isNaN(Number(donationAmount)) || Number(donationAmount) <= 0) {
        toast.error("Please enter a valid donation amount.");
        return;
    }

    try {
      const tx = prepareContractCall({
        contract,
        method: "function donateToCampaign(uint256 _id) payable",
        params: [BigInt(id!)],
        value: BigInt(Math.floor(Number(donationAmount) * 10 ** 18)), // ETH → Wei
      });

      sendTx(tx, {
        onSuccess: () => {
          toast.success("Donation successful!", {
            description: "Thank you for your contribution.",
          });
          setDonationAmount("");
          // Consider refetching data here to update the UI instantly
        },
        onError: (err) => {
          console.error("Donation failed:", err);
          toast.error("Donation Failed", {
            description: "The transaction could not be completed.",
          });
        },
      });
    } catch (err) {
      console.error("Error preparing transaction:", err);
      toast.error("An unexpected error occurred.");
    }
  };

  // --- Render Logic ---

  if (isLoading) {
    return <p className="text-center mt-20">Loading campaign details...</p>;
  }

  if (!campaign || !campaignDetails) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Campaign Not Found</h1>
        <p className="text-muted-foreground mt-2">
          The campaign you are looking for might not exist.
        </p>
        <Button onClick={() => navigate("/main")} className="mt-6">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Campaigns
        </Button>
      </div>
    );
  }

  const { targetEth, collectedEth, progress, daysLeft } = campaignDetails;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6 flex items-center text-muted-foreground"
        onClick={() => navigate("/main")}
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Back to all campaigns
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
        {/* Left Column: Image and Details */}
        <div className="md:col-span-3">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-auto aspect-video object-cover rounded-xl border"
          />
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">
              Created by:{" "}
              <span className="font-mono text-primary">{truncateAddress(campaign.owner)}</span>
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">{campaign.title}</h1>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
              {campaign.description}
            </p>
          </div>
        </div>

        {/* Right Column: Stats and Donation Card */}
        <div className="md:col-span-2">
          <Card className="sticky top-24">
            <CardHeader>
              <div className="flex justify-between items-baseline">
                <div>
                  <span className="text-3xl font-bold">{collectedEth.toFixed(4)} ETH</span>
                  <p className="text-muted-foreground">
                    raised of {targetEth} ETH goal
                  </p>
                </div>
                {daysLeft.hasEnded ? (
                    <span className="text-red-500 font-semibold bg-red-100 px-3 py-1 rounded-full text-sm">Ended</span>
                ) : (
                    <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full text-sm">{daysLeft.text}</span>
                )}
              </div>
              <Progress value={progress} className="mt-4" />
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Make a Contribution</h2>
              <div className="flex flex-col gap-4">
                <div className="relative">
                   <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.0"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    disabled={daysLeft.hasEnded || isPending}
                    className="w-full border rounded-md px-3 py-2 pr-14 text-lg"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">ETH</span>
                </div>

                <Button
                  onClick={handleDonate}
                  disabled={daysLeft.hasEnded || isPending || !donationAmount}
                  size="lg"
                  className="w-full"
                >
                  {isPending ? "Confirming..." : (daysLeft.hasEnded ? "Campaign Ended" : "Donate Now")}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
                 <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <InfoIcon className="h-4 w-4" />
                    Transactions are secure and processed on the blockchain.
                </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;