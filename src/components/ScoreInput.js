import React from 'react'

const ScoreInput = ({contestants, setContestants, currentSeason}) => {


    const scoreInputted = () => {
        let changedContestants = contestants

        changedContestants.map(changedContestant =>

            changedContestant.score[currentSeason-2021] += parseInt(document.getElementById(changedContestant.name).value) 

        )
        setContestants(changedContestants)

    }

    const InputForm = () => {
        return(
            <div>

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