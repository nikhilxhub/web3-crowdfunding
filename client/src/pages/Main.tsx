// Main.tsx

import DisplayCampaign from "@/components/DisplayCampaign";


const Main = () => {

  // get campaign

  return (


<div className="px-4 sm:px-10 md:px-20 py-10 min-h-screen">
      {/* Welcome message centered */}
      <div className="text-center text-lg text-muted-foreground mb-10">
        👋 Welcome to CrowdFund — click "Create Campaign" to start your own Campaign!
      </div>

      {/* Campaigns section */}
      <DisplayCampaign />
    </div>

  );
};

export default Main;
