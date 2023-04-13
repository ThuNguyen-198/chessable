import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  // Section Query
  // Section Query - SELECT
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
  const [isDisplayGamesCols, setIsDisplayGamesCols] = useState(false);
  const [isDisplayToursCols, setIsDisplayToursCols] = useState(false);
  const [isDisplayPlayersCols, setIsDisplayPlayersCols] = useState(false);
  const [isDisplayOpeningsCols, setIsDisplayOpeningsCols] = useState(false);
  const [isDisplaySponsorsCols, setIsDisplaySponsorsCols] = useState(false);
  const [checkedPlayersCols, setCheckedPlayersCols] = useState([]);
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

  // Section Query - WHERE
  const whereCols = [
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
  const whereParamList = [
    "=",
    ">=",
    "<=",
    "contains",
    "starts with",
    "ends with",
  ];
  const [numWhereRows, setNumWhereRows] = useState(0);
  const [isDisplayWhereCols, setIsDisplayWhereCols] = useState(false);
  const [isDisplayWhereParam, setIsDisplayWhereParam] = useState(false);
  const displayWhereCols = () => {
    setIsDisplayWhereCols(!isDisplayWhereCols);
  };
  const displayWhereParam = () => {
    setIsDisplayWhereParam(!isDisplayWhereParam);
  };
  const addNumWhereRow = () => {
    setNumWhereRows(numWhereRows + 1);
  };

  // Section Result
  // Section Result - Nav
  const [isDisplayTableMenu, setIsDisplayTableMenu] = useState(false);
  const [isDisplaySearchBar, setIsDisplaySearchBar] = useState(false);
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
  const [resultTableKeys, setResultTableKeys] = useState([]);
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
    setResultTableKeys(Object.keys(tableToDisplay[0]));
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
  // Section Result - Query Bar
  const [query, setQuery] = useState("");
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    console.log(query);
  };
  const handleQuerySubmit = () => {
    console.log(query);
  };
  // Section Graphs

  // const [conditionQuery, setConditionQuery] = useState([]);

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
            <p className="query-step text-icon where">
              WHERE
              <ion-icon
                name="add-circle-outline"
                onClick={addNumWhereRow}
              ></ion-icon>
            </p>
            <div className="where-block">
              {[...Array(numWhereRows)].map((row, index) => (
                <form className="where-row" key={index}>
                  <div className="where-col">
                    <button
                      className="text-icon"
                      type="button"
                      onClick={displayWhereCols}
                    >
                      Column
                      <ion-icon name="chevron-down-outline"></ion-icon>
                    </button>
                    {isDisplayWhereCols ? (
                      <ul className="where-col-dropdown">
                        {whereCols.map((col, i) => (
                          <li key={i}>{col}</li>
                        ))}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="where-param">
                    <button
                      className="text-icon"
                      type="button"
                      onClick={displayWhereParam}
                    >
                      equals
                      <ion-icon name="chevron-down-outline"></ion-icon>
                    </button>
                    {isDisplayWhereParam ? (
                      <ul className="where-param-dropdown">
                        {whereParamList.map((condition, i) => (
                          <li key={i} className="dropdown-item">
                            {condition}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </div>
                  <input />
                </form>
              ))}
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
          <form className="writen-query">
            {/* <label>Query</label> */}
            <input
              placeholder="Write your query..."
              value={query}
              onChange={handleQueryChange}
            />
            <button onClick={handleQuerySubmit}>Submit</button>
          </form>
          <div className="results">
            <table>
              <thead>
                <tr>
                  {resultTableKeys.map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableToDisplay.map((row, index) => (
                  <tr key={index}>
                    {resultTableKeys.map((key) => (
                      <td key={key}>{row[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* Section Graphs Container */}

        <section className="graphs-container">
          <div className="graphs-header-bar">
            <div className="options-bar">Graphs</div>
            <ion-icon name="menu-outline"></ion-icon>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
