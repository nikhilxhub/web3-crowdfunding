import React from "react";
import { Crown, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "thirdweb/react";
import { client } from "../client";
import { useStateContext } from "@/context/StateProvider";

import { Button } from "./ui/button";
import ThemeToggleButton from "./ui/theme-toggle-button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MobileMenu } from "./MobileMenu"; // <-- Import the new component

export const NavBar = () => {
  const { address } = useStateContext();
  const navigate = useNavigate();

  const handleCreate = () => navigate("/createCampaign");
  const handleProfile = () => navigate("/profile");

  return (
    <nav className="flex justify-between items-center py-4 px-4 sm:px-10 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-2xl md:text-3xl font-bold cursor-pointer"
      >
        <Crown className="size-8 md:size-10 text-primary" />
        <span className="hidden sm:inline">CrowdFund</span>
      </div>

      {/* === Right-side actions === */}
      <div className="flex items-center gap-4">
        {/* Desktop Menu (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-4">
          <ConnectButton client={client} />
          {address && <Button onClick={handleCreate}>Create Campaign</Button>}
          {address && (
            <div
              onClick={handleProfile}
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
          )}
          <ThemeToggleButton />
        </div>

        {/* Mobile Menu Trigger (only visible on mobile) */}
        <div className="md:hidden flex items-center gap-2">
          {/* Keep ConnectButton visible on mobile for easy access */}
          <ConnectButton client={client} connectButton={{style: {fontSize: '0.875rem', padding: '8px 12px'}}} />
          <MobileMenu
            address={address}
            handleCreate={handleCreate}
            handleProfile={handleProfile}
          />
        </div>
      </div>
    </nav>
  );
};