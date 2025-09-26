import React from "react";
import { Menu, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeToggleButton from "./ui/theme-toggle-button";

// Define the props the component will accept
interface MobileMenuProps {
  address: string | undefined;
  handleCreate: () => void;
  handleProfile: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  address,
  handleCreate,
  handleProfile,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="grid gap-4 py-6">
          {/* We only show "Create" and "Profile" links if the user is connected */}
          {address && (
            <>
              <SheetClose asChild>
                <Button
                  onClick={handleCreate}
                  variant="ghost"
                  className="justify-start text-base"
                >
                  Create Campaign
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  onClick={handleProfile}
                  variant="ghost"
                  className="justify-start text-base"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </SheetClose>
            </>
          )}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-muted-foreground">Switch Theme</span>
            <ThemeToggleButton />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};