import { BrowserRouter, Route, Routes } from "react-router-dom"
// import { Landing } from "./pages/Landing"
import QRCodePassGenerator from "./pages/QrPage"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QRCodePassGenerator/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
