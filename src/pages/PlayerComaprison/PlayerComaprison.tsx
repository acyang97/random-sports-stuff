import { useState } from "react";
import PlayerSelect from "./PlayerSelect";
import BarChart from "./BarChart";
import { getSelectedPlayersFullData } from "./utils";

const BAR_CHART_DATA = [
  { label: "Apples", value: 100 },
  { label: "Bananas", value: 200 },
  { label: "Oranges", value: 50 },
  { label: "Kiwis", value: 150 },
];

const PlayerComparison = () => {
  const [playerOne, setPlayerOne] = useState("B. Saka");
  const [playerTwo, setPlayerTwo] = useState("K. De Bruyne");
  const [playerThree, setPlayerThree] = useState("M. Rashford");
  const [playerFour, setPlayerFour] = useState("Son Heung-min");
  const [playerFive, setPlayerFive] = useState("Gabriel Martinelli");
  const [playerSix, setPlayerSix] = useState("E. Haaland");

  const playersToGetData: string[] = [
    playerOne,
    playerTwo,
    playerThree,
    playerFour,
    playerFive,
    playerSix,
  ];
  getSelectedPlayersFullData(playersToGetData);

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl bold">Player Comparison</h1>
      </div>
      <div className="grid grid-rows-3 grid-flow-col gap-4 flex justify-center mb-20">
        <PlayerSelect index={1} player={playerOne} setPlayer={setPlayerOne} />
        <PlayerSelect index={2} player={playerTwo} setPlayer={setPlayerTwo} />
        <PlayerSelect
          index={3}
          player={playerThree}
          setPlayer={setPlayerThree}
        />
        <PlayerSelect index={4} player={playerFour} setPlayer={setPlayerFour} />
        <PlayerSelect index={5} player={playerFive} setPlayer={setPlayerFive} />
        <PlayerSelect index={6} player={playerSix} setPlayer={setPlayerSix} />
      </div>
      <div className="grid grid-cols-1">
        {getSelectedPlayersFullData(playersToGetData).map((data, index) => {
          return (
            <BarChart data={data.data} key={index} dataName={data.dataName} />
          );
        })}
      </div>
    </>
  );
};

export default PlayerComparison;
