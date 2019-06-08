import { UPDATE_PLAYERS } from "./../actions/types";

const initialState = {
  players: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PLAYERS:
      return {
        ...state,
        players: action.payload
      };
    default:
      return state;
  }
}
