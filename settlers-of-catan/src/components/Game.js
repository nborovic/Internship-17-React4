import React, { Component } from "react";
import "./../styles/game.css";

import HexGrid from "./HexGrid";
import RoadGrid from "./RoadGrid";
import SettlementGrid from "./SettlementGrid";

class Game extends Component {
  render() {
    return (
      <div className="board">
        <HexGrid />
        <RoadGrid />
        <SettlementGrid />
      </div>
    );
  }
}

export default Game;
