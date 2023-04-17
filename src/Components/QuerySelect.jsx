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
    //upDate selectData
    props.setSelectData([]);
    const newSelectData = [];
    props.checkedCols.map((checkedCol) => {
      Object.entries(checkedCol.tableCols).map(([name, value]) => {
        if (value === true) {
          newSelectData.push(name);
        }
      });
    });
    props.setSelectData(newSelectData);
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
    console.log(props.checkedCols);
  }, []);

  return (
    <div className="select-block">
      <p className="query-step">SELECT</p>
      {props.chessDB && props.checkedCols && (
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
