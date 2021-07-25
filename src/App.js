import './App.css';
import Leaderboard from './components/Leaderboard.js'
import ScoreInput from './components/ScoreInput.js'
import Navbar from './components/Navbar.js'

import {useState, useEffect} from 'react'
import RoundListing from './components/RoundListing.js';

import firebase from './Firebase.js'


function App() {
  const [currentSeason] = useState(2021)

  const [contestants, setContestants] = useState([])

  useEffect(() => {
    firebase
    .firestore()
    .collection('contestants')
    .onSnapshot((snapshot) => {
      const newContestants = snapshot.docs.map((doc) => ({
        ...doc.data()
      }))

      setContestants(newContestants)
    })
  }, [])

  /*

  const [rounds, setRounds] = useState([])


  useEffect(() => {
    firebase
      .firestore()
      .collection('rounds')
      .collection('2021')
      .onSnapshot((snapshot) => {
        const newRounds = snapshot.docs.map((doc) => ({
          ...doc.data()
        }))

        setRounds(newRounds)
        console.log(rounds)
      })
  }, [])

*/
  

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

export default App
