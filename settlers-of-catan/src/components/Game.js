import React, { Component } from "react";
import "./../styles/game.css";

import HexGrid from "./HexGrid";
import RoadGrid from "./RoadGrid";
import SettlementGrid from "./SettlementGrid";

class Game extends Component {
  render() {
    const boardRadius = 3;

    return (
      <div className="board">
        <HexGrid radius={boardRadius} />
        <RoadGrid radius={boardRadius} />
        <SettlementGrid radius={boardRadius} />
      </div>
    );
  }
}

export default Game;
