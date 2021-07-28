import React from 'react'

const Statistics = ({contestants, rounds}) => {

    const selectedSeason = 0


    //CONSIDER MOVING DATA HANDLING TO APP.JS OR A SEPARATE FILE -> SAME DATA MAY BE NEEDED IN PROFILES


    const getScore = (scores) => {
        if(selectedSeason === 0){
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            return scores.reduce(reducer)
        }
        return scores[selectedSeason-2021]
    }

    const getRecord = (records) => {
        if(selectedSeason === 0){
            return Math.max(...records)
        }
        return records[selectedSeason-2021]

    }

    const getAverage = (scores) => {
        if(selectedSeason === 0){
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


    const contestantStatsList= [
        {
            name: "Joel Vanhanen",
            score: getScore(contestants[0].scores),
            record: getRecord(contestants[0].records),
            average: getAverage(contestants[0].scores),
            roundWins: 2,
            championships: 2
        },
        {
            name: "Johannes Sippola",
            score: getScore(contestants[1].scores),
            record: getRecord(contestants[1].records),
            average: getAverage(contestants[1].scores),
            roundWins: 3,
            championships: 3
        },
        {
            name: "Tuomas Nummela",
            score: getScore(contestants[2].scores),
            record: getRecord(contestants[2].records),
            average: getAverage(contestants[2].scores),
            roundWins: 4,
            championships: 4
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
                        {selectedSeason === 0 && <th>Kausimestaruudet</th>}
                    </tr>
                    
                    {contestantStatsList.map((contestantStats, index) => 
                        <tr key={contestantStats.name}>
                            <td>{index+1}</td>
                            <td>{contestantStats.name}</td>
                            <td>{contestantStats.score}</td>
                            <td>{contestantStats.record}</td>
                            <td>{contestantStats.average}</td>
                            <td>{contestantStats.roundWins}</td>
                            {selectedSeason === 0 && <td>{contestantStats.championships}</td>}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Statistics