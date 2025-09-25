// FILE: src/components/ui/card-hover-effect.tsx (REPLACE with this code)

"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
// import type { Campaign } from "@/components/DisplayCampaign"; // Import our Campaign type
import { CampaignCard } from "@/components/CampaignCard"; // Import our custom card
import type { Campaign } from "../DisplayCampaign";

// Define the type for the items prop to match our campaign structure
type HoverEffectProps = {
  items: {
    campaign: Campaign;
    id: number;
  }[];
  className?: string;
};

export const HoverEffect = ({ items, className }: HoverEffectProps) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          
          {/* KEY CHANGE:
            Instead of rendering a generic Card, we are now rendering 
            our custom <CampaignCard /> component.
          */}
          <div className="h-full w-full relative z-20">
             <CampaignCard id={item.id} campaign={item.campaign} />
          </div>

        </div>
      ))}
    </div>
  );
};