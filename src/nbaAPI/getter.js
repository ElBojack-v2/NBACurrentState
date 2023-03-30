async function getter(url) {
  const res = await fetch(url);

  if (res.status !== 200) {
    return [];
  }

  const resJson = await res.json();
  return resJson;
}

async function getTeamPointsPerGame(id) {
  const teamJson = await getter(
    'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams' +
      `/${id}`
  );
  return {
    id: teamJson.team.id,
    logo: teamJson.team.logos[0].href,
    name: teamJson.team.name,
    ppg: Number(
      teamJson.team.record.items[0].stats[3].value.toFixed(1)
    ),
    ppa: Number(
      teamJson.team.record.items[0].stats[2].value.toFixed(1)
    ),
  };
}

async function getTeamsPPG() {
  let teamsInfo = [];

  for (let i = 1; i <= 30; i++) {
    const teamInfo = await getTeamPointsPerGame(i);
    teamsInfo.push(teamInfo);
  }

  return teamsInfo;
}

export default getTeamsPPG;