import { select } from 'async'
import React from 'react'
import {useState} from 'react'



const Leaderboard = () => {

    const [selectedSeason, setSelectedSeason] = useState(2021)

    
    const SeasonSelector = () => {
    
        //When selected season changes, selected seasonstate updates
        const selectedSeasonChange = () => setSelectedSeason(document.getElementById('seasonSelector').value)
    
        const seasons = [2021, 2022, 2023]
        return(
            <div>
                Valitse kisakausi:
                <select id="seasonSelector" onChange={selectedSeasonChange} defaultValue={selectedSeason}>
                    {seasons.map(season => <option key={season}>{season}</option>)}
                </select>
            </div>
        )
    }



    const BoardListing = () => {

        const leaderboard = [
            {
                name: "Johannes Sippola",
                score: [300, 200, 100]
            },
            {
                name: "Joel Vanhanen",
                score: [100, 200, 300]
            },
            {
                name: "Tuomas Nummela",
                score: [400, 200, 100]
            }
        ]

        //Custom season- and scorebased sorting for leaderboard
    
        const sortedLeaderboard = leaderboard.sort((a, b) => {
            if(a.score[selectedSeason-2021] > b.score[selectedSeason-2021]){
                return -1
            }
            else return 1
        })
    
        return(
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Nimi</th>
                            <th>Bogeypisteet</th>
                        </tr>
                    
                        {sortedLeaderboard.map(contestant => 
                            <tr key={contestant.name}>
                                <td>{contestant.name}</td>
                                <td>{contestant.score[selectedSeason-2021]}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }



    return(
        <div>
            <SeasonSelector />
            <BoardListing />
        </div>
    )
}



export default Leaderboard