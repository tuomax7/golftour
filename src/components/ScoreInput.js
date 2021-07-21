import React from 'react'

const ScoreInput = ({contestants, setContestants}) => {

    const season = 2021


    const scoreInputted = () => {
        let changedContestants = contestants

        changedContestants.map(changedContestant =>

            changedContestant.score[season-2021] += parseInt(document.getElementById(changedContestant.name).value) 

        )
        setContestants(changedContestants)
        console.log(document.getElementsByTagName('input'))
        //document.getElementsByTagName('input').forEach(input => input.value = 0)
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
            <h2>Kausi {season}</h2>
            <h3>Syötä kierroksen tiedot</h3>
            <InputForm />
        </div>
    )
}

export default ScoreInput