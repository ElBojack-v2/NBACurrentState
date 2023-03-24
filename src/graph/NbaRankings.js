import React, { useEffect, useState } from "react";
import axios from "axios";

const NbaRankings = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get("https://www.balldontlie.io/api/v1/teams")
      .then((response) => {
        const teamsWithStats = response.data.data.map((team) => ({
          name: team.full_name,
          logo: team.logo,
          pointsPerGame: 0,
        }));

        const promises = teamsWithStats.map((team, index) => {
          return axios.get(`https://www.balldontlie.io/api/v1/stats?seasons[]=2022&team_ids[]=${index + 1}`)
            .then((response) => {
              const stats = response.data.data.filter((stat) => stat.player_id === null);
              if (stats.length > 0) {
                team.pointsPerGame = stats[0].pts;
              }
            })
            .catch((error) => console.error(error));
        });

        Promise.all(promises).then(() => {
          setTeams(teamsWithStats);
        });
      })
      .catch((error) => console.error(error));
  }, []);

  const sortedTeams = [...teams].sort((a, b) => b.pointsPerGame - a.pointsPerGame);

  return (
    <div>
      <h1>NBA Rankings by Points per Game</h1>
      {sortedTeams.map((team, index) => (
        <div key={team.name}>
          <h2>{index + 1}. <img src={team.logo} alt={team.name} width="40" height="40" /> {team.name} - {team.pointsPerGame} points per game</h2>
        </div>
      ))}
    </div>
  );
};

export default NbaRankings;
