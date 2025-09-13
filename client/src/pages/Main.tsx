// Main.tsx
import { CampaignForm } from "@/components/CreateCampaignForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const Main = () => {
  return (



    <div className="flex justify-center px-4 sm:px-10 md:px-20 py-10 min-h-screen">
      
        <div className="text-center text-lg text-muted-foreground">


          {/* nrml component */}
          👋 Welcome to CrowFund — click "Create Campaign" to get started!
        </div>
      
    </div>
  );
};

export default Main;
