import { useState, useEffect, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import QuerySelect from "./Components/QuerySelect";
import QueryWhere from "./Components/QueryWhere";
import QueryGroupBy from "./Components/QueryGroupBy";
import QueryFrom from "./Components/QueryFrom";
import chess from "./assets/chess.jpeg";

function App() {
  // Section Query
  // Section Query - SELECT

  const [selectData, setSelectData] = useState([]);
  const [checkedCols, setCheckedCols] = useState([]);

  const [chessDB, setchessDB] = useState([]);

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
      setchessDB([]);
      allTableNamesArray.map(async (nameItem) => {
        await axios
          .get("http://localhost:3000/" + nameItem)
          .then((response) => {
            setchessDB((prevData) => [
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
  }, []);

  // Section Query - FROM
  const [fromData, setFromData] = useState([]);
  // Section Query - WHERE
  const [whereColsToSelect, setWhereColsToSelect] = useState([]);
  const [whereData, setWhereData] = useState([]);
  useEffect(() => {
    const newWhereCols = [];
    fromData.map((fromTable) => {
      chessDB.map((dbTable) => {
        if (fromTable === dbTable.tableName) {
          Object.entries(dbTable.tableData[0]).map(([col, value]) => {
            newWhereCols.push(col);
          });
        }
      });
    });
    setWhereColsToSelect(newWhereCols);
  }, [fromData]);

  // Section Query - GROUP BY
  const [groupByData, setGroupByData] = useState([]);

  //Handle getting chessDB

  // Section Query - Handle string to submit
  const handleConvertToQuerySubmit = () => {
    let queryString = "";
    let selectString = "";
    let fromString = "";
    let whereString = "";
    let groupByString = "";

    let fromTableList = [];
    //Handle SELECT STRING

    for (let i = 0; i < selectData.length; i++) {
      if (i === 0) selectString += "SELECT ";
      if (i === selectData.length - 1) selectString += selectData[i];
      else selectString += selectData[i] + ", ";
    }

    //Handle FROM STRING

    for (let i = 0; i < fromData.length; i++) {
      if (i === 0) fromString += " FROM ";
      if (i === fromData.length - 1)
        fromString =
          fromString + " chessDB." + fromData[i] + " " + fromData[i].charAt(0);
      else
        fromString =
          fromString +
          " chessDB." +
          fromData[i] +
          " " +
          fromData[i].charAt(0) +
          " JOIN ";
    }

    //Handle WHERE STRING
    for (let i = 0; i < whereData.length; i++) {
      if (i === 0) whereString += " WHERE ";
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
      if (i === 0) groupByString += " GROUP BY ";
      if (i === groupByData.length - 1) groupByString += groupByData[i];
      else groupByString = groupByString + groupByData[i] + ", ";
    }

    //Handle querySring
    queryString = selectString + fromString + whereString + groupByString;
    console.log(queryString);

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

  const displayAudit = async () => {
    const response = await fetch("http://localhost:3000/sponsors/audit");
    const data = await response.json();
    setTableToDisplay(data);
    setResultTableKeys(Object.keys(data[0]));
    setIsDisplayTableMenu(!isDisplayTableMenu);
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
        setResultTableKeys(Object.keys(response.data[0]));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Section Result - Table To Display
  const handleDeleteTableToDisplayRow = (row) => {
    axios
      .delete("http://localhost:3000/sponsors/delete/" + row.sponsorID)
      .then((response) => {
        alert("Row deleted!");
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
        <div className="app-logo">
          <img src={chess} />
          <p>Chessable</p>
        </div>
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

          {chessDB.length == 5 && (
            <QuerySelect
              chessDB={chessDB}
              checkedCols={checkedCols}
              setCheckedCols={setCheckedCols}
              selectData={selectData}
              setSelectData={setSelectData}
            />
          )}
          {/* Section group by */}
          <QueryFrom
            chessDB={chessDB}
            fromData={fromData}
            setFromData={setFromData}
          />
          {/* Section where */}
          <QueryWhere
            whereData={whereData}
            setWhereData={setWhereData}
            whereColsToSelect={whereColsToSelect}
            setWhereColsToSelect={setWhereColsToSelect}
          />

          {/* Section group by */}
          <QueryGroupBy
            groupByData={groupByData}
            setGroupByData={setGroupByData}
            selectData={selectData}
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
                <li onClick={displayAudit}>Sponsors Audit</li>
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
            <textarea
              rows={2}
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
                      <div
                        className="row-menu"
                        onClick={() => handleDeleteTableToDisplayRow(row)}
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </div>
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
