import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home/Home";
import PlayerComparison from "./pages/PlayerComaprison/PlayerComaprison";
import PremierLeague2223TopScorers from "./pages/PremierLeague2223TopScorers/PremierLeague2223TopScorers";

function App() {
  return (
    <>
      <AppNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player-comparison" element={<PlayerComparison />} />
        <Route
          path="/22-23-top-scorers"
          element={<PremierLeague2223TopScorers />}
        />
      </Routes>
    </>
  );
}

export default App;
