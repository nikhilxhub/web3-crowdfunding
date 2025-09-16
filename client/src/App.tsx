import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Main from "./pages/Main"
import { NavBar } from "./components/NavBar"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ThirdwebProvider } from "thirdweb/react"
import { useState } from "react"
import { StateContextProvider } from "./context/StateProvider"
import { Toaster } from "sonner"
import CreateCampaign from "./pages/CreateCampaign"
import CampaignDetails from "./pages/CampaignDetails"
import Profile from "./pages/Profile"



function App() {


  return (
    <ThirdwebProvider>
      <StateContextProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
    <div>
      

     <BrowserRouter>
       <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/main" element={<Main />} />
            <Route path="/createCampaign" element={<CreateCampaign />} />
             <Route path="/campaign/:id" element={<CampaignDetails />} />
             <Route path="/profile" element={<Profile />} />

          </Routes>
      </BrowserRouter>

    </div>

    </ThemeProvider>
    </StateContextProvider>

    </ThirdwebProvider>


  )
}

export default App
