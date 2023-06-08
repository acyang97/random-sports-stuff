import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home/Home";
import PlayerComparison from "./pages/PlayerComaprison/PlayerComaprison";

function App() {
  return (
    <>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player-comparison" element={<PlayerComparison />} />
      </Routes>
    </>
  );
}

export default App;
