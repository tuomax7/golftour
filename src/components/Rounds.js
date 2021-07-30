import React from 'react'
import {useState} from 'react'

const Rounds = ({contestants, rounds, currentSeason}) => {

    //Setting the inspected season

    const [selectedSeason, setSelectedSeason] = useState('Kaikki kaudet')

    const seasonNames = ['Kaikki kaudet']

    for(let season = 2021; season <= currentSeason; season++){
        if(rounds[season-2021].length === 0) continue
        seasonNames.push(season)
    }

    const seasonSelected = () => {
        const seasonSelector = document.getElementById('seasonSelector');
        setSelectedSeason(seasonSelector.value)
    }

    //Sorting the rounds
    let sortedSeasonRounds = []

    if(selectedSeason === 'Kaikki kaudet'){
        for(let season = 2021; season <= currentSeason; season++){

            const seasonRounds = rounds[season-2021]
  
            sortedSeasonRounds = sortedSeasonRounds.concat(seasonRounds)
        }
    }else{
        sortedSeasonRounds = rounds[selectedSeason-2021]
    }

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
            <div>
                <select id='seasonSelector' defaultValue='placeholder' onChange={seasonSelected}>

                    <option value='placeholder' disabled hidden>Valitse kausi</option>
                    {seasonNames.map(seasonName => <option key={seasonName}>{seasonName}</option>)}

                </select>
            </div>

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

export default Rounds