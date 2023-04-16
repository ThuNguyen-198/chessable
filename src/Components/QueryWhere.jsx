import React from "react";
import { useState } from "react";

const QueryWhere = (props) => {
  const whereConditionList = [
    ">",
    ">=",
    "<",
    "<=",
    "BETWEEN",
    "NOT BETWEEN",
    "IN",
    "NOT IN",
    "LIKE",
    "NOT LIKE",
  ];

  const handleWhereInputChange = (event, index) => {
    event.preventDefault();
    const { name, value } = event.target;
    const newData = [...props.whereData];
    newData[index][name] = value;
    props.setWhereData(newData);
  };
  const handleAddWhereRow = (event) => {
    event.preventDefault();

    props.setWhereData([
      ...props.whereData,
      {
        whereObject: "",
        whereCondition: "",
        whereComparedValue: "",
      },
    ]);
  };
  const handleRemoveWhereRow = (event, index) => {
    event.preventDefault();
    const newData = [...props.whereData];
    newData.splice(index, 1);
    props.setWhereData(newData);
  };

  return (
    <div className="where-block">
      <form>
        <p className="query-step text-icon where">
          WHERE
          <ion-icon
            name="add-circle-outline"
            onClick={handleAddWhereRow}
          ></ion-icon>
        </p>
        <div className="where-container">
          {props.whereData.map((row, index) => (
            <div className="where-row" key={index}>
              <select
                className="where-object-drop-down"
                id={`whereObject-${index}`}
                name="whereObject"
                value={row.whereObject}
                onChange={(event) => handleWhereInputChange(event, index)}
              >
                <option value="">Column</option>
                <option value="playerID">playerID</option>
                <option value="fName">fName</option>
                <option value="lName">lName</option>
              </select>
              <select
                className="where-condition-drop-down"
                id={`whereCondition-${index}`}
                name="whereCondition"
                value={row.whereCondition}
                onChange={(event) => handleWhereInputChange(event, index)}
              >
                <option key={-1} value=""></option>
                {whereConditionList.map((condition, i) => (
                  <option key={i} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
              <input
                className="where-compared-value-drop-down"
                name="whereComparedValue"
                value={row.whereComparedValue}
                onChange={(event) => handleWhereInputChange(event, index)}
                placeholder="Some value..."
              ></input>
              <button onClick={(event) => handleRemoveWhereRow(event, index)}>
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default QueryWhere;
