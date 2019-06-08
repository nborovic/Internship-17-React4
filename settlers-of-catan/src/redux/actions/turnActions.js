import {
  CHANGE_PLAYER,
  CHANGE_TURN,
  SET_SETTLEMENT_BUILT,
  SET_ROAD_BUILT,
  THROW_DICE
} from "./types";

export const changePlayer = newPlayer => dispatch => {
  dispatch({ type: CHANGE_PLAYER, payload: newPlayer });
};

export const changeTurn = newActivePlayer => dispatch => {
  dispatch({ type: CHANGE_TURN, payload: newActivePlayer });
};

export const setRoadBuilt = () => dispatch => {
  dispatch({ type: SET_ROAD_BUILT, payload: true });
};

export const setSettlementBuilt = () => dispatch => {
  dispatch({ type: SET_SETTLEMENT_BUILT, payload: true });
};

export const throwDice = (firstDice, secondDice) => dispatch => {
  dispatch({ type: THROW_DICE, payload: { firstDice, secondDice } });
};
