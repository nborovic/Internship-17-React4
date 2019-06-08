import React from "react";

const Options = props => (
  <div className="options">
    <div className="players">
      <p className="bold">Players</p>
      {props.players.map((player, index) => (
        <p
          key={index}
          className={player.id === props.activePlayer.id ? "bold" : null}
        >
          {player.name}, {player.victoryPoints}
        </p>
      ))}
    </div>
    <br />
    <div className="resources">
      {props.activePlayer !== null ? (
        <>
          <p className="bold">Current player:</p>
          <p>Lumber: {props.activePlayer.resources[0].count}</p>
          <p>Wool: {props.activePlayer.resources[1].count}</p>
          <p>Brick: {props.activePlayer.resources[2].count}</p>
          <p>Ore: {props.activePlayer.resources[3].count}</p>
          <p>Grain: {props.activePlayer.resources[4].count}</p>
        </>
      ) : null}
    </div>
    <br />
    <div className="dice">
      <p>
        Dices: {props.dices.first}, {props.dices.second}
      </p>
    </div>
    <button className="next-button" onClick={() => props.nextClickHandler()}>
      Next
    </button>
  </div>
);

export default Options;
