import React from 'react'

const Navbar = ({currentSeason, appState, setAppState}) => {

    return(
        <div>
            <h1>GolfTour</h1>
            <button onClick={() => setAppState("main")}>Kausi {currentSeason}</button>
            <button onClick={() => setAppState("stats")}>Tilastot</button>
            <button onClick={() => setAppState("profiles")}>Pelaajaprofiilit</button>
            {/* <button onClick={() => setAppState("input")}>Syötä pisteitä</button> */}
        </div>
    )
}

export default Navbar
