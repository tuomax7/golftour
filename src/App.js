import './App.css';
import Leaderboard from './components/Leaderboard.js'
import ScoreInput from './components/ScoreInput'
import Navbar from './components/Navbar.js'

import {useState} from 'react'

function App() {

  const [contestants, setContestants] = useState(
    [
        {
            name: "Johannes Sippola",
            score: [80, 0, 0],
            roundWins: [0, 0, 0],
            records: [28, 0, 0]
        },
        {
            name: "Joel Vanhanen",
            score: [145, 0, 0],
            roundWins: [4, 0, 0],
            records: [42, 0, 0]
        },
        {
            name: "Tuomas Nummela",
            score: [96, 0, 0],
            roundWins: [0, 0, 0],
            records: [29, 0, 0]
        }
    ]
  )

  const [currentSeason] = useState(2021)

  const [appState, setAppState] = useState("main")

  switch(appState){
    case "main":
      return(
        <div>
          <Navbar currentSeason={currentSeason} appState={appState} setAppState={setAppState}/>
          <Leaderboard contestants={contestants} setContestants={setContestants} currentSeason={currentSeason} appState={appState}/>
        </div>
      )

    case "stats":
      return(
        <div>
          <Navbar currentSeason={currentSeason} appState={appState} setAppState={setAppState}/>
          <p>Stats</p>
        </div>
      )
      
      case "profiles":
        return(
          <div>
            <Navbar currentSeason={currentSeason} appState={appState} setAppState={setAppState}/>
            <p>Profiles</p>
          </div>
        )
      
      case "input":
        return(
          <div>
            <Navbar currentSeason={currentSeason} appState={appState} setAppState={setAppState} />
            <ScoreInput contestants={contestants} setContestants={setContestants} currentSeason={currentSeason}/>
          </div>
        )  
      
      default:
        return(
          <div>
            <p>Page could not be loaded</p>
          </div>
        )

  }
}

export default App;
