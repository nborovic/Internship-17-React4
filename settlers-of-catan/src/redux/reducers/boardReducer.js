import {
  UPDATE_HEXAGONS,
  UPDATE_ROADS,
  UPDATE_SETTLEMENTS
} from "./../actions/types";

const initialState = {
  hexagons: [],
  roads: [],
  settlements: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_HEXAGONS:
      return {
        ...state,
        hexagons: action.payload
      };
    case UPDATE_ROADS:
      return {
        ...state,
        roads: action.payload
      };
    case UPDATE_SETTLEMENTS:
      return {
        ...state,
        settlements: action.payload
      };
    default:
      return state;
  }
}
