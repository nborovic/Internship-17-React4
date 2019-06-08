import {
  UPDATE_PLAYER_ORDER,
  CHANGE_PLAYER,
  CHANGE_TURN,
  SET_SETTLEMENT_BUILT,
  SET_ROAD_BUILT
} from "./../actions/types";

const initialState = {
  playerOrder: [],
  activePlayer: null,
  turn: 1,
  settlementBuilt: false,
  roadBuilt: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYER_ORDER:
      return {
        ...state,
        playerOrder: action.payload
      };
    case CHANGE_PLAYER:
      return {
        ...state,
        activePlayer: action.payload
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn + 1,
        settlementBuilt: false,
        roadBuilt: false,
        activePlayer: action.payload
      };
    case SET_ROAD_BUILT:
      return {
        ...state,
        roadBuilt: action.payload
      };
    case SET_SETTLEMENT_BUILT:
      return {
        ...state,
        settlementBuilt: action.payload
      };
    default:
      return state;
  }
}
