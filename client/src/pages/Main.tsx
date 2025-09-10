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

const Main = ({ showForm }: { showForm: boolean }) => {
  return (
    <div className="flex justify-center px-4 sm:px-10 md:px-20 py-10 min-h-screen">
      {showForm ? (
        <Card className="w-full max-w-4xl rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Start a Campaign</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Fill out the form below to launch your fundraising campaign.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CampaignForm />
          </CardContent>

          <CardFooter className="text-xs text-muted-foreground">
            You will receive 100% of the raised amount.
          </CardFooter>
        </Card>
      ) : (
        <div className="text-center text-lg text-muted-foreground">
          👋 Welcome to CrowFund — click "Create Campaign" to get started!
        </div>
      )}
    </div>
  );
};

export default Main;
