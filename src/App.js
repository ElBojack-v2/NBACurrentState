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
          <div>
            <img key={team.id} style={{width:'20px', height:'20px'}} src={team.logo} alt={team.name} />
          </div>
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
