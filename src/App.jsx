import { useState, useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import QuerySelect from "./Components/QuerySelect";
import QueryWhere from "./Components/QueryWhere";
import QueryGroupBy from "./Components/QueryGroupBy";

function App() {
  // Section Query
  // Section Query - SELECT
  const [checkedPlayersCols, setCheckedPlayersCols] = useState([]);
  const [checkedGamesCols, setCheckedGamesCols] = useState([]);
  const [chessDBTest, setchessDBTest] = useState([]);

  const allTableNamesArray = [
    "players",
    "games",
    "tournaments",
    "sponsors",
    "openings",
  ];

  // At render - get chessDB
  useEffect(() => {
    const fetchAllTables = async () => {
      allTableNamesArray.map(async (nameItem) => {
        await axios
          .get("http://localhost:3000/" + nameItem)
          .then((response) => {
            setchessDBTest((prevData) => [
              ...prevData,
              {
                tableName: nameItem,
                tableData: response.data,
              },
            ]);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    };

    fetchAllTables();
    console.log(chessDBTest);
  }, []);

  // Section Query - WHERE
  const [whereData, setWhereData] = useState([]);

  // Section Query - GROUP BY
  const [groupByData, setGroupByData] = useState([]);

  // Section Query - Handle string to submit
  const handleConvertToQuerySubmit = () => {
    let queryString = "";
    let selectString = "SELECT ";
    let fromString = " FROM ";
    let whereString = " WHERE ";
    let groupByString = " GROUP BY ";

    let fromTableList = [];
    //Handle SELECT STRING
    if (checkedPlayersCols.length > 0) {
      if (fromTableList.length > 0) selectString += ", ";
      for (let i = 0; i < checkedPlayersCols.length; i++) {
        if (i === checkedPlayersCols.length - 1)
          selectString = selectString + checkedPlayersCols[i];
        else selectString = selectString + checkedPlayersCols[i] + ", ";
      }
      fromTableList = [...fromTableList, "chessDB.players"];
    }
    if (checkedGamesCols.length > 0) {
      if (fromTableList.length > 0) selectString += ", ";
      for (let i = 0; i < checkedGamesCols.length; i++) {
        if (i === checkedGamesCols.length - 1)
          selectString = selectString + checkedGamesCols[i];
        else selectString = selectString + checkedGamesCols[i] + ", ";
      }
      fromTableList = [...fromTableList, "chessDB.games"];
    }
    //Handle FROM STRING
    for (let i = 0; i < fromTableList.length; i++) {
      if (i === fromTableList.length - 1)
        fromString = fromString + fromTableList[i];
      else fromString = fromString + fromTableList[i] + " JOIN ";
    }

    //Handle WHERE STRING
    for (let i = 0; i < whereData.length; i++) {
      if (i === whereData.length - 1)
        whereString +=
          whereData[i].whereObject +
          " " +
          whereData[i].whereCondition +
          " " +
          whereData[i].whereComparedValue;
      else
        whereString +=
          whereData[i].whereObject +
          " " +
          whereData[i].whereCondition +
          " " +
          whereData[i].whereComparedValue +
          " AND ";
    }
    //Handle GROUP BY STRING
    for (let i = 0; i < groupByData.length; i++) {
      if (i === groupByData.length - 1) groupByString += groupByData[i];
      else groupByString = groupByString + groupByData[i] + ", ";
    }

    //Handle querySring
    queryString = selectString + fromString + whereString + groupByString;
    //queryString = selectString + fromString;

    axios
      .post("http://localhost:3000/query", { query: query })
      .then((response) => {
        console.log(response.data);
        setTableToDisplay(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setQuery(queryString);
  };

  // Section Result
  // Section Result - Nav
  const [isDisplayTableMenu, setIsDisplayTableMenu] = useState(false);
  const [isDisplaySearchBar, setIsDisplaySearchBar] = useState(false);
  const [tableToDisplay, setTableToDisplay] = useState([]);
  const [resultTableKeys, setResultTableKeys] = useState([]);
  const [displayResultsTable, setDisplayResultsTable] = useState(false);
  const [tableName, setTableName] = useState("");

  useEffect(() => {
    const displayTable = async () => {
      const response = await fetch("http://localhost:3000/" + tableName);
      const data = await response.json();
      setTableToDisplay(data);
      setResultTableKeys(Object.keys(data[0]));
      setIsDisplayTableMenu(!isDisplayTableMenu);
    };
    if (tableName !== "") {
      displayTable();
    }
  }, [tableName]);

  const displaySearchBar = () => {
    setIsDisplaySearchBar(!isDisplaySearchBar);
  };
  const displayTableMenu = () => {
    setIsDisplayTableMenu(!isDisplayTableMenu);
  };
  // Section Result - Query Bar
  const [query, setQuery] = useState("");
  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };
  const handleQuerySubmit = () => {
    axios
      .post("http://localhost:3000/query", { query: query })
      .then((response) => {
        console.log(response.data);
        setTableToDisplay(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Section Graphs

  // const [conditionQuery, setConditionQuery] = useState([]);

  return (
    <div className="app-container">
      {/* Main-navigation */}
      <div className="main-nav">
        <div className="app-name">Chessable</div>
        <div className="auth">
          <div className="btn-signup">Signup</div>
          <div className="btn-login">Login</div>
        </div>
      </div>
      <div className="body">
        {/* Section Query Container */}
        <section className="query-container">
          <p className="options-bar">Query</p>
          {/* Section select */}
          <QuerySelect
            checkedPlayersCols={checkedPlayersCols}
            setCheckedPlayersCols={setCheckedPlayersCols}
            checkedGamesCols={checkedGamesCols}
            setCheckedGamesCols={setCheckedGamesCols}
          />
          {/* Section where */}
          <QueryWhere whereData={whereData} setWhereData={setWhereData} />

          {/* Section group by */}
          <QueryGroupBy
            groupByData={groupByData}
            setGroupByData={setGroupByData}
          />
          <button
            className="btn-convert-to-query-submit"
            onClick={handleConvertToQuerySubmit}
          >
            Submit
          </button>
        </section>
        {/* Section Content Container */}
        <section className="content-container">
          <div className="options-bar">
            {isDisplayTableMenu ? (
              <ul className="dropdown-table-menu">
                <li onClick={() => setTableName("players")}>Players</li>
                <li onClick={() => setTableName("games")}>Games</li>
                <li onClick={() => setTableName("tournaments")}>Tournaments</li>
                <li onClick={() => setTableName("openings")}>Openings</li>
                <li onClick={() => setTableName("sponsors")}>Sponsors</li>
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
            <button type="button" onClick={handleQuerySubmit}>
              Submit
            </button>
          </form>

          <div className="results">
            <table>
              <thead>
                <tr>
                  {resultTableKeys &&
                    resultTableKeys.map((key) => <th key={key}>{key}</th>)}
                </tr>
              </thead>
              <tbody>
                {tableToDisplay &&
                  tableToDisplay.map((row, index) => (
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
