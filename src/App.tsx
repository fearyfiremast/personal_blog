import {  Routes, Route  } from "react-router"

import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="flex flex-col h-[min(100vh)]">
      <NavBar/>
      <main className="flex grow">
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </main>
      <Footer/>
    </div>
  )
}

export default App
