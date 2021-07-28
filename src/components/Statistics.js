import React from 'react'

const selectedSeason = 'all-time'


const contestantStatsList= [
    {
        name: "Joel Vanhanen",
        score: 200,
        record: 20,
        average: 15,
        roundWins: 2,
        championships: 2
    },
    {
        name: "Johannes Sippola",
        score: 300,
        record: 30,
        average: 20,
        roundWins: 3,
        championships: 3
    },
    {
        name: "Tuomas Nummela",
        score: 400,
        record: 40,
        average: 25,
        roundWins: 4,
        championships: 4
    }
]


const Statistics = () => {
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
                        {selectedSeason === 'all-time' && <th>Kausimestaruudet</th>}
                    </tr>
                    
                    {contestantStatsList.map((contestantStats, index) => 
                        <tr key={contestantStats.name}>
                            <td>{index+1}</td>
                            <td>{contestantStats.name}</td>
                            <td>{contestantStats.score}</td>
                            <td>{contestantStats.record}</td>
                            <td>{contestantStats.average}</td>
                            <td>{contestantStats.roundWins}</td>
                            {selectedSeason === 'all-time' && <td>{contestantStats.championships}</td>}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Statistics