import './App.css';
import Leaderboard from './components/Leaderboard.js'
import Navbar from './components/Navbar.js'
import Statistics from './components/Statistics.js'
import RoundListing from './components/RoundListing.js';
import Rounds from './components/Rounds.js'

import {useState} from 'react'

import firebase from './Firebase.js'


function App() {

  //Rounds to firebase

  const [rounds, setRounds] = useState([])

  const [roundsHolder] = useState([])

  const [currentSeason, setCurrentSeason] = useState(2021)

  const roundsRef = firebase.database().ref('rounds')

  const [loaded, setLoaded] = useState(false)

  if(!loaded){
    roundsRef.once('value', (seasons_snapshot) => {
      setCurrentSeason(seasons_snapshot.val().current_season)
      const seasonsData = seasons_snapshot.val()
  
      for(const seasonData in seasonsData){
        
        const seasonRoundsData = seasonsData[seasonData]

        const season = []

        if(seasonRoundsData !== 'undef'){
          for(const roundData in seasonRoundsData){
  
            const seasonRoundData = seasonRoundsData[roundData]
            season.push(seasonRoundData)
          }
        }
  
        roundsHolder.push(season)
      }
      setRounds(roundsHolder)
    })
    setLoaded(true)
  }

//Collects data from rounds to a contestant-centered format

const contestants = [
  {
    name: "Joel Vanhanen",
    id: "joel",
    scores: [0],
    roundWins: [0],
    records: [0],
    championships: 0
  },
  {
    name: "Johannes Sippola",
    id: "johannes",
    scores: [],
    roundWins: [],
    records: [],
    championships: 0
  },
  {
    name: "Tuomas Nummela",
    id: "tuomas",
    scores: [],
    roundWins: [],
    records: [],
    championships: 0
  }
]

  if(rounds.length > 0){
    for(let season = 2021; season <= currentSeason; season++){

      const seasonRounds = rounds[season-2021]

      contestants.forEach(contestant => {
        contestant.scores[season-2021] = 0
        contestant.roundWins[season-2021] = 0
        contestant.records[season-2021] = 0
      })

      if(seasonRounds.length === 0) continue
  
      seasonRounds.forEach(seasonRound =>{
        contestants.forEach(contestant => {
  
          contestant.scores[season-2021] += seasonRound[contestant.id]
  
          if(seasonRound.winner === contestant.name) contestant.roundWins[season-2021]++
  
          contestant.records[season-2021] = Math.max(contestant.records[season-2021], seasonRound[contestant.id])
        })
      })

      if(season < currentSeason){

        contestants.sort((a, b) => {

          if(a.scores[currentSeason-2021] === b.scores[currentSeason-2021]){
              return b.roundWins[currentSeason-2021]-a.roundWins[currentSeason-2021]
          }
          return b.scores[currentSeason-2021] - a.scores[currentSeason-2021]
        })

        contestants[0].championships++
        
      }
    }
  }
  

  //Render handling
  const [appState, setAppState] = useState("rounds")

  if(rounds.length < 1){
    return(
      <div>
        <p>Ladataan...</p>
      </div>
    )
  }
  
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
          <Statistics contestants={contestants} rounds={rounds} currentSeason={currentSeason}/>
        </div>
      )
    case "rounds":
      return(
        <div>
          <Navbar currentSeason={currentSeason} appState={appState} setAppState={setAppState}/>
          <Rounds contestants={contestants} rounds={rounds} currentSeason={currentSeason}/>
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
