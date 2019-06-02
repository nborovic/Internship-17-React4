import React from "react";

const createRoadGrid = radius => {
  const min = radius;
  const max = radius * 2 - 1;
  const roadGrid = [];
  let diagonalRow = [];
  let verticalRow = [];
  let secondHalf = [];

  for (let i = min; i <= max; i++) {
    for (let j = 1; j <= i * 2; j++) {
      diagonalRow.push({
        id: null,
        direction: j % 2 === 0 ? "down" : "up"
      });
      if (verticalRow.length < i + 1)
        verticalRow.push({ id: null, direction: "vertical" });
    }

    secondHalf.unshift(JSON.parse(JSON.stringify(diagonalRow)).reverse());
    if (i !== max) secondHalf.unshift(JSON.parse(JSON.stringify(verticalRow)));

    roadGrid.push([...diagonalRow]);
    roadGrid.push([...verticalRow]);

    diagonalRow = [];
    verticalRow = [];
  }

  roadGrid.push(...secondHalf);

  let index = 0;
  roadGrid.forEach(row =>
    row.forEach(road => {
      road.id = index;
      index++;
    })
  );

  console.log(roadGrid);

  return roadGrid;
};

const onMouseOver = () => {
  console.log("tada!");
};

const RoadGrid = () => (
  <div className="roads-grid">
    {createRoadGrid(3).map((row, index) => (
      <div key={index} className="road-row">
        {row.map((road, index) => (
          <div
            key={index}
            onMouseOver={e => onMouseOver}
            className={`road ${road.direction}`}
          />
        ))}
      </div>
    ))}
  </div>
);

export default RoadGrid;
