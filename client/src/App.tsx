import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import Main from "./pages/Main"
import { NavBar } from "./components/NavBar"
import { ThemeProvider } from "@/components/ui/theme-provider"
import { ThirdwebProvider } from "thirdweb/react"
import { useState } from "react"



function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <ThirdwebProvider>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
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

    </ThirdwebProvider>


  )
}

export default App
