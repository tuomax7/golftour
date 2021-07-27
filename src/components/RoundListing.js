import React from 'react'

const RoundListing = ({currentSeason, contestants, rounds}) => {

    const sortedSeasonRounds = [...rounds[currentSeason-2021]]
    sortedSeasonRounds.sort((a, b) => {
        const dateArrayA = a.date.split('.').map(itemA => parseInt(itemA))
        const dateArrayB = b.date.split('.').map(itemB => parseInt(itemB))

        if(dateArrayA[2] === dateArrayB[2]){

            if(dateArrayA[1] === dateArrayB[1]){

                return dateArrayB[0] - dateArrayA[0]
            }
            return dateArrayB[1] - dateArrayA[1]
        }
        return dateArrayB[2] - dateArrayA[2]
    })
    
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
                    
                    {sortedSeasonRounds.map(round => 
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