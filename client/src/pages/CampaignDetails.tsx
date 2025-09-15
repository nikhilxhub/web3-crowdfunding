import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "@/context/StateProvider";
import { useReadContract, useSendTransaction } from "thirdweb/react";
import { prepareContractCall } from "thirdweb";
import { toast } from "sonner";

const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contract } = useStateContext();
  const [campaign, setCampaign] = useState<any | null>(null);
  const [donationAmount, setDonationAmount] = useState<string>("");

  const { data, isLoading } = useReadContract({
    contract,
    method:
      "function getCampaigns() view returns (address[],string[],string[],uint256[],uint256[],uint256[],string[])",
  });

  const { mutate: sendTx, isPending } = useSendTransaction();

  useEffect(() => {
    if (data && Array.isArray(data) && data.length === 7 && id !== undefined) {
      const index = Number(id);
      const [owners, titles, descriptions, targets, deadlines, amounts, images] = data;

      if (
        owners.length > index &&
        titles.length > index &&
        descriptions.length > index &&
        targets.length > index &&
        deadlines.length > index &&
        amounts.length > index &&
        images.length > index
      ) {
        setCampaign({
          owner: owners[index],
          title: titles[index],
          description: descriptions[index],
          target: targets[index],
          deadline: deadlines[index],
          amountCollected: amounts[index],
          image: images[index],
        });
      }
    }
  }, [data, id]);

  const handleDonate = async () => {
    if (!donationAmount || isNaN(Number(donationAmount))) return;

    try {
      const tx = prepareContractCall({
        contract,
        method: "function donateToCampaign(uint256 _id) payable",
        params: [Number(id)],
        value: BigInt(Math.floor(Number(donationAmount) * 10 ** 18)), // ETH → Wei
      });

      sendTx(tx, {
        onSuccess: () => {
          toast.success("Donation successful!");
          setDonationAmount("");
        },
        onError: (err) => {
          console.error(err);
          alert("Donation failed.");
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading campaign...</p>;
  if (!campaign) return <p className="text-center mt-10">Campaign not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-card rounded-lg shadow-md border border-muted">
      <img
        src={campaign.image}
        alt={campaign.title}
        className="w-full h-64 object-cover rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{campaign.title}</h1>
      <p className="text-muted-foreground mt-2">{campaign.description}</p>
      <div className="mt-4 space-y-2">
        <p>
          <strong>Creator:</strong> {campaign.owner}
        </p>
        <p>
          <strong>Target:</strong> {Number(campaign.target) / 10 ** 18} ETH
        </p>
        <p>
          <strong>Raised:</strong> {Number(campaign.amountCollected) / 10 ** 18} ETH
        </p>
        <p>
          <strong>Deadline:</strong>{" "}
          {new Date(Number(campaign.deadline)).toLocaleDateString()}
        </p>
      </div>

      {/* Donate Section */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-lg font-semibold mb-2">Donate to this campaign</h2>
        <div className="flex gap-2">
          <input
            type="number"
            step="0.001"
            placeholder="Amount in ETH"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="border rounded px-3 py-2 flex-1"
          />
          <button
            onClick={handleDonate}
            disabled={isPending}
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 disabled:opacity-50"
          >
            {isPending ? "Donating..." : "Donate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
