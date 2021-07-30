import React from 'react'

const Navbar = ({currentSeason, appState, setAppState}) => {

    return(
        <div>
            <h1>Pistebogeykilpailu</h1>
            <button onClick={() => setAppState("main")}>Kausi {currentSeason}</button>
            <button onClick={() => setAppState("stats")}>Tilastot</button>
            <button onClick={() => setAppState("rounds")}>Kierrokset</button>
        </div>
    )
}

export default Navbar
