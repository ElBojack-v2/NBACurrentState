import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface TeamStats {
  name: string;
  logo: string;
  pointsPerGame: number;
}

const NbaRankings: React.FC = () => {
  const [teams, setTeams] = useState<TeamStats[]>([]);

  useEffect(() => {
    axios.get("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams")
      .then((response) => {
        const teamsWithStats: TeamStats[] = response.data.sports[0].leagues[0].teams
          .map((team: any) => ({
            name: team.displayName,
            logo: team.logos[0].href,
            pointsPerGame: team.teamStats[0].stats[6].value,
          }));

        setTeams(teamsWithStats);
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
