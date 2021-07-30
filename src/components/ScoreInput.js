import React from 'react'

const ScoreInput = ({contestants, setContestants, currentSeason, rounds, setRounds}) => {


    const scoreInputted = () => {
        let changedContestants = [...contestants]

        changedContestants.map(changedContestant =>

            changedContestant.score[currentSeason-2021] += parseInt(document.getElementById(changedContestant.name).value) 

        )

        
        let appendedRounds = [...rounds[currentSeason-2021]]

        appendedRounds.push(
            {
                date: document.getElementById('dateInput').value,
                course: document.getElementById('courseInput').value,
                johannes: parseInt(document.getElementById("Johannes Sippola").value),
                joel: parseInt(document.getElementById("Joel Vanhanen").value),
                tuomas: parseInt(document.getElementById("Tuomas Nummela").value)
            }
        )

        let changedRounds = [...rounds]
        changedRounds[currentSeason-2021] = appendedRounds

        setContestants(changedContestants)
        setRounds(changedRounds)

    }

    const InputForm = () => {
        return(
            <div>
                <label>Päivämäärä</label>
                <input id="dateInput"></input>
                <label>Kenttä</label>
                <input id="courseInput"></input>

                <table>
                    <tbody>
                        <tr>
                            <th>Nimi</th>
                            <th>Bogeypisteet</th>
                        </tr>

                        {contestants.map(contestant =>

                            <tr key={contestant.name}>
                                <td><label>{contestant.name}</label></td>
                                <td><input id={contestant.name} defaultValue={0}></input></td>
                            </tr>
                        )}
                    
                    </tbody>
                </table>
                <button onClick={scoreInputted}>Syötä kierros</button>
            </div>

        )
    }

    return(
        <div>
            <h2>Kausi {currentSeason}</h2>
            <h3>Syötä kierroksen tiedot</h3>
            <InputForm />
        </div>
    )
}

export default ScoreInput