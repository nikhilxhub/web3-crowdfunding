import React from "react";
import { Crown } from "lucide-react";
import ThemeToggleButton from "./ui/theme-toggle-button";
import { ConnectButton } from "thirdweb/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { client } from "../client";
import { useStateContext } from "@/context/StateProvider";


export const NavBar = ({ onCreateClick }: { onCreateClick: () => void }) => {
  const { address } = useStateContext();

  const handleCreate = () => {
    if (!address) {
      toast("Please connect your wallet to create a campaign ⚡");
      return;
    }
    onCreateClick();
  };

  return (
    <nav className="flex justify-between items-center py-4 px-4 sm:px-10 md:px-20">
      <div className="flex flex-row text-4xl gap-2">
        <Crown className="size-10" /> CrowFund
      </div>

      <ConnectButton client={client} />

      <Button onClick={handleCreate}>Create Campaign</Button>

      <ThemeToggleButton />
    </nav>
  );
};
