import './App.css';
import Leaderboard from './components/Leaderboard.js'
import ScoreInput from './components/ScoreInput'

import {useState} from 'react'

function App() {

  const [contestants, setContestants] = useState(
    [
        {
            name: "Johannes Sippola",
            score: [59, 0, 0],
            roundWins: 0,
            records: [28, 0, 0]
        },
        {
            name: "Joel Vanhanen",
            score: [113, 0, 0],
            roundWins: 3,
            records: [42, 0, 0]
        },
        {
            name: "Tuomas Nummela",
            score: [67, 0, 0],
            roundWins: 0,
            records: [29, 0, 0]
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
