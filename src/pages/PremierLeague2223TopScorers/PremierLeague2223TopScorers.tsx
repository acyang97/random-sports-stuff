import React from "react";
import video from "../../assets/top-goalscorers-timeline.mp4";

const PremierLeague2223TopScorers = () => {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl bold">
          Timeline of goals scored by the top scorers of 22-23 Premier League
          Season
        </h1>
      </div>
      <div className="mb-10">
        <p className="text-md">
          I could not find any data regarding the goals scored by the top
          scorers in the league after each match. Most websites only provide the
          top goal scorers as of the current date. Hence, I scrapped the goals
          scored by the final top goalscorers for each match from
          https://www.transfermarkt.com, and used a bar chart race (Is this the
          correct name(???)) to visualize this. Haaland was never going to get
          beaten :|
        </p>
      </div>
      <div>
        <video controls>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default PremierLeague2223TopScorers;
