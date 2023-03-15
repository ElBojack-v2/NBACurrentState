async function getTeamsLogo() {
    const res = await fetch("https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams");
    
    if (res.status != 200) {
        return []
    }
    
    const teamsJson = await res.json();
		console.log("process json...")
    console.log(teamsJson.sports[0].leagues[0].teams[0].team.logos[0].href)
    const teamsLogo = teamsJson.sports[0].leagues[0].teams.map(a => a.team.logos[0].href)
    console.log('fin du process...')
    return (teamsLogo)
}
