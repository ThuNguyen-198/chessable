import React from "react";
import { useState } from "react";

const QueryFrom = (props) => {
  const [fromTableList, setFromTableList] = useState(["col1", "col2", "col3"]);

  const handleFromInputChange = (event, index) => {
    event.preventDefault();
    const newData = [...props.fromData];
    newData[index] = event.target.value;
    props.setFromData(newData);
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
    <div className="group-by-block">
      <p className="query-step text-icon group-by">
        FROM
        <ion-icon
          name="add-circle-outline"
          onClick={handleAddFromRow}
        ></ion-icon>
      </p>
      <div className="group-by-container">
        <form>
          {props.fromData.map((row, index) => (
            <div className="group-by-row" key={index}>
              <select
                className="group-by-drop-down"
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
