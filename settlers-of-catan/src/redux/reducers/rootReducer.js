import { combineReducers } from "redux";

import boardReducer from "./boardReducer";
import turnReducer from "./turnReducer";
import playerReducer from "./playerReducer";

export default combineReducers({
  board: boardReducer,
  turn: turnReducer,
  players: playerReducer
});
