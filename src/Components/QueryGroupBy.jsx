import React from "react";
import { useState } from "react";

const QueryGroupBy = (props) => {
  const handleGroupByInputChange = (event, index) => {
    event.preventDefault();
    const newData = [...props.groupByData];
    newData[index] = event.target.value;
    props.setGroupByData(newData);
  };

  const handleAddGroupByRow = (event) => {
    event.preventDefault();
    props.setGroupByData([...props.groupByData, ""]);
  };
  const handleRemoveGroupByRow = (event, index) => {
    event.preventDefault();
    const newData = [...props.groupByData];
    newData.splice(index, 1);
    props.setGroupByData(newData);
  };
  return (
    <div className="group-by-block">
      <p className="query-step text-icon group-by">
        GROUP BY
        <ion-icon
          name="add-circle-outline"
          onClick={handleAddGroupByRow}
        ></ion-icon>
      </p>
      <div className="group-by-container">
        <form>
          {props.groupByData.map((row, index) => (
            <div className="group-by-row" key={index}>
              <select
                className="group-by-drop-down"
                value={row}
                onChange={(event) => handleGroupByInputChange(event, index)}
              >
                <option key={-1} value="">
                  Select Column
                </option>
                {props.selectData.map((col, i) => (
                  <option key={i} value={col}>
                    {col}
                  </option>
                ))}
              </select>

              <button onClick={(event) => handleRemoveGroupByRow(event, index)}>
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default QueryGroupBy;
