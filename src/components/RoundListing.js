import React from 'react'

const RoundListing = ({currentSeason, contestants, rounds}) => {
    
    return(
        <div>
            <h3>Kauden {currentSeason} kierrokset</h3>
            <table>
                <tbody>
                    <tr>
                        <th>Päivämäärä</th>
                        <th>Kenttä</th>
                        {contestants.map(contestant => <th key={contestant.name}>{contestant.name}</th>)}
                    </tr>
                    
                    {rounds[currentSeason-2021].map(round => 
                        <tr key={round.date+round.johannes+round.joel+round.tuomas}>
                            <td>{round.date}</td>
                            <td>{round.course}</td>
                            <td>{round.joel}</td>
                            <td>{round.johannes}</td>
                            <td>{round.tuomas}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default RoundListing