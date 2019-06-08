import React, { Component } from "react";
import "./../styles/game.css";

import HexGrid from "./HexGrid";
import RoadGrid from "./RoadGrid";
import SettlementGrid from "./SettlementGrid";
import Options from "./Options";

import {
  updateHexagons,
  updateRoads,
  updateSettlements
} from "./../redux/actions/boardActions";
import {
  setRoadBuilt,
  setSettlementBuilt,
  changeTurn,
  changePlayer,
  throwDice
} from "./../redux/actions/turnActions";
import { updatePlayers } from "./../redux/actions/playerActions";
import { connect } from "react-redux";

const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

class Game extends Component {
  mapSettlementIdsToHexagons = hexGrid => {
    let pastRows = 0;
    let pastRow = 0;

    hexGrid.forEach((row, rowIndex) => {
      pastRow =
        row.length * 2 +
        1 +
        (rowIndex + 1 > Math.round(hexGrid.length / 2) ? 2 : 0);

      row.forEach((hex, hexIndex) => {
        let secondHalf = rowIndex + 1 > Math.round(hexGrid.length / 2);
        let secondHalfBottom = rowIndex + 1 >= Math.round(hexGrid.length / 2);

        hex.settlementIds[1] =
          pastRows + (hexIndex + 1) * 2 + 1 + (secondHalf ? 1 : 0);
        hex.settlementIds[2] =
          pastRows + (hexIndex + 1) * 2 - 1 + (secondHalf ? 1 : 0);
        hex.settlementIds[0] =
          pastRows + (hexIndex + 1) * 2 + (secondHalf ? 1 : 0);
        hex.settlementIds[5] =
          pastRows +
          pastRow +
          (hexIndex + 1) * 2 +
          1 -
          (secondHalfBottom ? 1 : 0);
        hex.settlementIds[3] =
          pastRows +
          pastRow +
          (hexIndex + 1) * 2 +
          2 -
          (secondHalfBottom ? 1 : 0);
        hex.settlementIds[4] =
          pastRows + pastRow + (hexIndex + 1) * 2 - (secondHalfBottom ? 1 : 0);
      });

      pastRows += pastRow;
    });
  };

  mapRoadIdsToHexagons = hexGrid => {
    let pastRows = 0;
    let pastRow = 0;

    hexGrid.forEach((row, rowIndex) => {
      pastRow =
        row.length * 3 +
        1 +
        (rowIndex + 1 > Math.round(hexGrid.length / 2) ? 2 : 0);

      row.forEach((hex, hexIndex) => {
        let secondHalf = rowIndex + 1 > Math.round(hexGrid.length / 2);
        let secondHalfBottom = rowIndex + 1 >= Math.round(hexGrid.length / 2);

        hex.roadIds[0] = pastRows + (hexIndex + 1) * 2 + (secondHalf ? 1 : 0);

        hex.roadIds[1] =
          pastRows + (hexIndex + 1) * 2 - 1 + (secondHalf ? 1 : 0);

        hex.roadIds[2] =
          pastRows + row.length * 2 + (hexIndex + 1) + 1 + (secondHalf ? 2 : 0);

        hex.roadIds[3] =
          pastRows + row.length * 2 + (hexIndex + 1) + (secondHalf ? 2 : 0);

        hex.roadIds[4] =
          pastRows +
          pastRow +
          (hexIndex + 1) * 2 +
          1 -
          (secondHalfBottom ? 1 : 0);

        hex.roadIds[5] =
          pastRows + pastRow + (hexIndex + 1) * 2 - (secondHalfBottom ? 1 : 0);
      });
      pastRows += pastRow;
    });
  };

  createHexGrid = radius => {
    const min = radius;
    const max = radius * 2 - 1;
    const hexGrid = [];
    let row = [];

    // Creates hex types array
    const hexTypesInfo = [
      { type: "lumber", count: 4 },
      { type: "wool", count: 4 },
      { type: "grain", count: 4 },
      { type: "brick", count: 3 },
      { type: "ore", count: 3 },
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
          roadIds: [null, null, null, null, null, null],
          settlementIds: [null, null, null, null, null, null],
          roads: []
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

    this.mapRoadIdsToHexagons(hexGrid);
    this.mapSettlementIdsToHexagons(hexGrid);

    console.log(hexGrid);
    return hexGrid;
  };

  createRoadGrid = radius => {
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
          direction: j % 2 === 0 ? "down" : "up",
          player: null
        });
        if (verticalRow.length < i + 1)
          verticalRow.push({ id: null, direction: "vertical", player: null });
      }

      secondHalf.unshift(JSON.parse(JSON.stringify(diagonalRow)).reverse());
      if (i !== max)
        secondHalf.unshift(JSON.parse(JSON.stringify(verticalRow)));

      roadGrid.push([...diagonalRow]);
      roadGrid.push([...verticalRow]);

      diagonalRow = [];
      verticalRow = [];
    }

    roadGrid.push(...secondHalf);

    roadGrid.flat().forEach((road, index) => (road.id = index + 1));

    console.log(roadGrid);

    return roadGrid;
  };

  createSettlementGrid = radius => {
    const min = radius;
    const max = radius * 2 - 1;
    const settlements = [];
    const secondHalf = [];
    let row = [];
    let reverseRow = [];

    for (let i = min; i <= max; i++) {
      for (let j = 1; j <= i * 2 + 1; j++) {
        row.push({
          id: null,
          type: null,
          location: j % 2 === 0 ? "top" : "aside",
          player: null
        });
        reverseRow.push({
          id: null,
          type: null,
          location: j % 2 === 0 ? "aside" : "top",
          player: null
        });
      }

      settlements.push(JSON.parse(JSON.stringify(row)));
      secondHalf.unshift(JSON.parse(JSON.stringify(reverseRow)));
      row = [];
      reverseRow = [];
    }

    settlements.push(...secondHalf);

    settlements
      .flat()
      .forEach((settlement, index) => (settlement.id = index + 1));

    console.log(settlements);

    return settlements;
  };

  createPlayers = () => {
    const initialResources = [
      { type: "lumber", count: 0 },
      { type: "wool", count: 0 },
      { type: "brick", count: 0 },
      { type: "ore", count: 0 },
      { type: "grain", count: 0 }
    ];
    const players = [
      {
        id: 1,
        name: "blue",
        resources: [...initialResources],
        victoryPoints: 0
      },
      {
        id: 2,
        name: "red",
        resources: [...initialResources],
        victoryPoints: 0
      },
      {
        id: 3,
        name: "green",
        resources: [...initialResources],
        victoryPoints: 0
      },
      {
        id: 4,
        name: "yellow",
        resources: [...initialResources],
        victoryPoints: 0
      }
    ];

    shuffle(players);
    this.props.changePlayer(players[0]);
    return players;
  };

  componentWillMount = () => {
    this.props.updateHexagons(this.createHexGrid(3));
    this.props.updateRoads(this.createRoadGrid(3));
    this.props.updateSettlements(this.createSettlementGrid(3));
    this.props.updatePlayers(this.createPlayers());
  };

  handleRoadClick = roadId => {
    if (this.props.roadBuilt) {
      window.alert("Road already built in this turn!");
      return;
    }

    const roadsCopy = JSON.parse(JSON.stringify(this.props.roads));
    const road = roadsCopy.flat().find(road => road.id === roadId);

    const players = JSON.parse(JSON.stringify(this.props.players));
    const activePlayer = players.find(
      player => player.id === this.props.activePlayer.id
    );

    if (road.player !== null)
      if (road.player.id !== this.props.activePlayer.id) {
        window.alert("Road already taken!");
        return;
      }

    road.player = this.props.activePlayer;

    this.props.updateRoads(roadsCopy);
    this.props.setRoadBuilt();
  };

  handleSettlementClick = settlementId => {
    if (this.props.settlementBuilt) {
      window.alert("Settlement already built in this turn!");
      return;
    }

    let settlementsCopy = JSON.parse(JSON.stringify(this.props.settlements));
    let settlement = settlementsCopy
      .flat()
      .find(settlement => settlement.id === settlementId);

    if (settlement.type === "city") {
      window.alert("Settlement already upgraded to city!");
      return;
    }

    if (settlement.player !== null)
      if (settlement.player.id !== this.props.activePlayer.id) {
        window.alert("Settlement already taken!");
        return;
      }

    settlement.player = this.props.activePlayer;
    settlement.type = settlement.type === null ? "village" : "city";

    const players = JSON.parse(JSON.stringify(this.props.players));

    players.find(player => player.id === this.props.activePlayer.id)
      .victoryPoints++;

    this.props.updateSettlements(settlementsCopy);
    this.props.updatePlayers(players);
    this.props.setSettlementBuilt();
  };

  shareResources = (diceSum = null) => {
    const settlements = JSON.parse(JSON.stringify(this.props.settlements));
    const players = JSON.parse(JSON.stringify(this.props.players));

    this.props.hexagons.flat().forEach(hex => {
      if (hex.value === diceSum || diceSum === null)
        hex.settlementIds.forEach(settlementId => {
          settlements.flat().forEach(settlement => {
            if (settlement.id === settlementId) {
              if (settlement !== null)
                if (settlement.player !== null) {
                  console.log(settlement.player.resources);
                  settlement.player.resources.forEach(resource => {
                    if (resource.type === hex.type) resource.count++;
                  });

                  players.forEach(player => {
                    if (player.id === settlement.player.id) {
                      player.resources = Object.assign(
                        {},
                        settlement.player.resources
                      );
                      console.log(player);
                    }
                  });
                  this.props.updatePlayers(players);
                }
            }
          });
        });
    });
    this.props.updateSettlements(settlements);
  };

  handleNextClick = () => {
    const isTurnEight = this.props.turn === 8;
    const isAboveEight = this.props.turn > 8;

    if (isTurnEight) {
      this.props.updatePlayers(
        JSON.parse(JSON.stringify(this.props.players)).reverse()
      );
      this.shareResources();
    } else if (isAboveEight) {
      const firstDice = Math.floor(Math.random() * 6) + 1;
      const secondDice = Math.floor(Math.random() * 6) + 1;
      this.props.throwDice(firstDice, secondDice);
      this.shareResources(firstDice + secondDice);
    }

    const newActivePlayer = Object.assign(
      {},
      this.props.players[this.props.turn % 4]
    );

    this.props.changeTurn(newActivePlayer);
    console.log(this.props.turn, this.props.activePlayer);
  };

  render() {
    const boardRadius = 3;

    return (
      <>
        <Options
          nextClickHandler={this.handleNextClick}
          players={this.props.players}
          activePlayer={this.props.activePlayer}
          dices={{ first: this.props.firstDice, second: this.props.secondDice }}
        />
        <div className="board">
          <HexGrid radius={boardRadius} hexGrid={this.props.hexagons} />
          <RoadGrid
            radius={boardRadius}
            roadGrid={this.props.roads}
            roadClickHandler={this.handleRoadClick}
          />
          <SettlementGrid
            radius={boardRadius}
            settlementGrid={this.props.settlements}
            settlementClickHandler={this.handleSettlementClick}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  hexagons: state.board.hexagons,
  roads: state.board.roads,
  settlements: state.board.settlements,
  roadBuilt: state.turn.roadBuilt,
  settlementBuilt: state.turn.settlementBuilt,
  activePlayer: state.turn.activePlayer,
  turn: state.turn.turn,
  players: state.players.players,
  firstDice: state.turn.firstDice,
  secondDice: state.turn.secondDice
});

const mapDispatchToProps = {
  updateHexagons,
  updateRoads,
  updateSettlements,
  setRoadBuilt,
  setSettlementBuilt,
  updatePlayers,
  changeTurn,
  changePlayer,
  throwDice
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
