import React from "react";
import { getOutfieldPlayers } from "./utils";

interface Props {
  index: number;
  player: string;
  setPlayer: React.Dispatch<React.SetStateAction<string>>;
}
const PlayerSelect: React.FC<Props> = (props: Props) => {
  const { player, setPlayer } = props;
  const options = getOutfieldPlayers().map((name, index) => (
    <option key={index}>{name}</option>
  ));

  return (
    <select
      className="text-md rounded border-2 border-sky-700 text-gray-500 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
      value={player}
      onChange={(e) => {
        e.preventDefault();
        setPlayer(e.target.value);
      }}
    >
      {options}
    </select>
  );
};

export default PlayerSelect;
