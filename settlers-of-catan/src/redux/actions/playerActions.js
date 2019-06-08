import { UPDATE_PLAYERS } from "./types";

export const updatePlayers = newPlayers => dispatch => {
  dispatch({ type: UPDATE_PLAYERS, payload: newPlayers });
};
