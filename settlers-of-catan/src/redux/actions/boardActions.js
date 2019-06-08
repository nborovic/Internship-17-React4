import { UPDATE_HEXAGONS, UPDATE_ROADS, UPDATE_SETTLEMENTS } from "./types";

export const updateHexagons = newHexagons => dispatch => {
  dispatch({ type: UPDATE_HEXAGONS, payload: newHexagons });
};

export const updateRoads = newRoads => dispatch => {
  dispatch({ type: UPDATE_ROADS, payload: newRoads });
};

export const updateSettlements = newSettlements => dispatch => {
  dispatch({ type: UPDATE_SETTLEMENTS, payload: newSettlements });
};
