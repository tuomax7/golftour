import './App.css';
import Leaderboard from './components/Leaderboard.js'
// import ScoreInput from './components/ScoreInput.js'
import Navbar from './components/Navbar.js'

import {useState, useEffect} from 'react'
import RoundListing from './components/RoundListing.js';

import firebase from './Firebase.js'


function App() {

  //Rounds to firebase
  const rounds =
  [
    [
      {
        date: "8.6.2021",
        course: "Master club Forest",
        johannes: 17,
        joel: 33,
        tuomas: 18,
        winner: "Joel Vanhanen"
      },
      {
        date: "26.6.2021",
        course: "Archipelagia",
        johannes: 14,
        joel: 38,
        tuomas: 20,
        winner: "Joel Vanhanen"
      },
      {
        date: "18.7.2021",
        course: "Master club Forest",
        johannes: 28,
        joel: 42,
        tuomas: 29,
        winner: "Joel Vanhanen"
      },
      {
        date: "23.7.2021",
        course: "Master club Master",
        johannes: 21,
        joel: 32,
        tuomas: 29,
        winner: "Joel Vanhanen"
      }
    ],
    [],
    []
  ]

  const currentSeason = 2021


  //Collects data from rounds to a contestant-centered format

  const contestants = [
    {
      name: "Joel Vanhanen",
      id: "joel",
      scores: [0, 0, 0],
      roundWins: [0, 0, 0],
      records: [-1, -1, -1]
    },
    {
      name: "Johannes Sippola",
      id: "johannes",
      scores: [0, 0, 0],
      roundWins: [0, 0, 0],
      records: [-1, -1, -1]
    },
    {
      name: "Tuomas Nummela",
      id: "tuomas",
      scores: [0, 0, 0],
      roundWins: [0, 0, 0],
      records: [-1, -1, -1]
    }
  ]
  
  for(let season = 2021; season <= currentSeason; season++){
    
    rounds[season-2021]
    .forEach(seasonRound => {
      contestants.forEach(contestant => {

        contestant.scores[season-2021] += seasonRound[contestant.id]

        if(seasonRound.winner === contestant.name) contestant.roundWins[season-2021]++

        contestant.records[season-2021] = Math.max(contestant.records[season-2021], seasonRound[contestant.id])
      })
    })
  }


  


  const [appState, setAppState] = useState("main")

  switch(appState){
    case "main":
      return(
        <div>
          <Navbar currentSeason={currentSeason} appState={appState} setAppState={setAppState}/>
          <Leaderboard contestants={contestants} currentSeason={currentSeason} appState={appState}/>
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
      default:
        return(
          <div>
            <p>Page could not be loaded</p>
          </div>
        )

  }
}

export default App
