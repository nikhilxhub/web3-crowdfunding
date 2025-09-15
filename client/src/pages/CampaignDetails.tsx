import React from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "@/context/StateProvider";
import { useReadContract } from "thirdweb/react";
import type { Campaign } from "@/type";




const CampaignDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { contract } = useStateContext();

  const { data: campaigns, isLoading } = useReadContract({
    contract,
    // method:
    //   "function getCampaigns() view returns (tuple(address,string,string,uint256,uint256,uint256,string,address[],uint256[])[])",

    method: "function getCampaigns() view returns (address[],string[],string[],uint256[],uint256[],uint256[],string[])"

  }) as {
    data: Campaign[] | undefined;
    isLoading: boolean;
  };

  const campaign = campaigns?.[Number(id)] as Campaign | undefined;

  if (isLoading) return <p className="text-center mt-10">Loading campaign...</p>;
  if (!campaign) return <p className="text-center mt-10">Campaign not found.</p>;

  const [
    owner,
    title,
    description,
    target,
    deadline,
    amountCollected,
    image,
    donators,
    donations,
  ] = campaign;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-card rounded-lg shadow-md border border-muted">
      <img src={image} alt={title} className="w-full h-64 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{title}</h1>
      <p className="text-muted-foreground mt-2">{description}</p>
      <div className="mt-4 space-y-2">
        <p><strong>Creator:</strong> {owner}</p>
        <p><strong>Target:</strong> {Number(target) / 10 ** 18} ETH</p>
        <p><strong>Raised:</strong> {Number(amountCollected) / 10 ** 18} ETH</p>
        <p><strong>Deadline:</strong> {new Date(Number(deadline)).toLocaleDateString()}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Donators</h2>
        {donators.length === 0 ? (
          <p className="text-muted-foreground">No donations yet.</p>
        ) : (
          <ul className="space-y-1">
            {donators.map((donator, index) => (
              <li key={index} className="text-sm">
                {donator} — {Number(donations[index]) / 10 ** 18} ETH
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CampaignDetails;
