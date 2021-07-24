import './App.css';
import Leaderboard from './components/Leaderboard.js'
import ScoreInput from './components/ScoreInput'
import Navbar from './components/Navbar.js'

import {useState} from 'react'
import RoundListing from './components/RoundListing';

function App() {

  const [contestants, setContestants] = useState(
    [
        {
            name: "Johannes Sippola",
            score: [80, 0, 0],
            roundWins: [0, 0, 0],
            records: [28, 0, 0],
            id: "johannes"
        },
        {
            name: "Joel Vanhanen",
            score: [145, 0, 0],
            roundWins: [4, 0, 0],
            records: [42, 0, 0],
            id: "joel"
        },
        {
            name: "Tuomas Nummela",
            score: [96, 0, 0],
            roundWins: [0, 0, 0],
            records: [29, 0, 0],
            id: "tuomas"
        }
    ]
  )

  const [rounds, setRounds] = useState(
    [
      [
        {
          date: "8.6.2021",
          course: "Master club Forest",
          johannes: 17,
          joel: 33,
          tuomas: 18
        },
        {
          date: "26.6.2021",
          course: "Archipelagia",
          johannes: 14,
          joel: 38,
          tuomas: 20
        },
        {
          date: "18.7.2021",
          course: "Master club Forest",
          johannes: 28,
          joel: 42,
          tuomas: 29
        },
        {
          date: "23.7.2021",
          course: "Master club Master",
          johannes: 21,
          joel: 32,
          tuomas: 29
        }
      ],
      [],
      []
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
          <RoundListing currentSeason={currentSeason} contestants={contestants} rounds={rounds}/>
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
            <ScoreInput contestants={contestants} setContestants={setContestants} currentSeason={currentSeason} rounds={rounds} setRounds={setRounds}/>
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
