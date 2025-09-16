import React from "react";
import { Crown, User } from "lucide-react";
import ThemeToggleButton from "./ui/theme-toggle-button";
import { ConnectButton } from "thirdweb/react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { client } from "../client";
import { useStateContext } from "@/context/StateProvider";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

export const NavBar = () => {
  const { address } = useStateContext();
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!address) {
      toast("Please connect your wallet to create a campaign ⚡");
      return;
    }
    navigate("/createCampaign");
  };

  return (
    <nav className="flex justify-between items-center py-4 px-4 sm:px-10 md:px-20">
      <div className="flex flex-row text-4xl gap-2">
        <Crown className="size-10" /> CrowdFund
      </div>

      <div className="flex gap-4 items-center">
        <ConnectButton client={client} />

        <Button onClick={handleCreate}>Create Campaign</Button>

        <div
          onClick={() => navigate("/profile")}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          {/* <Avatar>
            <AvatarImage
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${address}`}
              alt="User Avatar"
            />
            <AvatarFallback>
            </AvatarFallback>
            </Avatar> */}
            <User />
        </div>

        <ThemeToggleButton />
      </div>
    </nav>
  );
};
