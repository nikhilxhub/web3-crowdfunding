import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "@/context/StateProvider";
import { useReadContract } from "thirdweb/react";
import { Button } from "./ui/button";

const DisplayCampaign = () => {
  const { contract } = useStateContext();
  console.log("contract:", contract);

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const navigate = useNavigate();

  const { data, isLoading } = useReadContract({
    contract,
    // method: "getCampaigns()"
    // method: "function getCampaigns() view returns (tuple(address,string,string,uint256,uint256,uint256,string,address[],uint256[])[])"
    method: "function getCampaigns() view returns (address[],string[],string[],uint256[],uint256[],uint256[],string[])"

    // method: " getCampaigns() view returns (tuple(address,string,string,uint256,uint256,uint256,string,address[],uint256[])[])",
  });
  console.log(data);



  // useEffect(() => {
  //   if (data) {
  //     setCampaigns(Array.isArray(data) ? data : [data]);

  //   }
  // }, [data]);

  useEffect(() => {
    if (data && Array.isArray(data) && data.length === 7) {
      const [owners, titles, descriptions, targets, deadlines, amounts, images] = data;

      const reconstructed = owners.map((_, i) => ({
        owner: owners[i],
        title: titles[i],
        description: descriptions[i],
        target: targets[i],
        deadline: deadlines[i],
        amountCollected: amounts[i],
        image: images[i],
      }));

      setCampaigns(reconstructed);
    }
  }, [data]);



  console.log("typeof data:", typeof data);
  console.log("isArray:", Array.isArray(data));
  console.log("data:", data);


  const handleNavigate = (id: number) => {
    navigate(`/campaign/${id}`);
  };

  return (
    <div className="mt-10 w-full">
      <h1 className="font-semibold text-[18px] text-left mb-6">
        All Campaigns ({campaigns.length})
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {isLoading ? (
          <p className="text-muted-foreground">Loading campaigns...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-muted-foreground">No campaigns found.</p>
        ) : (
          campaigns.map((campaign, index) => (
            <div
              key={index}
              className="bg-card rounded-lg shadow-md overflow-hidden border border-muted"
            >
              {/* <img
                src={campaign[6]}
                alt={campaign[1]}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-bold">{campaign[1]}</h2>
                <p className="text-sm text-muted-foreground">
                  {campaign[2].slice(0, 80)}...
                </p>
                <p className="text-sm">
                  <strong>Creator:</strong> {campaign[0].slice(0, 10)}...
                </p>
                <p className="text-sm">
                  <strong>Raised:</strong>{" "}
                  {Number(campaign[5]) / 10 ** 18} ETH
                </p>
                <p className="text-sm">
                  <strong>Deadline:</strong>{" "}
                  {new Date(Number(campaign[4])).toLocaleDateString()}
                </p> */}


              {/* new code */}

              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-48 object-cover"
              />
              <h2 className="text-lg font-bold">{campaign.title}</h2>
              <p className="text-sm text-muted-foreground">
                {campaign.description.slice(0, 80)}...
              </p>
              <p className="text-sm">
                <strong>Creator:</strong> {campaign.owner.slice(0, 10)}...
              </p>
              <p className="text-sm">
                <strong>Raised:</strong>{" "}
                {Number(campaign.amountCollected) / 10 ** 18} ETH
              </p>
              <p className="text-sm">
                <strong>Deadline:</strong>{" "}
                {new Date(Number(campaign.deadline)).toLocaleDateString()}
              </p>

              <Button
                // onClick={() => navigate(`/donate/${index}`)}
                onClick={() => handleNavigate(index)}
                className="mt-2 w-full  py-6 rounded hover:bg-primary/90"
              >
                Donate
              </Button>
            </div>
            // </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DisplayCampaign;
