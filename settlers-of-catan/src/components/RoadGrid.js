import React from "react";

const RoadGrid = props => (
  <div className="roads-grid">
    {props.roadGrid.map((row, index) => (
      <div key={index} className="road-row">
        {row.map((road, index) => (
          <div
            key={index}
            className={`road ${road.direction} ${
              road.player !== null ? road.player.name : null
            }`}
            onClick={() => props.roadClickHandler(road.id)}
          />
        ))}
      </div>
    ))}
  </div>
);

export default RoadGrid;
