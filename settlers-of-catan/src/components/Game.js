import React, { Component } from "react";
import "./../styles/game.css";

import HexGrid from "./HexGrid";
import RoadGrid from "./RoadGrid";

class Game extends Component {
  render() {
    return (
      <div className="board">
        <HexGrid />
        <RoadGrid />
      </div>
    );
  }
}

export default Game;
