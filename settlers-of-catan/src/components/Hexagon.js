import React from "react";

const Hexagon = props => (
  <div className={`hexagon ${props.type}`}>
    <p className="value">{props.value}</p>
  </div>
);

export default Hexagon;
