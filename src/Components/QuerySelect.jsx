import React from "react";
import { useState } from "react";

const QuerySelect = (props) => {
  const playerCols = [
    "playerID",
    "fName",
    "lName",
    "age",
    "gender",
    "phoneNo",
    "address",
    "rating",
    "title",
    "country",
    "totalGames",
    "totalWins",
    "totalLoses",
    "totalDraws",
  ];
  const gamesCols = ["ECO", "name", "moves"];
  const [isDisplayGamesCols, setIsDisplayGamesCols] = useState(false);
  const [isDisplayToursCols, setIsDisplayToursCols] = useState(false);
  const [isDisplayPlayersCols, setIsDisplayPlayersCols] = useState(false);
  const [isDisplayOpeningsCols, setIsDisplayOpeningsCols] = useState(false);
  const [isDisplaySponsorsCols, setIsDisplaySponsorsCols] = useState(false);

  const handleCheckboxPlayers = (event) => {
    const newValue = event.target.value;
    props.setCheckedPlayersCols([
      ...props.checkedPlayersCols,
      event.target.name,
    ]);
  };
  const handleCheckboxGames = (event) => {
    props.setCheckedGamesCols([...props.checkedGamesCols, event.target.name]);
  };
  const handlePlayersFormSubmit = (event) => {
    event.preventDefault();
  };
  const displayQueryCols = (tableName) => {
    if (tableName === "players") setIsDisplayPlayersCols(!isDisplayPlayersCols);
    else if (tableName === "games") setIsDisplayGamesCols(!isDisplayGamesCols);
    else if (tableName === "tournaments")
      setIsDisplayToursCols(!isDisplayToursCols);
    else if (tableName === "sponsors")
      setIsDisplaySponsorsCols(!isDisplaySponsorsCols);
    else if (tableName === "openings")
      setIsDisplayOpeningsCols(!isDisplayOpeningsCols);
  };
  return (
    <div className="select-block">
      <p className="query-step">SELECT</p>
      <ul className="select-table-list">
        <li>
          <div
            className="text-icon"
            onClick={() => displayQueryCols("tournaments")}
          >
            Tournaments
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
        </li>
        <li>
          <div
            className="text-icon select-table"
            onClick={() => displayQueryCols("players")}
          >
            Players
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
          {isDisplayPlayersCols ? (
            <form onSubmit={handlePlayersFormSubmit}>
              {playerCols.map((col, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name={col}
                    checked={props.checkedPlayersCols.col}
                    onChange={handleCheckboxPlayers}
                  />
                  {col}
                </label>
              ))}
            </form>
          ) : (
            <></>
          )}
        </li>
        <li>
          <div
            className="text-icon select-table"
            onClick={() => displayQueryCols("games")}
          >
            Games
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
          {isDisplayGamesCols ? (
            <form>
              {gamesCols.map((col, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    name={col}
                    checked={props.checkedGamesCols.col}
                    onChange={handleCheckboxGames}
                  />
                  {col}
                </label>
              ))}
            </form>
          ) : (
            <></>
          )}
        </li>

        <li>
          <div
            className="text-icon"
            onClick={() => displayQueryCols("openings")}
          >
            Openings
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
        </li>
        <li>
          <div
            className="text-icon"
            onClick={() => displayQueryCols("sponsors")}
          >
            Sponsors
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default QuerySelect;
