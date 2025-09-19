import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Main from "./pages/Main"
import { NavBar } from "./components/NavBar"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ThirdwebProvider } from "thirdweb/react"
import { StateContextProvider } from "./context/StateProvider"
import { Toaster } from "sonner"
import CreateCampaign from "./pages/CreateCampaign"
import CampaignDetails from "./pages/CampaignDetails"
import Profile from "./pages/Profile"
import { useEffect, useState } from "react"

const AppRoutes = () => {
  const location = useLocation()
  const hideNavbar = location.pathname === "/"

  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/createCampaign" element={<CreateCampaign />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

function App() {
  const [showLanding, setShowLanding] = useState(true)

  useEffect(() => {
    const currentPath = window.location.pathname
    if (currentPath !== "/") {
      setShowLanding(false)
    }
  }, [])

  return (
    <ThirdwebProvider>
      <StateContextProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {showLanding ? (
            <LandingPage />
          ) : (
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          )}
        </ThemeProvider>
      </StateContextProvider>
    </ThirdwebProvider>
  )
}

export default App
