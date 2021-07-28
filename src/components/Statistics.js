import React from 'react'

const Statistics = ({contestants, rounds}) => {

    const selectedSeason = null


    //CONSIDER MOVING DATA HANDLING TO APP.JS OR A SEPARATE FILE -> SAME DATA MAY BE NEEDED IN PROFILES


    //Functions for generating statistical figures

    const getScore = (scores) => {
        if(selectedSeason === null){
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            return scores.reduce(reducer)
        }
        return scores[selectedSeason-2021]
    }

    const getRecord = (records) => {
        if(selectedSeason === null){
            return Math.max(...records)
        }
        return records[selectedSeason-2021]

    }

    const getAverage = (scores) => {
        if(selectedSeason === null){
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
        if(selectedSeason === null){
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            return wins.reduce(reducer)
        }
        return wins[selectedSeason-2021]
    }


    const contestantStatsList= [
        {
            name: "Joel Vanhanen",
            score: getScore(contestants[0].scores),
            record: getRecord(contestants[0].records),
            average: getAverage(contestants[0].scores),
            roundWins: getRoundWins(contestants[0].roundWins),
            championships: contestants[0].championships
        },
        {
            name: "Johannes Sippola",
            score: getScore(contestants[1].scores),
            record: getRecord(contestants[1].records),
            average: getAverage(contestants[1].scores),
            roundWins: getRoundWins(contestants[1].roundWins),
            championships: contestants[1].championships
        },
        {
            name: "Tuomas Nummela",
            score: getScore(contestants[2].scores),
            record: getRecord(contestants[2].records),
            average: getAverage(contestants[2].scores),
            roundWins: getRoundWins(contestants[2].roundWins),
            championships: contestants[2].championships
        }
    ]

    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Sijoitus</th>
                        <th>Nimi</th>
                        <th>Pisteet</th>
                        <th>Piste-ennätys</th>
                        <th>Pistekeskiarvo</th>
                        <th>Kierrosvoitot</th>
                        {selectedSeason === null && <th>Kausimestaruudet</th>}
                    </tr>
                    
                    {contestantStatsList.map((contestantStats, index) => 
                        <tr key={contestantStats.name}>
                            <td>{index+1}</td>
                            <td>{contestantStats.name}</td>
                            <td>{contestantStats.score}</td>
                            <td>{contestantStats.record}</td>
                            <td>{contestantStats.average}</td>
                            <td>{contestantStats.roundWins}</td>
                            {selectedSeason === null && <td>{contestantStats.championships}</td>}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Statistics