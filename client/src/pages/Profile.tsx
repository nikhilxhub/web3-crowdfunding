import React from "react";
import { useStateContext } from "@/context/StateProvider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { userCampaigns } = useStateContext();

  const isLoading = !userCampaigns;

  // campaign pId
  const handleWithdraw = () =>{


  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Campaigns</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[250px] w-full rounded-lg" />
          ))}

        {!isLoading && userCampaigns?.length === 0 && (
          <p className="text-muted-foreground">You haven’t created any campaigns yet.</p>
        )}

        {!isLoading &&
          userCampaigns?.map((campaign) => (
            <Card key={campaign.pId} className="hover:shadow-lg transition-shadow">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg font-semibold">{campaign.title}</CardTitle>
                <Badge variant="outline">Target: {campaign.target}</Badge>
              </CardHeader>

              <CardContent>
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {campaign.description}
                </p>
              </CardContent>

              <CardFooter className="flex flex-col">
                <div className="flex justify-between w-full text-sm text-muted-foreground">
                  <span>Deadline: {new Date(campaign.deadline * 1000).toLocaleDateString()}</span>
                  <span>Raised: Ξ{campaign.amountCollected}</span>
                </div>

      
                  <Button
                    onClick={() => handleWithdraw()}
                    className="mt-2 w-full py-4 rounded hover:bg-primary/90"
                  >
                    withdraw
                  </Button>
                
              </CardFooter>

            </Card>
          ))}
      </div>
    </div>
  );
};

export default Profile;
