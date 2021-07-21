import './App.css';
import Leaderboard from './components/Leaderboard.js'
import ScoreInput from './components/ScoreInput'

import {useState} from 'react'

function App() {

  const [contestants, setContestants] = useState(
    [
        {
            name: "Johannes Sippola",
            score: [0, 0, 0],
            roundWins: 0
        },
        {
            name: "Joel Vanhanen",
            score: [0, 0, 0],
            roundWins: 1
        },
        {
            name: "Tuomas Nummela",
            score: [0, 0, 0],
            roundWins: 1
        }
    ]
  )

  return (
    <div>
      <h1>GolfTour</h1>
      <Leaderboard contestants={contestants} setContestants={setContestants}/>
      <ScoreInput contestants={contestants} setContestants={setContestants}/>
    </div>
  );
}

export default App;
