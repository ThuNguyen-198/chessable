import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./QuerySelect.css";

const QuerySelect = (props) => {
  const [isDisplayTables, setIsDisplayTables] = useState([false, false, false]);

  const displayQueryCols = (index) => {
    let tableState = [...isDisplayTables];
    tableState[index] = !tableState[index];
    setIsDisplayTables(tableState);
  };
  const handleOnChange = (event, index, colName) => {
    event.preventDefault();
    let data = [...props.checkedCols];
    data[index].tableCols = {
      ...data[index].tableCols,
      [colName]: !props.checkedCols[index].tableCols[colName],
    };
    props.setCheckedCols(data);
  };
  useEffect(() => {
    const data = [];
    props.chessDB.map((table, index) => {
      const tableName = table.tableName;
      const tableCols = {};
      Object.entries(table.tableData[0]).map(([name], i) => {
        tableCols[name] = false;
      });
      data.push({ tableName, tableCols });
    });
    props.setCheckedCols(data);
  }, []);

  useEffect(() => {
    console.log(props.chessDB);
    console.log(checkedCols);
  }, [checkedCols]);

  return (
    <div className="select-block">
      <p className="query-step">SELECT</p>

      <form>
        {props.chessDB.map((table, index) => (
          <div key={index}>
            <div
              className="text-icon table-name"
              onClick={() => displayQueryCols(index)}
            >
              {props.chessDB[index].tableName}
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            {isDisplayTables[index] ? (
              <div className="table-cols">
                {Object.entries(table.tableData[0]).map(([colName], i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      onChange={(event) =>
                        handleOnChange(event, index, colName)
                      }
                      name={colName}
                      checked={props.checkedCols[index].tableCols[colName]}
                    />
                    {colName}
                  </label>
                ))}

              </div>
              {isDisplayTables[index] ? (
                <div className="table-cols">
                  {Object.entries(table.tableData[0]).map(([colName], i) => (
                    <label key={i}>
                      <input
                        type="checkbox"
                        onChange={(event) =>
                          handleOnChange(event, index, colName)
                        }
                        name={colName}
                        checked={checkedCols[index].tableCols[colName]}
                      />
                      {colName}
                    </label>
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </form>
      )}
    </div>
  );
};

export default QuerySelect;

// const gamesCols = ["ECO", "name", "moves"];
// const [isDisplayGamesCols, setIsDisplayGamesCols] = useState(false);
// const [isDisplayToursCols, setIsDisplayToursCols] = useState(false);
// const [isDisplayPlayersCols, setIsDisplayPlayersCols] = useState(false);
// const [isDisplayOpeningsCols, setIsDisplayOpeningsCols] = useState(false);
// const [isDisplaySponsorsCols, setIsDisplaySponsorsCols] = useState(false);

// {
/* <div className="select-block">
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
    </div> */
// }
