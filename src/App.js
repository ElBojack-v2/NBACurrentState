//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

import getTeamsPPG from './nbaAPI/getter.js'

function App() {
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getTeamsPPG()
      .then(teams => {setTeams(teams); setIsLoaded(true);}, (error) => {setError(error); setIsLoaded(true);})
  }, []);

  if (isLoaded) {
    return (
      <div className="App">
        {teams.map(team => (
          <span>
            <img key={team.id} style={{width:'25px', height:'25px'}} src={team.logo} alt={team.name} />
          </span>
        ))}
      </div>
    );
  } else if (error) {
    return <div className="App">
      Error while loading...
    </div>
  } else {
    return <div className="App">
      En Chargement...
    </div>
  }
}

export default App;
