import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Details from "./pages/Details"

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Details />} path="/stock/:name" />
      </Routes>
    </>
  )
}

export default App