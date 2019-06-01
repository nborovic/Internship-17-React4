import React, { Component } from "react";
import "./../styles/game.css";

const ROWS = [3, 4, 5, 4, 3];

const MATERIALS = [
  "wood",
  "wood",
  "wood",
  "wood",
  "sheep",
  "sheep",
  "sheep",
  "sheep",
  "wheat",
  "wheat",
  "wheat",
  "wheat",
  "brick",
  "brick",
  "brick",
  "stone",
  "stone",
  "stone",
  "desert"
];

const HEXAGONS = [];

class Game extends Component {
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  componentWillMount() {
    this.shuffle(MATERIALS);

    HEXAGONS.push(MATERIALS.slice(0, 3));
    HEXAGONS.push(MATERIALS.slice(3, 7));
    HEXAGONS.push(MATERIALS.slice(7, 12));
    HEXAGONS.push(MATERIALS.slice(12, 16));
    HEXAGONS.push(MATERIALS.slice(16, 19));

    console.log(HEXAGONS);
  }

  render() {
    const hexagons = HEXAGONS.map(row => (
      <div className="game__row">
        {row.map(hexagon => (
          <div className={`hexagon ${hexagon}`} />
        ))}
      </div>
    ));

    return <div className="game">{hexagons}</div>;
  }
}

export default Game;
