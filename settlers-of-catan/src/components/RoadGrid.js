import React from "react";

const createRoadGrid = radius => {
  const min = radius;
  const max = radius * 2 - 1;
  const roadGrid = [];
  let diagonalRow = [];
  let verticalRow = [];
  let secondHalf = [];

  for (let i = min; i <= max; i++) {
    // First half of the board
    for (let j = 1; j <= i * 2; j++) {
      diagonalRow.push({
        id: undefined,
        direction: j % 2 === 0 ? "down" : "up"
      });
      if (verticalRow.length < i + 1)
        verticalRow.push({ id: undefined, direction: "vertical" });
    }

    secondHalf.unshift(diagonalRow.slice().reverse());
    if (i !== max) secondHalf.unshift(verticalRow);

    roadGrid.push(diagonalRow);
    roadGrid.push(verticalRow);

    diagonalRow = [];
    verticalRow = [];
  }

  roadGrid.push(...secondHalf);

  return roadGrid;
};

const RoadGrid = () => (
  <div className="roads-grid">
    {createRoadGrid(3).map((row, index) => (
      <div key={index} className="road-row">
        {row.map((road, index) => (
          <div key={index} className={`road ${road.direction}`} />
        ))}
      </div>
    ))}
  </div>
);

export default RoadGrid;
