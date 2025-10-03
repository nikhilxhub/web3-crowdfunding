// src/App.tsx

"use client";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThirdwebProvider } from "thirdweb/react";
import { StateContextProvider } from "./context/StateProvider";
import { Toaster } from "sonner";

// Import your components and pages
import { NavBar } from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import Main from "./pages/Main";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";
import Profile from "./pages/Profile";

/**
 * A new component that contains the layout and routing logic.
 * This is necessary so we can use the `useLocation` hook, which must be
 * inside the <BrowserRouter>.
 */
const AppContent = () => {
  const location = useLocation();
  // This logic correctly hides the navbar on the landing page
  const shouldHideNavbar = location.pathname === "/";

  return (
    <div className="relative min-h-screen w-full">
      {!shouldHideNavbar && <NavBar />}
      <main>
        <Routes>
          {/* All your pages are now defined as routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/createCampaign" element={<CreateCampaign />} />
          <Route path="/campaign/:id" element={<CampaignDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    // 1. Providers wrap everything at the top level.
    <ThirdwebProvider>
      <StateContextProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {/* 2. BrowserRouter now wraps your entire routing structure. */}
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ThemeProvider>
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

export default App;