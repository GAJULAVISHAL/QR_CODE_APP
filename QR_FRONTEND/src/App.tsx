import { BrowserRouter, Route, Routes } from "react-router-dom"
import QRCodePassGenerator from "./pages/QrPage"
import { Pass } from "./components/Pass"
import SignupForm from "./pages/Signup"
import { Login } from "./pages/Login"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupForm/>}/>
          <Route path="/qrPage" element={<QRCodePassGenerator/>}/>
          <Route path="/pass/:id" element={<Pass/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
