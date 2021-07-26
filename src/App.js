import './App.css';
import Leaderboard from './components/Leaderboard.js'
// import ScoreInput from './components/ScoreInput.js'
import Navbar from './components/Navbar.js'

import {useState, useEffect} from 'react'
import RoundListing from './components/RoundListing.js';

import firebase from './Firebase.js'


function App() {

  //Rounds and currentseason to firebase
  const [currentSeason] = useState(2021)

  const rounds = [
    [
      {
        course: "Master club Forest",
        date: "8.6.2021",
        joel: 33,
        johannes: 17,
        tuomas: 18,
        winner: "Joel Vanhanen"
      },
      {
        course: "HIFK",
        date: "9.6.2021",
        joel: 50,
        johannes: 20,
        tuomas: 16,
        winner: "Joel Vanhanen"
      }
    ],
    [
      {
        course: "Sarfvik",
        date: "8.6.2022",
        joel: 500,
        johannes: 200,
        tuomas: 18,
        winner: "Joel Vanhanen"
      },
      {
        course: "Guugeli",
        date: "9.6.2022",
        joel: 50,
        johannes: 20,
        tuomas: 16,
        winner: "Joel Vanhanen"
      }
    ]
  ]


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


  
/*

  const contestants = [
    {
      name: "Joel Vanhanen",
      scores: [83],
      roundWins: [2],
      records: [50]
    },
    {
      name: "Johannes Sippola",
      scores: [37],
      roundWins: [0],
      records: [20]
    },
    {
      name: "Tuomas Nummela",
      scores: [34],
      roundWins: [0],
      records: [18]
    }
  ]

  /*

  const [contestants, setContestants] = useState([])
  const [rounds, setRounds] = useState([])

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



  useEffect(() => {
    firebase
    .firestore()
    .collection('2022')
    .onSnapshot((snapshot) => {
      const newRounds = snapshot.docs.map((doc) => ({
        ...doc.data()
      }))

      setRounds(rounds.concat(newRounds))
    })
  }, [])

/*
  useEffect(() => {
    firebase
      .firestore()
      .collection('rounds')
      .doc('2021')
      .collection('2021')
      .doc('18_7_2021')
      .collection('18_7_2021')
      .onSnapshot((snapshot) => {
        const newSeasonRounds = snapshot.docs.map((doc) => ({
          ...doc.data()
        }))

        const newRounds = [...rounds]

        newRounds.push(newSeasonRounds)


        setRounds(newRounds)
        console.log(rounds)
      })
  }, [])
*/
  


  
/*
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
*/
  


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
