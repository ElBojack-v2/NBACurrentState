//import logo from './logo.svg';
import { useEffect, useState, useRef, useCallback } from 'react';
import './App.css';
import domtoimage from "dom-to-image";

import getTeamsPPG from './nbaAPI/getter.js'

function App() {
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const rankingRef = useRef(null);

  useEffect(() => {
    getTeamsPPG()
      .then(teams => {setTeams(teams); setIsLoaded(true);}, (error) => {setError(error); setIsLoaded(true);})
  }, []);

  const handleSaveImage = useCallback(() => {
    if (rankingRef.current) {
      domtoimage.toPng(rankingRef.current).then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = "ranking.png";
        link.href = dataUrl;
        link.click();
      });
    }
  }, [rankingRef]);

  const sortedTeams = [...teams].sort((a, b) => a.ppg - b.ppg); 

  if (isLoaded) {
    return (
      <div
      ref={rankingRef}
      style={{
        border: "3px solid red",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "600px",
      }}
    >
        <h1>NBA Rankings by Points per Game</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {sortedTeams.map((team, index) => (
            <div key={team.id} style={{ position: "relative", bottom: `${index * 5}px`, marginLeft: "10px" }}>
              <img src={team.logo} alt={`Logo for team ${index + 1}`} width="15" height="15" />
           </div>
          ))}
        </div>
        <button onClick={handleSaveImage}>Save Image</button>
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
