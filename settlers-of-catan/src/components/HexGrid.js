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

  for (let i = 2; i < hexTypes.length; i++) {
    values.push(i);
    if (i !== 2 && i !== hexTypes.length) values.push(i);
  }

  shuffle(values);

  // Creates hexagon grid array
  let index = 0;

  for (let i = max; i >= min; i--) {
    // First half of the board
    for (let j = i; j > 0; j--) {
      row.push({ type: hexTypes[index], value: values[index] });
      index++;
    }

    hexGrid.push(row);
    row = [];

    // Second half of the board
    if (i !== max) {
      for (let j = i; j > 0; j--) {
        row.push({ type: hexTypes[index], value: values[index] });
        index++;
      }
      hexGrid.unshift(row);
      row = [];
    }
  }

  return hexGrid;
};

const HexGrid = () => (
  <div className="hexgrid">
    {createHexGrid(3).map((row, index) => (
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
