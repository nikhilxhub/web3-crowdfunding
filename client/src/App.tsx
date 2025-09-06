import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Main from "./components/Main"

function App() {


  return (
     <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/main" element={<Main />} />

          </Routes>
      </BrowserRouter>
  )
}

export default App
