import React from "react";
import { useState } from "react";
const _ = require("lodash");

const Statistics = ({ contestants, rounds, currentSeason }) => {
  //Setting the inspected season

  const [selectedSeason, setSelectedSeason] = useState("Kaikki kaudet");

  const seasonNames = ["Kaikki kaudet"];

  for (let season = 2021; season <= currentSeason; season++) {
    if (rounds[season - 2021].length === 0) continue;
    seasonNames.push(season);
  }

  const seasonSelected = () => {
    const seasonSelector = document.getElementById("seasonSelector");
    setSelectedSeason(seasonSelector.value);

    if (
      selectedSorter === "championships" &&
      seasonSelector.value !== "Kaikki kaudet"
    ) {
      setSelectedSorter("score");
    }
  };

  //Setting the inspected sorter

  const [selectedSorter, setSelectedSorter] = useState("score");

  const sorterLabels = [
    "Pisteet",
    "Piste-ennätys",
    "Pistekeskiarvo",
    "Kierrosvoitot",
  ];

  if (selectedSeason === "Kaikki kaudet") sorterLabels.push("Kausimestaruudet");

  const sorterLabelDecoder = {
    Pisteet: "score",
    "Piste-ennätys": "record",
    Pistekeskiarvo: "average",
    Kierrosvoitot: "roundWins",
    Kausimestaruudet: "championships",
  };

  const sorterSelected = () => {
    //Erasing old highlighting
    let sorterCells = document.getElementsByClassName(selectedSorter);
    for (let i = 0; i < sorterCells.length; i++) {
      sorterCells[i].style = "";
    }

    const sorterSelecter = document.getElementById("sorterSelecter");
    setSelectedSorter(sorterLabelDecoder[sorterSelecter.value]);

    //New highlighting
    sorterCells = document.getElementsByClassName(
      sorterLabelDecoder[sorterSelecter.value]
    );

    for (let j = 0; j < sorterCells.length; j++) {
      sorterCells[j].style = "background-color: rgb(0 0 0 / 35%);";
    }
  };

  //CONSIDER MOVING DATA HANDLING TO APP.JS OR A SEPARATE FILE -> SAME DATA MAY BE NEEDED IN PROFILES

  //Functions for generating statistical figures

  const getScore = (scores) => {
    if (selectedSeason === "Kaikki kaudet") {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      return scores.reduce(reducer);
    }
    return scores[selectedSeason - 2021];
  };

  const getRecord = (records) => {
    if (selectedSeason === "Kaikki kaudet") {
      return Math.max(...records);
    }
    return records[selectedSeason - 2021];
  };

  const getAverage = (scores) => {
    if (selectedSeason === "Kaikki kaudet") {
      let roundsCount = 0;
      rounds.forEach((seasonRounds) => {
        roundsCount += seasonRounds.length;
      });
      const avg = getScore(scores) / roundsCount;
      return Math.round(avg * 100) / 100;
    }
    const roundsCount = rounds[selectedSeason - 2021].length;
    const avg = getScore(scores) / roundsCount;
    return Math.round(avg * 100) / 100;
  };

  const getRoundWins = (wins) => {
    if (selectedSeason === "Kaikki kaudet") {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      return wins.reduce(reducer);
    }
    return wins[selectedSeason - 2021];
  };

  const summedResults = rounds.map((season) =>
    season.map((round) => ({
      score: round.joel + round.johannes + round.tuomas,
      course: round.course,
      date: round.date,
    }))
  );

  const getSummedRecord = (results) => {
    if (selectedSeason === "Kaikki kaudet") {
      return _.maxBy(
        results.flatMap((rounds) => rounds),
        "score"
      );
    }
    return _.maxBy(results[selectedSeason - 2021], "score");
  };

  const contestantStatsList = contestants.map((contestant) => {
    return {
      name: contestant.name,
      score: getScore(contestant.scores),
      record: getRecord(contestant.records),
      average: getAverage(contestant.scores),
      roundWins: getRoundWins(contestant.roundWins),
      championships: contestant.championships,
    };
  });

  //Sorting by the inspected sorter before rendering
  contestantStatsList.sort((a, b) => {
    return b[selectedSorter] - a[selectedSorter];
  });

  return (
    <div>
      <div>
        <select
          id="seasonSelector"
          defaultValue="placeholder"
          onChange={seasonSelected}
        >
          <option value="placeholder" disabled hidden>
            Valitse kausi
          </option>
          {seasonNames.map((seasonName) => (
            <option key={seasonName}>{seasonName}</option>
          ))}
        </select>

        <select
          id="sorterSelecter"
          defaultValue="placeholder"
          onChange={sorterSelected}
        >
          <option value="placeholder" disabled hidden>
            Valitse järjestämisperuste
          </option>
          {sorterLabels.map((sorterLabel) => (
            <option key={sorterLabel}>{sorterLabel}</option>
          ))}
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
            {selectedSeason === "Kaikki kaudet" && <th>Kausimestaruudet</th>}
          </tr>

          {contestantStatsList.map((contestantStats, index) => (
            <tr key={contestantStats.name}>
              <td>{index + 1}</td>
              <td>{contestantStats.name}</td>
              <td className="score">{contestantStats.score}</td>
              <td className="record">{contestantStats.record}</td>
              <td className="average">{contestantStats.average}</td>
              <td className="roundWins">{contestantStats.roundWins}</td>
              {selectedSeason === "Kaikki kaudet" && (
                <td className="championships">
                  {contestantStats.championships}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Yhdessä lyöty bogeypiste-ennätys: {getSummedRecord(summedResults).score}{" "}
        ( {getSummedRecord(summedResults).course}
        {", "}
        {getSummedRecord(summedResults).date})
      </p>
    </div>
  );
};

export default Statistics;
