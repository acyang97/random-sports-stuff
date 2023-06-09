import _ from "lodash";
import { PREMIER_LEAGUE_PLAYERS } from "../../data/players";
import { PLAYERS_FULL_DATA } from "../../data/playersFullData";
import { IBarChart } from "./BarChart";

export interface Column {
  shortForm: string;
  name: string;
}

export const columns: Column[] = [
  // { shortForm: "POS", name: "Position" },
  { shortForm: "GP", name: "Games Played" },
  { shortForm: "GS", name: "Games Started" },
  { shortForm: "G", name: "Goals" },
  { shortForm: "A", name: "Assists" },
  { shortForm: "SH", name: "Shots Taken" },
  { shortForm: "SOT", name: "Shots On Target" },
  { shortForm: "PAcc", name: "Passing Accuracy" },
  { shortForm: "INT", name: "Interceptions" },
  { shortForm: "FC", name: "Fouls Committed" },
  { shortForm: "FA", name: "Fouls Won" },
  { shortForm: "YC", name: "Yellow Card" },
  { shortForm: "RC", name: "Red Card" },
  // { shortForm: "club", name: "Club" },
];

export const getSelectedPlayersFullData = (players: string[]) => {
  const playersWithData = _.filter(PLAYERS_FULL_DATA, (player) => {
    return players.includes(player.name);
  });
  const barChartData = columns.map((column) => {
    const { shortForm, name } = column;
    let currentBarChart: IBarChart = {
      dataName: name,
      data: [],
    };
    const currentData = [];
    for (let i = 0; i < playersWithData.length; i++) {
      const currentPlayer = playersWithData[i];

      currentData.push({
        label: currentPlayer.name,
        value: Number(_.get(currentPlayer, shortForm, 0)),
      });
    }
    return {
      ...currentBarChart,
      data: currentData,
    };
  });
  return barChartData;
};

export const getOutfieldPlayers = () => {
  let outfieldPlayers = _.filter(
    PLAYERS_FULL_DATA,
    (player) => player.POS !== "GK"
  );
  return outfieldPlayers.map((player) => player.name);
};
