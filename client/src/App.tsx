import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Main from "./pages/Main"
import { NavBar } from "./components/NavBar"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ThirdwebProvider } from "thirdweb/react"
import { useState } from "react"
import { StateContextProvider } from "./context/StateProvider"
import { Toaster } from "sonner"



function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <ThirdwebProvider>
      <StateContextProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
    <div>
       <NavBar onCreateClick={() => setShowForm(true)} />
      

     <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/main" element={<Main showForm={showForm} />} />

          </Routes>
      </BrowserRouter>

    </div>

    </ThemeProvider>
    </StateContextProvider>

    </ThirdwebProvider>


  )
}

export default App
