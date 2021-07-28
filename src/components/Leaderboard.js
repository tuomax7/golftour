import React from 'react'



const Leaderboard = ({contestants, setContestants, currentSeason, appState}) => {


    const BoardListing = () => {

        //Custom season- and scorebased sorting for leaderboard

        const sortedLeaderboard = [...contestants]
    
        sortedLeaderboard.sort((a, b) => {

            if(a.scores[currentSeason-2021] === b.scores[currentSeason-2021]){
                return b.roundWins[currentSeason-2021]-a.roundWins[currentSeason-2021]
            }
            return b.scores[currentSeason-2021] - a.scores[currentSeason-2021]
        })
    
        return(
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Sijoitus</th>
                            <th>Nimi</th>
                            <th>Bogeypisteet</th>
                            <th>Kierrosvoitot</th>
                        </tr>
                    
                        {sortedLeaderboard.map(contestant => 
                            <tr key={contestant.name}>
                                <td>{sortedLeaderboard.indexOf(contestant)+1}</td>
                                <td>{contestant.name}</td>
                                <td>{contestant.scores[currentSeason-2021]}</td>
                                <td>{contestant.roundWins[currentSeason-2021]}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

    return(
        <div>
            <BoardListing />
        </div>
    )
}



export default Leaderboard