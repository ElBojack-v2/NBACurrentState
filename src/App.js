//import logo from './logo.svg';
import './App.css';

import getTeamsPPG from './nbaAPI/getter.js'

function getLogoStyle(positioning) {
  const top = `top: ${480 - positioning * 20}px;`
  const left = `left: ${640 - positioning * 20}px;`

  return top+left;
}

function Logos() {
  return getTeamsPPG.map((team) => {
    return <img src={team.logo} style={getLogoStyle(team.id)}></img>
  })
}

function App() {
  return (
    <div className="App">
      <Logos />
    </div>
  );
}

export default App;
