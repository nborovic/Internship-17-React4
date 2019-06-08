import {
  UPDATE_PLAYER_ORDER,
  CHANGE_PLAYER,
  CHANGE_TURN,
  SET_SETTLEMENT_BUILT,
  SET_ROAD_BUILT
} from "./types";

export const updatePlayerOrder = newPlayerOrder => dispatch => {
  dispatch({ type: UPDATE_PLAYER_ORDER, payload: newPlayerOrder });
};

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
