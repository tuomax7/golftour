import React from 'react'
import {useState} from 'react'

const Statistics = ({contestants, rounds, currentSeason}) => {

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

        if(selectedSorter === 'championships' && seasonSelector.value !== 'Kaikki kaudet'){
            setSelectedSorter('score')
        }
    }

    //Setting the inspected sorter

    const [selectedSorter, setSelectedSorter] = useState('score')

    const sorterLabels = ['Pisteet', 'Piste-ennätys', 'Pistekeskiarvo', 'Kierrosvoitot']

    if(selectedSeason === 'Kaikki kaudet')sorterLabels.push('Kausimestaruudet')

    const sorterLabelDecoder = {
        'Pisteet' : 'score',
        'Piste-ennätys' : 'record',
        'Pistekeskiarvo' : 'average',
        'Kierrosvoitot' : 'roundWins',
        'Kausimestaruudet' : 'championships'
    }

    const sorterSelected = () => {
        const sorterSelecter = document.getElementById('sorterSelecter');
        setSelectedSorter(sorterLabelDecoder[sorterSelecter.value])
    }



    //CONSIDER MOVING DATA HANDLING TO APP.JS OR A SEPARATE FILE -> SAME DATA MAY BE NEEDED IN PROFILES


    //Functions for generating statistical figures

    const getScore = (scores) => {
        if(selectedSeason === 'Kaikki kaudet'){
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            return scores.reduce(reducer)
        }
        return scores[selectedSeason-2021]
    }

    const getRecord = (records) => {
        if(selectedSeason === 'Kaikki kaudet'){
            return Math.max(...records)
        }
        return records[selectedSeason-2021]

    }

    const getAverage = (scores) => {
        if(selectedSeason === 'Kaikki kaudet'){
            let roundsCount = 0
            rounds.forEach(seasonRounds => {
                roundsCount += seasonRounds.length
            })
            const avg = getScore(scores)/roundsCount
            return Math.round(avg * 100) / 100
        }
        const roundsCount = rounds[selectedSeason-2021].length
        const avg = getScore(scores)/roundsCount
        return Math.round(avg * 100) / 100
    }

    const getRoundWins = (wins) => {
        if(selectedSeason === 'Kaikki kaudet'){
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            return wins.reduce(reducer)
        }
        return wins[selectedSeason-2021]
    }

    const contestantStatsList = contestants.map(contestant => {
        return(
            {
                name: contestant.name,
                score: getScore(contestant.scores),
                record: getRecord(contestant.records),
                average: getAverage(contestant.scores),
                roundWins: getRoundWins(contestant.roundWins),
                championships: contestant.championships
            }
        )
    })


    //Sorting by the inspected sorter before rendering
    contestantStatsList.sort((a, b) => {
        return b[selectedSorter] - a[selectedSorter]
    })

    return(
        <div>
            <div>
                <select id='seasonSelector' defaultValue='placeholder' onChange={seasonSelected}>

                    <option value='placeholder' disabled hidden>Valitse kausi</option>
                    {seasonNames.map(seasonName => <option key={seasonName}>{seasonName}</option>)}
                </select>

                <select id='sorterSelecter' defaultValue='placeholder' onChange={sorterSelected}>

                    <option value='placeholder' disabled hidden>Valitse järjestämisperuste</option>
                    {sorterLabels.map(sorterLabel => <option key={sorterLabel}>{sorterLabel}</option>)}
                </select>
            </div>
            <table>
                <tbody>
                    <tr>
                        <th>Sijoitus</th>
                        <th>Nimi</th>
                        <th>Pisteet</th>
                        <th>Piste-ennätys</th>
                        <th>Pistekeskiarvo</th>
                        <th>Kierrosvoitot</th>
                        {selectedSeason === 'Kaikki kaudet' && <th>Kausimestaruudet</th>}
                    </tr>
                    
                    {contestantStatsList.map((contestantStats, index) => 
                        <tr key={contestantStats.name}>
                            <td>{index+1}</td>
                            <td>{contestantStats.name}</td>
                            <td>{contestantStats.score}</td>
                            <td>{contestantStats.record}</td>
                            <td>{contestantStats.average}</td>
                            <td>{contestantStats.roundWins}</td>
                            {selectedSeason === 'Kaikki kaudet' && <td>{contestantStats.championships}</td>}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Statistics