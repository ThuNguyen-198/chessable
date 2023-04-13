import { useState } from "react";
import "./App.css";

function App() {
  const playerKeys = [
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
  const conditionList = [
    "=",
    ">=",
    "<=",
    "contains",
    "starts with",
    "ends with",
  ];
  const [count, setCount] = useState(0);
  const [isDisplaySearchBar, setIsDisplaySearchBar] = useState(false);
  const [isDisplayTableMenu, setIsDisplayTableMenu] = useState(false);
  const [isDisplayGamesCols, setIsDisplayGamesCols] = useState(false);
  const [isDisplayToursCols, setIsDisplayToursCols] = useState(false);
  const [isDisplayPlayersCols, setIsDisplayPlayersCols] = useState(false);
  const [isDisplayOpeningsCols, setIsDisplayOpeningsCols] = useState(false);
  const [isDisplaySponsorsCols, setIsDisplaySponsorsCols] = useState(false);
  const [tableToDisplay, setTableToDisplay] = useState([
    {
      playerID: "1",
      fName: "James",
      lName: "Smith",
      age: "18",
      gender: "M",
      phoneNo: "123-456-7890",
      address: "sd",
      rating: "5",
      title: "ds",
      country: "sde",
      totalGames: "gs",
      totalWins: "sf",
      totalLoses: "adf",
      totalDraws: "adw",
    },
  ]);
  const [keys, setKeys] = useState([]);
  const [checkedPlayersCols, setCheckedPlayersCols] = useState([]);
  const [conditionQuery, setConditionQuery] = useState([]);

  const handleCheckboxPlayers = (event) => {
    setCheckedPlayersCols({
      ...checkedPlayersCols,
      [event.target.name]: event.target.checked,
    });
  };
  const handlePlayersFormSubmit = (event) => {
    event.preventDefault();
    console.log(checkedPlayersCols);
  };
  const displayTable = () => {
    setTableToDisplay([
      {
        playerID: "1",
        fName: "James",
        lName: "Smith",
        age: "18",
        gender: "M",
        phoneNo: "123-456-7890",
        address: "sd",
        rating: "5",
        title: "ds",
        country: "sde",
        totalGames: "gs",
        totalWins: "sf",
        totalLoses: "adf",
        totalDraws: "adw",
      },
      {
        playerID: "1",
        fName: "James",
        lName: "Smith",
        age: "18",
        gender: "M",
        phoneNo: "123-456-7890",
        address: "sd",
        rating: "5",
        title: "ds",
        country: "sde",
        totalGames: "gs",
        totalWins: "sf",
        totalLoses: "adf",
        totalDraws: "adw",
      },
      {
        playerID: "1",
        fName: "James",
        lName: "Smith",
        age: "18",
        gender: "M",
        phoneNo: "123-456-7890",
        address: "sd",
        rating: "5",
        title: "ds",
        country: "sde",
        totalGames: "gs",
        totalWins: "sf",
        totalLoses: "adf",
        totalDraws: "adw",
      },
      {
        playerID: "1",
        fName: "James",
        lName: "Smith",
        age: "18",
        gender: "M",
        phoneNo: "123-456-7890",
        address: "sd",
        rating: "5",
        title: "ds",
        country: "sde",
        totalGames: "gs",
        totalWins: "sf",
        totalLoses: "adf",
        totalDraws: "adw",
      },
      {
        playerID: "1",
        fName: "James",
        lName: "Smith",
        age: "18",
        gender: "M",
        phoneNo: "123-456-7890",
        address: "sd",
        rating: "5",
        title: "ds",
        country: "sde",
        totalGames: "gs",
        totalWins: "sf",
        totalLoses: "adf",
        totalDraws: "adw",
      },
    ]);
    setKeys(Object.keys(tableToDisplay[0]));
    setIsDisplayTableMenu(!isDisplayTableMenu);
  };
  const displaySearchBar = () => {
    setIsDisplaySearchBar(!isDisplaySearchBar);
    console.log(isDisplaySearchBar);
  };
  const displayTableMenu = () => {
    setIsDisplayTableMenu(!isDisplayTableMenu);
    console.log(isDisplayTableMenu);
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
    <div className="app-container">
      {/* Main-navigation */}
      <div className="main-nav">
        <div className="app-name">Chessable</div>
        <div className="auth">
          <div className="btn btn-signup">Signup</div>
          <div className="btn btn-login">Login</div>
        </div>
      </div>
      <div className="body">
        {/* Section Query Container */}
        <section className="query-container">
          <p className="options-bar">Query</p>
          <div className="query-block">
            <p className="query-step">Choose Columns</p>
            <ul className="query-table-list">
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
                  className="text-icon"
                  onClick={() => displayQueryCols("players")}
                >
                  Players
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
                {isDisplayPlayersCols ? (
                  <form onSubmit={handlePlayersFormSubmit}>
                    {playerKeys.map((col, index) => (
                      <label key={index}>
                        <input
                          type="checkbox"
                          name={col}
                          checked={checkedPlayersCols.col}
                          onChange={handleCheckboxPlayers}
                        />
                        {col}
                      </label>
                    ))}
                    <button type="submit">Confirm</button>
                  </form>
                ) : (
                  <></>
                )}
              </li>

              <li>
                <div
                  className="text-icon"
                  onClick={() => displayQueryCols("games")}
                >
                  Games
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </div>
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
          <div className="query-block">
            <p className="query-step text-icon conditions">
              Conditions
              <ion-icon name="add-circle-outline"></ion-icon>
            </p>
            <div className="condition-block">
              <div>Col List</div>
              <div class="dropdown">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown button
                </button>
                <ul class="dropdown-menu">
                  {conditionList.map((condition, i) => (
                    <li class="dropdown-item">{condition}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Section Content Container */}
        <section className="content-container">
          <div className="options-bar">
            {isDisplayTableMenu ? (
              <ul className="dropdown-table-menu">
                <li onClick={displayTable}>Players</li>
                <li onClick={displayTable}>Games</li>
                <li onClick={displayTable}>Tournaments</li>
                <li onClick={displayTable}>Openings</li>
                <li onClick={displayTable}>Sponsors</li>
              </ul>
            ) : (
              <></>
            )}
            <div className="text-icon" onClick={displayTableMenu}>
              Display Table
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <ion-icon name="funnel-outline"></ion-icon>
            {isDisplaySearchBar ? (
              <form>
                <input placeholder="Search..."></input>
              </form>
            ) : (
              <></>
            )}
            <ion-icon
              onClick={displaySearchBar}
              name="search-outline"
            ></ion-icon>
          </div>
          <section className="results">
            <table>
              <thead>
                <tr>
                  {keys.map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableToDisplay.map((row, index) => (
                  <tr key={index}>
                    {keys.map((key) => (
                      <td key={key}>{row[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </section>
        {/* Section Graphs Container */}

        <section className="graphs-container">
          <div className="graphs-header-bar">
            <div>Graphs</div>
            <ion-icon name="menu-outline"></ion-icon>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
