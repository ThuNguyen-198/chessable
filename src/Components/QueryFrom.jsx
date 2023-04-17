import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./QueryFrom.css";

const QueryFrom = (props) => {
  const fromTableList = props.chessDB.map((table) => table.tableName);

  const handleFromInputChange = (event, index) => {
    event.preventDefault();
    const newData = [...props.fromData];
    newData[index] = event.target.value;
    props.setFromData(newData);
    console.log(props.fromData);
  };

  const handleAddFromRow = (event) => {
    event.preventDefault();
    props.setFromData([...props.fromData, ""]);
  };
  const handleRemoveFromRow = (event, index) => {
    event.preventDefault();
    const newData = [...props.fromData];
    newData.splice(index, 1);
    props.setFromData(newData);
  };
  return (
    <div className="from-block">
      <p className="query-step text-icon from">
        FROM
        <ion-icon
          name="add-circle-outline"
          onClick={handleAddFromRow}
        ></ion-icon>
      </p>
      <div className="from-container">
        <form>
          {props.fromData.map((row, index) => (
            <div className="from-row" key={index}>
              <select
                className="from-drop-down"
                value={row}
                onChange={(event) => handleFromInputChange(event, index)}
              >
                <option key={-1} value="">
                  Select Table
                </option>
                {fromTableList.map((col, i) => (
                  <option key={i} value={col}>
                    {col}
                  </option>
                ))}
              </select>

              <button onClick={(event) => handleRemoveFromRow(event, index)}>
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default QueryFrom;
