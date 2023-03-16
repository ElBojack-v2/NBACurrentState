async function getter(url) {
  const res = await fetch(url);

  if (res.status != 200) {
    return [];
  }

  const resJson = await res.json();
  return resJson;
}

async function getTeamInfo(id) {
  const teamJson = await getter(
    'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams' +
      `/${id}`
  );
  return {
    logo: teamJson.team.logos[0].href,
    pointAgainst: Number(teamJson.team.record.items[0].stats[2].value.toFixed(1)),
    pointScored: Number(teamJson.team.record.items[0].stats[3].value.toFixed(1))
  };
}