import React from "react";
import Hexagon from "./Hexagon";

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const createHexGrid = radius => {
  const min = radius;
  const max = radius * 2 - 1;
  const hexGrid = [];
  let row = [];

  // Creates hex types array
  const hexTypesInfo = [
    { type: "wood", count: 4 },
    { type: "sheep", count: 4 },
    { type: "wheat", count: 4 },
    { type: "brick", count: 3 },
    { type: "stone", count: 3 },
    { type: "desert", count: 1 }
  ];

  const hexTypes = [];

  hexTypesInfo.forEach(hex => {
    for (let i = hex.count; i > 0; i--) hexTypes.push(hex.type);
  });

  shuffle(hexTypes);

  // Creates values array
  const values = [];

  for (let i = 2; i <= 12; i++) {
    values.push(i);
    if (i !== 2 && i !== 12) values.push(i);
  }

  shuffle(values);

  // Creates hexagon grid array
  let index = 0;

  for (let i = max; i >= min; i--) {
    for (let j = i; j > 0; j--) {
      row.push({
        id: null,
        type: hexTypes[index],
        value: hexTypes[index] === "desert" ? null : values[index],
        topRightRoadId: null,
        topLeftRoadId: null,
        rightRoadId: null,
        leftRoadId: null,
        bottomRightRoadId: null,
        bottomLeftRoadId: null,
        topSettlementId: null,
        topRightSettlementId: null,
        topLeftSettlementId: null,
        bottomRightSettlementId: null,
        bottomLeftSettlementId: null,
        bottomSettlementId: null
      });
      index++;
    }

    hexGrid.push(JSON.parse(JSON.stringify(row)));
    if (i !== max) hexGrid.unshift(JSON.parse(JSON.stringify(row)));
    row = [];
  }

  hexGrid.flat().forEach((hex, index) => {
    hex.id = index + 1;
    hex.type = hexTypes[index];
    hex.value = hexTypes[index] === "desert" ? null : values[index];
  });

  let pastRows = 0;
  let pastRow = 0;

  hexGrid.forEach((row, rowIndex) => {
    pastRow =
      row.length * 3 +
      1 +
      (rowIndex + 1 > Math.round(hexGrid.length / 2) ? 2 : 0);

    row.forEach((hex, hexIndex) => {
      let hexId = hexIndex + 1;
      let secondHalf = rowIndex + 1 > Math.round(hexGrid.length / 2);
      let secondHalfBottom = rowIndex + 1 >= Math.round(hexGrid.length / 2);

      hex.topRightRoadId = pastRows + hexId * 2 + (secondHalf ? 1 : 0);

      hex.topLeftRoadId = pastRows + hexId * 2 - 1 + (secondHalf ? 1 : 0);

      hex.rightRoadId =
        pastRows + row.length * 2 + hexId + 1 + (secondHalf ? 2 : 0);

      hex.leftRoadId = pastRows + row.length * 2 + hexId + (secondHalf ? 2 : 0);

      hex.bottomRightRoadId =
        pastRows + pastRow + hexId * 2 + 1 - (secondHalfBottom ? 1 : 0);

      hex.bottomLeftRoadId =
        pastRows + pastRow + hexId * 2 - (secondHalfBottom ? 1 : 0);
    });
    pastRows += pastRow;
  });

  pastRows = 0;

  hexGrid.forEach((row, rowIndex) => {
    pastRow =
      row.length * 2 +
      1 +
      (rowIndex + 1 > Math.round(hexGrid.length / 2) ? 2 : 0);

    console.log(pastRow);

    row.forEach((hex, hexIndex) => {
      let hexId = hexIndex + 1;
      let secondHalf = rowIndex + 1 > Math.round(hexGrid.length / 2);
      let secondHalfBottom = rowIndex + 1 >= Math.round(hexGrid.length / 2);

      hex.topRightSettlementId =
        pastRows + hexId * 2 + 1 + (secondHalf ? 1 : 0);
      hex.topLeftSettlementId = pastRows + hexId * 2 - 1 + (secondHalf ? 1 : 0);
      hex.topSettlementId = pastRows + hexId * 2 + (secondHalf ? 1 : 0);
      hex.bottomSettlementId =
        pastRows + pastRow + hexId * 2 + 1 - (secondHalfBottom ? 1 : 0);
      hex.bottomRightSettlementId =
        pastRows + pastRow + hexId * 2 + 2 - (secondHalfBottom ? 1 : 0);
      hex.bottomLeftSettlementId =
        pastRows + pastRow + hexId * 2 - (secondHalfBottom ? 1 : 0);
    });

    pastRows += pastRow;
  });

  console.log(hexGrid);

  return hexGrid;
};

const HexGrid = props => (
  <div className="hexgrid">
    {createHexGrid(props.radius).map((row, index) => (
      <div key={index} className="game__row">
        {row.map((hexagon, index) => (
          <Hexagon
            key={index}
            type={hexagon.type}
            value={hexagon.value}
            last={index === row.length - 1}
          />
        ))}
      </div>
    ))}
  </div>
);

export default HexGrid;
